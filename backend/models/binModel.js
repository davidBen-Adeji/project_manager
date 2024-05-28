const mongoose = require("mongoose");

const SubTask = require("../models/subTasksModel");

const { Schema } = mongoose;

const binSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTasks: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "SubTask",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// DELETE ALL ASSOCIATED SUBTASKS AFTER A TASK IS DELETED
// binSchema.post("findOneAndDelete", async function (bin) {
//   if (bin.subTasks.length) {
//     try {
//       const res = await SubTask.deleteMany({ _id: { $in: bin.subTasks } });
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });

binSchema.statics.deleteSubTasks = async function(bin) {
  if (bin.subTasks.length) {
    try {
      const res = await SubTask.deleteMany({ _id: { $in: bin.subTasks } });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = mongoose.model("Bin", binSchema, "bin");
