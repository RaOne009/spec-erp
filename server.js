const express = require("express");
const connectDB = require("./config/db");
const methodOverride = require("method-override");

const app = express();

// Connect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));

// App Config
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("JSDFLj");
});

// Define Routes
app.use("/api/admin", require("./routes/api/Admin/adminAttendanceHandler"));
app.use("/api/admin", require("./routes/api/Admin/adminClassHandler"));
app.use("/api/admin", require("./routes/api/Admin/adminTaskHandler"));
// app.use("/api/admin", require("./routes/api/Admin/adminTimetableHandler"));
app.use("/api/admin", require("./routes/api/Admin/adminUserHandler"));

// app.use("/api/students", require("./routes/api/Users/Student"));
// app.use("/api/teachers", require("./routes/api/Users/Teacher"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://127.0.0.1:${PORT}`);
});
