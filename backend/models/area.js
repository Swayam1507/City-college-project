const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: String,
    city: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "City",
      index: true,
    },
    area: String,
    transport: String,
    traffic: String,
    avgTemperature: String,
    populationDensity: String,
    tds: String,
    publicInfrastructureRating: String,
    aqi: String,
    averageRent: String,
    costOfLivingIndex: String,
    averageAnnualRainfall: String,
  },
  { timestamps: true }
);

const Model = mongoose.model("Area", schema);

module.exports = Model;
