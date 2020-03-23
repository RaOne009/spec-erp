const router = require("express").Router();

// @route		GET api/admin
// @desc		Test Route
// @access		Public
router.get("/", (req, res) => {
  res.send("Admin");
});

module.exports = router;
