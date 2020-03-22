const express = require("express");
const router = express.Router();

const { createUser, deleteUser, getUser, getUsers, updateUser } = require("../controller/user");
const { protect, authorize } = require('../middleware/auth')

router.get("/", protect, authorize('admin'), getUsers);
router.get("/:id", protect, authorize('admin'), getUser);
router.post("/", protect, authorize('admin'), createUser);
router.put("/:id", protect, authorize('admin'), updateUser);
router.delete("/:id", protect, authorize('admin'), deleteUser);

module.exports = router;
