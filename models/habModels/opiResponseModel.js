const { Schema, model } = require("mongoose");
const { allIITGHostels } = require("../../helpers/constants");

const responseSchema = new Schema(
  {
    outlookEmail: {
      type: String,
      required: true,
    },
    subscribedMess: {
      type: String,
      enum: allIITGHostels,
    },
    satisfaction: {
      opiLunch: {
        type: Number,
        min: [1, "Rate in Scale of 5."],
        max: [5, "Rate in Scale of 5."],
      },
      opiBreakfast: {
        type: Number,
        min: [1, "Rate in Scale of 5."],
        max: [5, "Rate in Scale of 5."],
      },
      opiDinner: {
        type: Number,
        min: [1, "Rate in Scale of 5."],
        max: [5, "Rate in Scale of 5."],
      },
    },
    opiComments: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const Response = model("response", responseSchema);

module.exports = { Response };