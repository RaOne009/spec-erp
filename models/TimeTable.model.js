const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TableSchema = new Schema({
	sectionName: {type: String, require: true, unique: true},
	releaseDate: {type: Date, require: true},
	timeTable: {
		dayName: String, enum['monday', 'Tuesday', 'Wednesday', 'thu', 'Friday', 'Saturday']
		Slots:  [{
			subject:{type: String, require: true},
			teacherTeaching: {type: String},
			startTime: {type: Date},
			endTime: {type: Date}
        }]
	}
});  

module.exports = Table = mongoose.model("table", TableSchema);
