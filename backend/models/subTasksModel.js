const mongoose = require("mongoose");

const { Schema } = mongoose;

const subTasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubTask", subTasksSchema);
