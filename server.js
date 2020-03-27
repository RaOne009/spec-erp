const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./config/db");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Connect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("JSDFLj");
});

// Define Routes
app.use("/api/admin", require("./routes/api/Admin/Admin"));
app.use("/api/students", require("./routes/api/Users/Student"));
app.use("/api/teachers", require("./routes/api/Users/Teacher"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`running at http://127.0.0.1:${PORT}/`);
});
