const router = require("express").Router();
const Users = require("../models/user");
const apiError = require("../errorHandler/apiErrors");
const createJwtToken = require("../helper-methods/createJwtToken");
const mongoose = require("mongoose");

/**
 * @param {string} user_id - user id
 */
router.post("/", async (req, res, next) => {
  const body = req.body;
  console.log(body);
  if (!body.user_id) {
    next(apiError.badRequest("Uid is required"));
    return;
  }
  try {
    const user = await Users.findOne({ user_id: body.user_id });
    if (user) {
      const token = createJwtToken(user);
      res.status(200).json({
        user: user,
        token,
      });
      return;
    } else {
      const newUser = new Users({
        _id: mongoose.Types.ObjectId(),
        created_at: Date.now(),
        user_id: body.user_id,
      });
      await newUser.save();
      const token = createJwtToken(newUser);
      res.status(200).json({
        user: newUser,
        token,
      });
      return;
    }
  } catch (error) {
    next(apiError.interServerError(error.message));
    return;
  }
});

module.exports = router;
