// const router = require("express").Router(),
//   mongoose = require("mongoose"),
//   Student = require("../../../models/Users/Student");

// // @route		GET api/student
// // @desc		Test Route
// // @access		Public
// router.get("/", (req, res) => {
//   res.send("Student");
// });

// // @route   POST api/admin/createStudent
// // @desc    Creates a student with express-validator implementation
// // @access  Public
// router.post(
//   "/createStudent",
//   [
//     check("name", "Include Name")
//       .not()
//       .isEmpty(),
//     check("className", "Include Class Name")
//       .not()
//       .isEmpty(),
//     check("fatherName", "Father Name")
//       .not()
//       .isEmpty(),
//     check("motherName", "Include Mother Name")
//       .not()
//       .isEmpty(),
//     check("enrollmentNumber", "Include Enrollment Number")
//       .not()
//       .isEmpty(),
//     check("rollNumber", "Include Roll Number")
//       .not()
//       .isEmpty(),
//     check("dob", "Include DOB")
//       .not()
//       .isEmpty(),
//     check("password", "Min Password length is 6").isLength({ min: 6 })
//   ],

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       name,
//       className,
//       fatherName,
//       motherName,
//       address,
//       dob,
//       aadharNumber,
//       accountNumber,
//       photo,
//       enrollmentNumber,
//       rollNumber,
//       password,
//       SSSMID
//     } = req.body;

//     try {
//       // See if Student Exists
//       let oldStudent = await Student.findOne({ enrollmentNumber });
//       if (oldStudent) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "User already exists" }] });
//       }
//       newStudent = new Student({
//         name,
//         fatherName,
//         motherName,
//         address,
//         dob,
//         aadharNumber,
//         accountNumber,
//         photo,
//         enrollmentNumber,
//         rollNumber,
//         password,
//         SSSMID
//       });

//       // See if class Exists
//       let foundClass = await Class.findOne({ name: className });
//       if (!foundClass) {
//         return res.status(400).json({ errors: [{ msg: "No class exists" }] });
//       }

//       newStudent.class = foundClass.id;

//       // Encrypt Password
//       const salt = await bcrypt.genSalt(10);
//       newStudent.password = await bcrypt.hash(password, salt);
//       await newStudent.save();

//       // Return jsonwebtoken
//       const payload = {
//         user: {
//           type: "student",
//           id: newStudent.id
//         }
//       };
//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: 3600 },
//         (err, token) => {
//           if (err) throw err;
//           return res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// // @route   GET api/admin/viewStudent
// // @desc    Gets a list of all the students
// // @access  Public
// router.get(
//   "/viewStudent",

//   async (req, res) => {
//     try {
//       const queryObject = req.query;

//       // See if Student Exists
//       let foundStudents = await Student.find(queryObject);
//       if (!foundStudents) {
//         return res.status(400).json({ errors: [{ msg: "No Student exists" }] });
//       }

//       return res.json({ students: foundStudents });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// // @route   GET api/admin/viewStudent/:id
// // @desc    View student by id
// // @access  Public
// router.get(
//   "/viewStudent/:id",

//   async (req, res) => {
//     try {
//       const { id } = req.params;

//       // See if Student Exists
//       let foundStudent = await Student.findById(id);
//       if (!foundStudent) {
//         return res.status(400).json({ errors: [{ msg: "No Student exists" }] });
//       }

//       return res.json({ student: foundStudent });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// // @route   PUT api/admin/updateStudent/:id
// // @desc    Creates a class with express-validator implementation
// // @access  Public
// router.put(
//   "/updateStudent/:id",
//   [
//     check("name", "Include Name")
//       .not()
//       .isEmpty(),
//     check("className", "Include Class Name")
//       .not()
//       .isEmpty(),
//     check("fatherName", "Father Name")
//       .not()
//       .isEmpty(),
//     check("motherName", "Include Mother Name")
//       .not()
//       .isEmpty(),
//     check("enrollmentNumber", "Include Enrollment Number")
//       .not()
//       .isEmpty(),
//     check("rollNumber", "Include Roll Number")
//       .not()
//       .isEmpty(),
//     check("dob", "Include DOB")
//       .not()
//       .isEmpty(),
//     check("password", "Min Password length is 6").isLength({ min: 6 })
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       name,
//       className,
//       fatherName,
//       motherName,
//       address,
//       dob,
//       aadharNumber,
//       accountNumber,
//       photo,
//       enrollmentNumber,
//       rollNumber,
//       password,
//       SSSMID
//     } = req.body;
//     const { id } = req.params;

//     try {
//       // See if Student Exists
//       let oldStudent = await Student.findById(id);
//       if (!oldStudent) {
//         return res.status(400).json({ errors: [{ msg: "No student exists" }] });
//       }

//       const updatedStudent = await oldStudent.set({
//         name,
//         fatherName,
//         motherName,
//         address,
//         dob,
//         aadharNumber,
//         accountNumber,
//         photo,
//         enrollmentNumber,
//         rollNumber,
//         SSSMID
//       });

//       // See if class Exists
//       let foundClass = await Class.findOne({ name: className });
//       if (!foundClass) {
//         return res.status(400).json({ errors: [{ msg: "No class exists" }] });
//       }

//       updatedStudent.class = foundClass.id;

//       // Encrypt Password
//       const salt = await bcrypt.genSalt(10);
//       updatedStudent.password = await bcrypt.hash(password, salt);
//       await updatedStudent.save();

//       // Return jsonwebtoken
//       const payload = {
//         user: {
//           type: "student",
//           id: updatedStudent.id
//         }
//       };
//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: 3600 },
//         (err, token) => {
//           if (err) throw err;
//           return res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// // @route   DELETE api/admin/deleteStudent/:id
// // @desc    Creates a class with express-validator implementation
// // @access  Public
// router.delete(
//   "/deleteStudent/:id",

//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       // See if Class Exists
//       let deleteStudent = await Student.findById(id);
//       if (!deleteStudent) {
//         return res.status(400).json({ errors: [{ msg: "No Student exists" }] });
//       }

//       await deleteStudent.deleteOne();
//       res.json({ msg: "Student deleted successfully" });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// module.exports = router;
