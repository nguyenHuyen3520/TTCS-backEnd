const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DetailCourseSchema = new Schema({
    Course_id: {
        type: Schema.Types.ObjectId
    },
    Content: {
        type: [String]
    },
    Requirements: {
        type: [String]
    }
})

module.exports = mongoose.model('detailCourse', DetailCourseSchema)