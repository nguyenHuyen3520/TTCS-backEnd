const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeCourseSchema = new Schema({
    nameType: {
        type: String
    }
})

module.exports = mongoose.model('TypeCourse', TypeCourseSchema)