const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = "mongodb://localhost/Time_Table";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to database..."))
  .catch(err => console.log(err));

//SCHEMA SETUP
const Schema = mongoose.Schema;

const TableSchema = new Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  timeTable: [
    {
      day: {
        type: String,
        required: true,
        unique: true
      },
      slots: [
        {
          startTime: {
            type: String,
            required: true
          },
          endTime: {
            type: String,
            required: true
          },
          subject: {
            type: String
          },
          teacher: {
            type: String
          }
        }
      ]
    }
  ]
});
const Table = (module.exports = mongoose.model("table", TableSchema));
