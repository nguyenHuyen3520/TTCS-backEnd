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
    schedule: {
        type: [Date],
        default: []
    },
    price: {
        type: Number
    },
    learnedArray: {
        type: [Date],
        default: []
    },
    typeCourse: { type: String, default: "Full-Stack" },
    image:{
        type:String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ft3h.com.vn%2Ftin-tuc%2Fjsx-trong-reactjs&psig=AOvVaw2M3WmV7tsrUBIiJIwrzZIf&ust=1641311133564000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPipn8v2lfUCFQAAAAAdAAAAABAD"
    }
})

module.exports = mongoose.model('Course', CourseSchema)