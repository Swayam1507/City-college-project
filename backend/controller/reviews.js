const Review = require("../models/review");

const create = async (req, res) => {
  const reqBody = req.body;
  try {
    await Review.create({ ...reqBody, user: req.tokenData.userId });
    return res.status(200).send({
      success: true,
      msg: "Review created successfully.",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  create,
};
