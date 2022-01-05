const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course_TypeCourseSchema = new Schema({
    Course_id: {
        type: Schema.Types.ObjectId
    },
    TypeCourse_id: {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Course_TypeCourse', Course_TypeCourseSchema)