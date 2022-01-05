const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course_UserSchema = new Schema({
    Course_id: {
        type: Schema.Types.ObjectId
    },
    User_id: {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Course_User', Course_UserSchema)