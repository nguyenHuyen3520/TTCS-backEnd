const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId
    },
    schedule: [{
        title: String,
        startDate: String,
        endDate: String
    }]
})

module.exports = mongoose.model('Schedule', ScheduleSchema)