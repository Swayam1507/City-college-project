const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: String,
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

const City = mongoose.model("City", citySchema);

module.exports = City;
