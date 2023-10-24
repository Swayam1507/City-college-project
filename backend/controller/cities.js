const City = require("../models/city"); // Replace with your user model import

const getList = async (req, res) => {
  const { search = "" } = req.query;
  try {
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { area: { $regex: search, $options: "i" } },
        { transport: { $regex: search, $options: "i" } },
        { traffic: { $regex: search, $options: "i" } },
        { avgTemperature: { $regex: search, $options: "i" } },
        { populationDensity: { $regex: search, $options: "i" } },
        { tds: { $regex: search, $options: "i" } },
        { publicInfrastructureRating: { $regex: search, $options: "i" } },
        { aqi: { $regex: search, $options: "i" } },
        { averageRent: { $regex: search, $options: "i" } },
        { costOfLivingIndex: { $regex: search, $options: "i" } },
        { averageAnnualRainfall: { $regex: search, $options: "i" } },
      ],
    };
    const result = await City.find(query).sort({ updatedAt: -1 });

    return res.status(200).send({
      success: true,
      list: result,
      count: await City.countDocuments(query),
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  getList,
};
