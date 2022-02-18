const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String
    },
    descriptions: {
        type: String
    },
    createAt: { type: Date, default: Date.now },
    schedule: [{
        title: String,
        startDate: Date,
        endDate: Date
    }],
    price: {
        type: Number
    },
    learnedArray: {
        type: [Date],
        default: []
    },
    teacher_id: {
        type: Schema.Types.ObjectId
    },
    typeCourse: { type: String, default: "Full-Stack" },
    image: {
        type: String, default: "https://lh4.ggpht.com/-PtwFBckvv78/V3aBB39xD9I/AAAAAAAAHFA/EXKKalIB8IkvyJjUzGrDVQCzLMs5Alx9QCLcB/s1600/anh-blogspot-khong-hien-thi.png"
    }
})

module.exports = mongoose.model('Course', CourseSchema)