const express = require("express");

const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasksController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth)

// get all projects
router.get("/", getTasks);

// get a single project
router.get("/:_id", getTask);

// create a project
router.post("/", createTask);

// delete a project
router.delete("/:_id", deleteTask);

// update a project
router.patch("/:_id", updateTask);

module.exports = router;
