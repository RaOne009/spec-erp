const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");

const Teacher = require("../../../models/Users/Teacher");

// @route		GET api/admin
// @desc		Test Route
// @access		Public
router.get("/", (req, res) => {
  res.send("Admin");
});

// @route   POST api/admin/createTeacher
// @desc    Creates a teacher with express-validator implementation
// @access  Public
router.post(
  "/createTeacher",
  [
    check("name", "Include Name")
      .not()
      .isEmpty(),
    check("email", "Email is required")
      .not()
      .isEmpty(),
    check("password", "Min Password length is 6").isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if Teacher Exists
      let teacher = await Teacher.findOne({ email });
      if (teacher) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      teacher = new Teacher({
        name,
        email,
        password
      });

      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
      await teacher.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          type: "teacher",
          id: teacher.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
