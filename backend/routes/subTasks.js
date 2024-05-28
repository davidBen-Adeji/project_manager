const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const {
  createSubTask,
  updateSubTask,
  deleteSubTask,
} = require("../controllers/subTasksController");

const router = express.Router();

router.use(requireAuth);

// create subTask
router.post("/:task_id", createSubTask);

// update subTask
router.patch("/:task_id/:_id", updateSubTask);

// delete subTask
router.delete("/:task_id/:_id", deleteSubTask);

module.exports = router;
