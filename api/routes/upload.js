const router = require("express").Router();
const apiError = require("../errorHandler/apiErrors");
const formidable = require("formidable");
const mongoose = require("mongoose");
const Activities = require("../models/activities");

const products = ["apple", "laptop", "key", "book", "keyboard", "pen"];

const carbonValue = [44.67, 78, 29, 56.38, 65, 87.34];
/**
 * @param {string} image - image
 * @param {string} user_id - user id
 */
router.post("/new", async (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: false });
  try {
    form.parse(req, async (error, fields, file) => {
      if (error) {
        next(apiError.badRequest(error.message));
        return;
      }
      if (!file.image) {
        next(apiError.interServerError("Provide atleast 1 image"));
        return;
      }
      let index = Math.floor(Math.random() * 5) + 1;

      //FIX: remove this after processing the image
      let name = products[index];
      // process image here
      const activity = new Activities({
        _id: mongoose.Types.ObjectId(),
        created_at: Date.now(),
        user_id: fields.user_id,
        image:
          "https://cdn.pixabay.com/photo/2021/11/16/18/10/nature-6801719__480.jpg",
        name,
        offseted: false,
        carbon: carbonValue[index],
      });

      await activity.save();
      res.status(201).json({
        data: activity,
        code: 200,
      });
      return;
    });
  } catch (error) {
    next(apiError.interServerError(error.message));
    return;
  }
});

module.exports = router;
