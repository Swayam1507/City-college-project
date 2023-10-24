const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Users",
      index: true,
    },
    area: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Areas",
      index: true,
    },
    // images: [String],
  },
  { timestamps: true }
);

const Model = mongoose.model("Review", schema);

module.exports = Model;
