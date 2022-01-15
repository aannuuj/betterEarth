const mongoose = require("mongoose");
const imagesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Image", imagesSchema);
