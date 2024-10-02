const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
if (!firebase.apps.length)
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
const userModel = require("../models/userModel");
const { body, matchedData } = require("express-validator");
const userNotifTokenModel = require("../models/userNotifTokenModel");
const { sendToAllFirebaseTopicName } = require("../helpers/constants");
const { RequestValidationError } = require("../errors/request.validation.error");
const userPersonalNotifModel = require("../models/userPersonalNotifModel");
const topicNotifModel= require("../models/topicNotifModel");


exports.sendTestNotifToDevice = async (req, res) => {

  console.log(req.body);

  if (!req.body.sendTo) {
    throw new RequestValidationError("Missing Fields");
  }

  let user = await userModel.findOne({ outlookEmail: req.body.sendTo });

  let userNotifTokens = await userNotifTokenModel.find({ userid: user._id });
  console.log(userNotifTokens);
  for (let i = 0; i < userNotifTokens.length; i++) {
    const payload = {
      "message": {
        "token": userNotifTokens[i].deviceToken,
        "notification": {
          "body": "test body",
          "OrganizationId": "2",
          "priority": "high",
          "subtitle": "test header",
          "Title": "hello"
        },
      },
      data: {
        category: req.body.category,
        model: "",
        header: "test header",
        body: "test body"
      }
    };
    await firebase.messaging().send(payload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
    // await firebase.messaging().sendToDevice(userNotifTokens[i].deviceToken, payload);
    console.log("NOTIFICATION SENT");
  }
  res.json({"success" : true});
  

};

exports.sendNotifByEmail = async (req,res) => {
  let outlookEmail=req.body.outlookEmail;
  let onestopUser=await userModel.findOne({outlookEmail: outlookEmail});

  if(onestopUser) await this.sendToUser(onestopUser._id,req.body.category,req.body.title,req.body.body);
  console.log("SENT TO EMAIL NOTIFS");
  res.json({success: true});
}

exports.sendNotifByEmailList = async (req,res) => {
  console.log(req.body);
  console.log(req.headers);
  let outlookEmails=req.body.outlookEmails;
  for(let i=0;i<outlookEmails.length;i++){
    let outlookEmail = req.body.outlookEmails[i];
    let onestopUser = await userModel.findOne({outlookEmail: outlookEmail});
    if(onestopUser) await this.sendToUser(onestopUser._id,req.body.category,req.body.title,req.body.body);
  }
  res.json({success: true});
}

exports.updateTopicSubscriptionOfUser = async (notifPref,userid) => {
  let userNotifTokens = await userNotifTokenModel.find({ userid: userid });
  console.log(userNotifTokens);
  console.log(notifPref);
  for (let i = 0; i < userNotifTokens.length; i++) {
    for(let category in notifPref){
      console.log(category);
      await firebase.messaging().unsubscribeFromTopic([userNotifTokens[i].deviceToken],category);
      if(notifPref[category]===true){
        await firebase.messaging().subscribeToTopic([userNotifTokens[i].deviceToken],category);
      }
    }
  }
}

exports.sendToUser = async (userid,category,title,body) => {

  let userNotifTokens = await userNotifTokenModel.find({ userid: userid });
  console.log(userNotifTokens);

  let userPersonalNotif = userPersonalNotifModel({userid,category,title,body});
  await userPersonalNotif.save();

  for (let i = 0; i < userNotifTokens.length; i++) {
    const payload = {
      "message": {
        "token": userNotifTokens[i].deviceToken,
        "notification": {
          "body": body,
          "title": title
        },
      },
      data: {
        category: category,
        title: title,
        body: body
      }
    };
    await firebase.messaging().send(payload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
    // await firebase.messaging().sendToDevice(userNotifTokens[i].deviceToken, payload,options);
    console.log("NOTIFICATION SENT");
  }


  // const options = { priority: "high" };
  
};

exports.sendToATopic = async (topic,notification,data) => {

  // WILL MAKE A CRON SERVER FOR THIS


  // let compDate = new Date();
  // compDate.setMonth(compDate.getMonth() - 3); // set date 3 months prior
  // let inactiveNotifTokens = await userNotifTokenModel.find({
  //   createdAt: {
  //     $lte: compDate
  //   }
  // });

  // let inactiveDeviceTokens = inactiveNotifTokens.map((userNotif) => userNotif.deviceToken);

  // await userNotifTokenModel.deleteMany({
  //   createdAt: {
  //     $lte: compDate
  //   }
  // });

  // if (inactiveDeviceTokens.length > 0) await firebase.messaging().unsubscribeFromTopic(inactiveDeviceTokens, topic);

  const payload = {
    notification: notification,
    data: data
  };

  let topicNotif = topicNotifModel(data);
  await topicNotif.save();

  console.log(payload);
  const options = { priority: "high" };
  await firebase.messaging().sendToTopic(topic,payload,options);

  console.log(`SENT TO TOPIC: ${topic}`);
};

exports.getAllTopicNotifs = async (req,res) => {
  let topicNotifs = await topicNotifModel.find().sort({createdAt:-1});
  res.json({"allTopicNotifs" : topicNotifs});
}

exports.sendToAllValidate = [
  body("category", "notif must have a category").exists(),
  body("model", "notif must have a model string").exists(),
  body("header", "a header is required to send notification").exists(),
  body("body", "a body is required to send notification").exists(),
];

exports.sendToAll = async (req, res) => {

  let compDate = new Date();
  compDate.setMonth(compDate.getMonth() - 3); // set date 3 months prior
  let inactiveNotifTokens = await userNotifTokenModel.find({
    createdAt: {
      $lte: compDate
    }
  });

  let inactiveDeviceTokens = inactiveNotifTokens.map((userNotif) => userNotif.deviceToken);

  await userNotifTokenModel.deleteMany({
    createdAt: {
      $lte: compDate
    }
  });

  if (inactiveDeviceTokens.length > 0) await firebase.messaging().unsubscribeFromTopic(inactiveDeviceTokens, sendToAllFirebaseTopicName);

  let bodyData = matchedData(req);
  console.log(bodyData);
  console.log(req.body);
  const payload = {
    "notification": {
      "body": req.body.body,
      "OrganizationId": "2",
      "priority": "high",
      "subtitle": req.body.header,
      "Title": "hello"
    },
    data: {
      category: req.body.category,
      model: req.body.model,
      header: req.body.header,
      body: req.body.body
    }
  };

  console.log(payload);
  const options = { priority: "high" };
  await firebase.messaging().sendToTopic(sendToAllFirebaseTopicName, payload);
};
