const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    name: {
        type: String 
    },
    teacherId: {
        type: String
    },
    studentArray:{
        type: Array,
        default: []
    },
    price:{
        type: Number
    },
    totalDay: {
        type: Number
    },
    startDate: {
        type: Date
    },
    learnedArray:{
        type: Array,
        default: []
    },
    schedule:{
        type: Array
    }
})

module.exports = mongoose.model('Class', ClassSchema)