const User = require('../models/User')
const Class = require('../models/Class')
const Attendance = require('../models/Attendance')
const Class_user = require('../models/Class_user')
const HolidaySalary = require('../models/HolidaySalary')

const mongoDataMethods = {
    // Query
    // lay ra ds theo role: 1-HV 2-GV 3-Admin
    getAllUser: async (role) => await User.find(role),

    getUser: async (id) => await User.findById(id),

    getAllClass: async () => await Class.find(),

    getClass: async (id) => await Class.findById(id),

    getHolidaySalary: async () => await HolidaySalary.find(),

    getAttendance: async (id) => await Attendance.findById(id),

    getStudentOfClass: async (id) => {
        const listStudent = await Class_user.find(id)
        const data = listStudent.map((item)=> getUser(item.id))
        return data
    },

    getClassOfStudent: async (id) => {
        const listClass = await Class_user.find(id)
        const data = listClass.map((item)=> this.getClass(item.id))
        return data
    },
    // MUTATION
    createUser: async(args)=> {
        const newUser = new User(args)
        return await newUser.save()
    },

    createClass: async (args) => {
        const newClass = new Class(args)
        return await newClass.save()
    },

    createAttendance: async (args) => {
        const newAttendance = new Attendance(args)
        return await newAttendance.save()
    },

    DeleteUser: async (id) => await User.remove(id),

    DeleteClass: async (id) => await Class.remove(id),

}

module.exports = mongoDataMethods