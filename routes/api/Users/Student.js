const router = require("express").Router();

// @route		GET api/student
// @desc		Test Route
// @access		Public
router.get("/", (req, res) => {
  res.send("Student");
});

module.exports = router;
