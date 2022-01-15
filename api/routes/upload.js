const router = require("express").Router();
const Images = require("../models/Images");
const apiError = require("../errorHandler/apiErrors");
const formidable = require("formidable");

/**
 * @param {string} image - image
 * @param {string} id - user id
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
      // process image here
      // const image = new Images({
      //   _id: mongoose.Types.ObjectId(),
      //   created_at: Date.now(),
      // });

      // await image.save();
      res.status(201).json({
        message: "Successfull",
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
