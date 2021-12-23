const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Class_userSchema = new Schema({
    classId:{
        type: String
    },
    studentId:{
        type: String
    },
    checkMoney:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Class_user', Class_userSchema)