const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    typeUser: {
        type: String,
        default: 'hoc_vien'
    },
    image: {
        type: String,
        default: "https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-11.jpg"
    },
    uid: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema)