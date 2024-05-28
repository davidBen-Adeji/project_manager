const express = require("express");

const {
  getDeletedProjects,
  restoreDeletedProject,
  deleteProjectPermanently,
  emptyBin,
} = require("../controllers/binController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// get all deleted projects
router.get("/", getDeletedProjects);

// restore deleted project
router.delete("/:_id/restore", restoreDeletedProject);

// delete a project permanently
router.delete("/:_id/delete", deleteProjectPermanently);

// delete all projects permanently
router.delete("/delete_all", emptyBin);

module.exports = router;
