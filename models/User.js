const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String 
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    role:{
        type: Number,
        enum: [1,2,3]
    },
    seniority: {
        type: Boolean,        
    },
    salary:{
        type: Number
    }

})

module.exports = mongoose.model('User', UserSchema)