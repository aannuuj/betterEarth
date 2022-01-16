const router = require("express").Router();
const apiError = require("../errorHandler/apiErrors");
const Activities = require("../models/activities");

/**
 * @param {string} user_id - user id
 */
router.get("/", async (req, res, next) => {
  const body = req.body;
  try {
    let allActivities = await Activities.find({ user_id: body.user_id });
    return res.json({
      data: allActivities,
      code: 200,
    });
  } catch (error) {
    next(apiError.interServerError(error.message));
    return;
  }
});

module.exports = router;
