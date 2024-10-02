const mongoose = require("mongoose");
const { allIITGHostels } = require("../../helpers/constants");

// messName: maxChangesAllowed
const messChangeLimits = allIITGHostels.map((mess) => [mess, 150]);

const habAdminSchema = new mongoose.Schema({
    opiResponseRecipients: {
        type: [String],
        default: [],
    },
    opiStartDate: {
        type: Date,
        default: null,
    },
    opiEndDate: {
        type: Date,
        default: null,
    },
    messChangeStartDate: {
        type: Date,
        default: null,
    },
    messChangeEndDate: {
        type: Date,
        default: null,
    },
    // messChangeLimits
    messChangeLimits: {
        type: [[String, Number]],
        default: messChangeLimits,
    },
});
    

const HabAdmin = mongoose.model("HabAdmin", habAdminSchema);
module.exports = { HabAdmin };