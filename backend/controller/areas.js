const Area = require("../models/area"); // Replace with your user model import
const Review = require("../models/review");

const getList = async (req, res) => {
  const { search = "", cityId } = req.query;
  if (!cityId) {
    return res.status(400).send({
      success: false,
      msg: "Please provide city ID.",
    });
  }
  try {
    // const query = {
    //   city: cityId,
    //   $or: [
    //     { name: { $regex: search, $options: "i" } },
    //     { area: { $regex: search, $options: "i" } },
    //     { transport: { $regex: search, $options: "i" } },
    //     { traffic: { $regex: search, $options: "i" } },
    //     { avgTemperature: { $regex: search, $options: "i" } },
    //     { populationDensity: { $regex: search, $options: "i" } },
    //     { tds: { $regex: search, $options: "i" } },
    //     { publicInfrastructureRating: { $regex: search, $options: "i" } },
    //     { aqi: { $regex: search, $options: "i" } },
    //     { averageRent: { $regex: search, $options: "i" } },
    //     { costOfLivingIndex: { $regex: search, $options: "i" } },
    //     { averageAnnualRainfall: { $regex: search, $options: "i" } },
    //   ],
    // };
    const que = [
      // { $match: { $expr: { $eq: ["$city", { $toObjectId: cityId }] } } },
      {
        $match: {
          $expr: { $eq: ["$city", { $toObjectId: cityId }] },
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
        },
      },
    ];
    // const result = await Area.find(query)
    //   // .populate("city")
    //   .sort({ updatedAt: -1 });
    const resu = await Area.aggregate(que);

    return res.status(200).send({
      success: true,
      list: resu,
      // count: await Area.countDocuments(query),
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
