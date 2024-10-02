const { messCapacityChanging } = require("../../helpers/constants.js");
const { Mess } = require("../../models/habModels/messModel");
const { onestopuser } = require("../../models/userModel");

const messChange = async () => {
  try {
    const allMess = await Mess.find({});
    for (const mess of allMess) {
      for (const userEmail of mess.incoming) {
        const user = await onestopuser.findOne({ outlookEmail: userEmail });
        if (user) {
          user.subscribedMess = mess;
          await user.save();
        }
      }
      mess.incoming = [];
      mess.outgoing = [];
      await mess.save();
    }
    console.log("All Incoming Cleared");
  } catch (err) {
    console.log("Changing not completed", err);
  }
};

const messResponseChange = async (req, res) => {
  const reqMessName = req.body.subscribedMess;
  const userEmail = req.body.outlookEmail;
  const user = await onestopuser.findOne({ outlookEmail: userEmail });
  const hostel = user.hostel;

  const messName = await Mess.findOne({ messName: reqMessName });
  const currMess = await Mess.findOne({ messName: hostel });

  if (messName && currMess) {
    if (
      messName.incoming.length < messCapacityChanging.messName &&
      currMess.outgoing.length < messCapacityChanging.currMess
    ) {
      messName.incoming.push(userEmail);
      currMess.outgoing.push(userEmail);
      await messName.save();
      await currMess.save();
      res.send("User successfully subscribed to the mess.");
    } else {
      res.send(`Maximum Incoming reached ${messCapacityChanging.messName} or Maximum Outgoing reached ${messCapacityChanging.currMess}`);
    }
  } else {
    res.send("Mess not found.");
  }
};

module.exports = { messChange, messResponseChange };
