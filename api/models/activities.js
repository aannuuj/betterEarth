const mongoose = require("mongoose");
const activitiesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: {
    type: String,
    required: true,
  },
  carbon: {
    type: String,
    required: true,
  },
  offseted: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Activities", activitiesSchema);
