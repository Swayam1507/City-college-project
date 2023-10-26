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

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).send({
        success: false,
        msg: "Review not found.",
      });
    }
    if (review.user.toString() !== req.tokenData.userId) {
      return res.status(401).send({
        success: false,
        msg: "You cannot delete other user's review.",
      });
    }
    await review.delete();
    return res.status(200).send({
      success: true,
      msg: "Review deleted successfully.",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: error.message,
    });
  }
};

const edit = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).send({
        success: false,
        msg: "Review not found.",
      });
    }
    if (review.user.toString() !== req.tokenData.userId) {
      return res.status(401).send({
        success: false,
        msg: "You cannot update other user's review.",
      });
    }
    await review.update({ text });
    return res.status(200).send({
      success: true,
      msg: "Review updated successfully.",
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
  remove,
  edit,
};
