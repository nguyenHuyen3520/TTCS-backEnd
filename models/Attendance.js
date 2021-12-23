const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
    classId:{
        type: String
    },
    studentArray:{
        type: Array
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model('Attendance', AttendanceSchema)