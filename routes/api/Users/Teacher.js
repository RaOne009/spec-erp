const router = require("express").Router();

// @route		GET api/teacher
// @desc		Test Route
// @access		Public
router.get("/", (req, res) => {
  res.send("Teacher");
});

module.exports = router;
