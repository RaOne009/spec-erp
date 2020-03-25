const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Table = require('../../models/Table');

//.@route ->-> POST api/admin/createTimetable 
//.@description ->-> Put Timetable
//.@access ->->Public

router.post("/createTimetable",(req, res) => {
  newTable = new Table({
    id: 1,
    timeTable: [
      {
        day: "Monday",
        slots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            subject: "a",
            teacher: "A"
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            subject: "b",
            teacher: "B"
          }
        ]
      },
      {
        day: "Tuesday",
        slots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            subject: "a",
            teacher: "A"
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            subject: "b",
            teacher: "B"
          }
        ]
      },
      {
        day: "Wednesday",
        slots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            subject: "a",
            teacher: "A"
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            subject: "b",
            teacher: "B"
          }
        ]
      },
      {
        day: "Friday",
        slots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            subject: "a",
            teacher: "A"
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            subject: "b",
            teacher: "B"
          }
        ]
      },
      {
        day: "Saturday",
        slots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            subject: "a",
            teacher: "A"
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            subject: "b",
            teacher: "B"
          }
        ]
      }
    ]
  });
  newTable.save()
        .then(notice => res.json(table));
        .catch(err => res.status(404).json({'msg': "failure"}))
});

//.@route ->-> GET  api/admin/Timetable
//.@description ->-> View Timetable
//.@access ->-> Public

router.get("Timetable/", (req, res) => {
  const id ="1";
  Table.find({id},(err, doc) => {
    if (err) res.status(400).json({ msg: "failure" });
    else res.send({ msg: "success", arr: doc });
  });
});

//.@route ->-> GET  api/admin/Timetable/:day
//.@description ->-> View Timetable
//.@access ->-> Public

router.get("Timetable/:day", (req, res) => {
  const id = "1";
  const day = req.params.day;
  Table.find({ id }, (err, doc) => {
    if (err) res.status(404).json({ msg: "failure" });
    else {
      const {timeTable} =  doc[0];
      // console.log(doc)
      const response =  timeTable.filter((dayObject) => {return dayObject.day === day });
      res.send({ msg: "success", arr: response });}
  });
});
