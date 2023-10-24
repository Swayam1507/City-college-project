const Area = require("../models/area"); // Replace with your user model import

const getList = async (req, res) => {
  const { search = "", cityId } = req.query;
  if (!cityId) {
    return res.status(400).send({
      success: false,
      msg: "Please provide city ID.",
    });
  }
  try {
    const query = [
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
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "area",
          as: "reviews",
        },
      },
    ];
    const result = await Area.aggregate(query);

    return res.status(200).send({
      success: true,
      list: result,
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
