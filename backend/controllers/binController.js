const mongoose = require("mongoose");

const Bin = require("../models/binModel");
const Task = require("../models/tasksModel");

async function getDeletedProjects(req, res) {
  const user_id = req.user._id;
  const bin = await Bin.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(bin);
}

async function restoreDeletedProject(req, res) {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const bin = await Bin.findOneAndDelete({ _id });
  if (!bin) {
    return res.status(404).json({ error: "No such project" });
  }

  const task = await Task.create({
    title: bin.title,
    subTasks: bin.subTasks,
    user_id: bin.user_id,
  });
  res.status(200).json({bin, task});
}

async function deleteProjectPermanently(req, res) {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const bin = await Bin.findOneAndDelete({ _id });
  if (!bin) {
    return res.status(404).json({ error: "No such project" });
  }

  await Bin.deleteSubTasks(bin);

  res.status(200).json(bin);
}

async function emptyBin(req, res) {
  const user_id = req.user._id;

  const bin = await Bin.deleteMany({ user_id });

  if (!bin) {
    return res.status(404).json({ error: "unable to empty bin" });
  }
  console.log(bin)
  res.status(200).json(bin);
}

module.exports = {
  getDeletedProjects,
  restoreDeletedProject,
  deleteProjectPermanently,
  emptyBin,
};
