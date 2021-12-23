const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HolidaySalarySchema = new Schema({
    date:{
        type: Array
    },
    coefficient:{
        type: Number
    }
})

module.exports = mongoose.model('HolidaySalary', HolidaySalarySchema)