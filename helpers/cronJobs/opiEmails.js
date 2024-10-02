const cron = require("node-cron");
const { Response } = require("../../models/habModels/opiResponseModel");
const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const { HabAdmin } = require("../../models/habModels/habAdminModel");

require('dotenv').config();

const dirname = __dirname;

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  // secure: false,
  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.UPSP_EMAIL,
    pass: process.env.UPSP_EMAIL_PASSWORD,
  }
});

const convertToExcel = (data, fileName) => {
  const flattenedData = data.map(item => ({
    outlookEmail: item.outlookEmail,
    subscribedMess: item.subscribedMess,
    opiLunch: item.satisfaction.opiLunch,
    opiBreakfast: item.satisfaction.opiBreakfast,
    opiDinner: item.satisfaction.opiDinner,
    opiComments: item.opiComments,
    dateSubmitted: item.createdAt,
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(flattenedData);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const filesDir = path.join(dirname, "../../public/files");
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }

  const filePath = path.join(filesDir, fileName);
  XLSX.writeFile(wb, filePath);

  if (fs.existsSync(filePath)) {
    console.log(`OPI File successfully saved at ${filePath}`);
    return filePath;
  } else {
    throw new Error("File could not be saved.");
  }
};

const groupDataBySubscribedMess = (data) => {
  return data.reduce((acc, curr) => {
    const mess = curr.subscribedMess || "Unknown";
    if (!acc[mess]) {
      acc[mess] = [];
    }
    acc[mess].push(curr);
    return acc;
  }, {});
};

const sendEmailForDate = async (date, recipients) => {
  try {
    // Convert date to IST and get the start and end of the day in IST
    const startOfDay = moment.tz(date, 'Asia/Kolkata').startOf('day').utc();
    const endOfDay = moment.tz(date, 'Asia/Kolkata').endOf('day').utc();

    const data = await Response.find({
      createdAt: {
        $gte: startOfDay.toDate(),
        $lte: endOfDay.toDate(),
      },
    });

    if (data && data.length > 0) {
      const groupedData = groupDataBySubscribedMess(data);

      // Array to hold the attachments for the email
      const attachments = [];

      for (const [mess, records] of Object.entries(groupedData)) {
        const fileName = `OPIdata_${mess}_${date}.xlsx`;
        const filePath = convertToExcel(records, fileName);

        attachments.push({
          filename: fileName,
          path: filePath,
        });

        console.log(`File for ${mess} generated: ${filePath}`);
      }

      if (attachments.length > 0) {
        const mailOptions = {
          from: process.env.UPSP_EMAIL,
          to: recipients,
          subject: `OPI Data for all Messes on ${date}`,
          text: `Please find attached the OPI data for all messes on ${date}.\nRegards,\nTeam SWC`,
          attachments: attachments,
        };

        // Send the email with all attachments
        await transporter.sendMail(mailOptions);
        console.log(`OPI data for ${date} sent to recipients`);

        // Clean up files after sending email
        attachments.forEach((attachment) => {
          fs.unlinkSync(attachment.path);
        });
      }
    } else {
      console.log(`No data found for ${date}`);
    }
  } catch (e) {
    console.log(e);
  }
};

const sendSummaryEmail = async (startDate, endDate, recipients) => {
  try {
    // Convert start and end dates to IST and then to UTC
    const start = moment.tz(startDate, 'Asia/Kolkata').startOf('day').utc();
    const end = moment.tz(endDate, 'Asia/Kolkata').endOf('day').utc();

    const data = await Response.find({
      createdAt: {
        $gte: start.toDate(),
        $lte: end.toDate(),
      },
    });

    if (data.length > 0) {
      const groupedData = groupDataBySubscribedMess(data);

      // Array to hold all attachments
      const attachments = [];

      for (const [mess, records] of Object.entries(groupedData)) {
        const fileName = `OPIdata_${mess}_${startDate}_to_${endDate}.xlsx`;
        const filePath = convertToExcel(records, fileName);

        attachments.push({
          filename: fileName,
          path: filePath,
        });

        console.log(`File for ${mess} generated: ${filePath}`);
      }

      if (attachments.length > 0) {
        const mailOptions = {
          from: process.env.UPSP_EMAIL,
          to: recipients,
          subject: `Summary Data for all Messes from ${startDate} to ${endDate}`,
          text: `Please find attached the OPI summary data for all messes from ${startDate} to ${endDate}.\nRegards,\nTeam SWC`,
          attachments: attachments,
        };

        // Send the email with all attachments
        await transporter.sendMail(mailOptions);
        console.log(`Summary data from ${startDate} to ${endDate} sent to recipients`);

        // Clean up files after sending
        attachments.forEach((attachment) => {
          fs.unlinkSync(attachment.path);
        });
      }

      // Delete data after sending the summary email
      await Response.deleteMany({
        createdAt: {
          $gte: start.toDate(),
          $lte: end.toDate(),
        },
      });
      console.log(`Data from ${startDate} to ${endDate} deleted from database`);
    } else {
      console.log(`No summary data found from ${startDate} to ${endDate}`);
    }
  } catch (error) {
    console.error(`Error in sending summary email: ${error.message}`);
  }
};

const processDateList = async (startDate, endDate, recipients) => {
  let currentDate = moment.tz(startDate, 'Asia/Kolkata');

  while (currentDate.isSameOrBefore(moment.tz(endDate, 'Asia/Kolkata'))) {
    const date = currentDate.format('YYYY-MM-DD');
    await sendEmailForDate(date, recipients);
    currentDate.add(1, 'day');
  }

  await sendSummaryEmail(startDate, endDate, recipients);
};

const scheduleOPIEmails = async () => {
  try {
    const admin = await HabAdmin.findOne();

    if (!admin) {
      console.log("Admin details not found.");
      return;
    }

    let { opiResponseRecipients, opiStartDate, opiEndDate } = admin;

    if (!opiResponseRecipients || opiResponseRecipients.length === 0) {
      console.log("No recipients found for OPI data emails");
      return;
    }

    const recipients = opiResponseRecipients.join(", ");
    const startDate = opiStartDate ? moment.tz(opiStartDate, 'Asia/Kolkata').format('YYYY-MM-DD') : moment.tz('Asia/Kolkata').format('YYYY-MM-DD');
    const endDate = opiEndDate ? moment.tz(opiEndDate, 'Asia/Kolkata').format('YYYY-MM-DD') : moment.tz('Asia/Kolkata').add(5, 'days').format('YYYY-MM-DD');

    // schedule cron job at 11:45 pm IST.
    cron.schedule("45 23 * * *", async () => {
    // cron.schedule("* * * * *", async () => {
      console.log("Running scheduled date processing at 11:45 PM IST...");
      await processDateList(startDate, endDate, recipients);
    }, {
      timezone: 'Asia/Kolkata'
    });

  } catch (error) {
    console.log(`Error in scheduling OPI emails: ${error.message}`);
  }
};

module.exports = {
  processDateList,
  scheduleOPIEmails
};