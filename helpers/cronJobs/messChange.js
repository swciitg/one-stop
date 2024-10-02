
const cron = require("node-cron");
const { messChange } = require("../../controllers/habControllers/messChangeController");

const scheduleMessChange = () => {
  cron.schedule("0 0 1 * *", async () => {
    try {
      console.log("Running messChange at the start of the month...");
      await messChange();  // Call your messChange function
      console.log("messChange function executed successfully.");
    } catch (error) {
      console.error("Error executing messChange function:", error);
    }
  });
};

module.exports = {
  scheduleMessChange,
};
