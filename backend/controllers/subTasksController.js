const mongoose = require("mongoose");

const SubTask = require("../models/subTasksModel");
const Task = require("../models/tasksModel");

async function createSubTask(req, res) {
  try {
    const { task_id } = req.params;
    const { title } = req.body;

    if (!mongoose.Types.ObjectId.isValid(task_id)) {
      return res.status(404).json({ error: "No such project" });
    }

    const task = await Task.findById(task_id);
    if (!task) {
      return res.status(404).json({ error: "No such project" });
    }

    const subTask = await SubTask.create({ title });

    task.subTasks.push(subTask);
    await task.save();
    await task.populate("subTasks");

    res.status(200).json({ task, subTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateSubTask(req, res) {
  try {
    const { task_id, _id } = req.params;
    const { isChecked } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(task_id) ||
      !mongoose.Types.ObjectId.isValid(_id)
    ) {
      return res.status(400).json({ error: "No such project" });
    }

    const subTask = await SubTask.findOneAndUpdate(
      { _id },
      { isChecked },
      { new: true }
    );

    const task = await Task.findById(task_id).populate("subTasks");

    res.status(200).json({ task, subTask });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
}

async function deleteSubTask(req, res) {
  try {
    const { task_id, _id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(task_id) ||
      !mongoose.Types.ObjectId.isValid(_id)
    ) {
      return res.status(400).json({ error: "No such project" });
    }

    const task = await Task.findById(task_id);
    if (!task) {
      return res.status(400).json({ error: "No such project" });
    }

     await SubTask.findOneAndDelete({ _id });
     
     console.log(await task.save()) ;

    await task.populate("subTasks");

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { createSubTask, updateSubTask, deleteSubTask };
