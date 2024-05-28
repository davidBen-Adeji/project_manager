const mongoose = require("mongoose");

const Task = require("../models/tasksModel");
const SubTask = require("../models/subTasksModel");
const Bin = require("../models/binModel");

async function getTasks(req, res) {
  const user_id = req.user._id;

  const tasks = await Task.find({ user_id })
    .populate("subTasks")
    .sort({ createdAt: -1 });
  res.status(200).json(tasks);
}

async function getTask(req, res) {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const task = await Task.findById(_id);
  if (!task) {
    return res.status(404).json({ error: "No such project" });
  }

  res.status(200).json(task);
}

async function createTask(req, res) {
  try {
    const user_id = req.user._id;
    const { title, subTasks } = req.body;
    const newSubTasks = await SubTask.insertMany(subTasks);
    const task = await Task.create({ title, subTasks: newSubTasks, user_id });
    await task.populate("subTasks");
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "No such project" });
    }

    const task = await Task.findOneAndDelete({ _id });
    if (!task) {
      return res.status(404).json({ error: "No such task" });
    }

    // move deleted task to bin
    const bin = await Bin.create({
      title: task.title,
      subTasks: task.subTasks,
      user_id: task.user_id,
    });
    if (!bin) {
      return res.status(404).json({ error: "No such task" });
    }

    res.status(200).json({task, bin});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateTask(req, res) {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const task = await Task.findOneAndUpdate(
    { _id },
    { ...req.body },
    { new: true }
  ).populate("subTasks");

  if (!task) {
    return res.status(404).json({ error: "No such project" });
  }

  res.status(200).json(task);
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
