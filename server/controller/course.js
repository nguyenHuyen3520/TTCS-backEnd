const User = require("../models/User");
const Course = require("../models/Course");
const DetailCourse = require("../models/DetailCourse");
const bcrypt = require("bcryptjs/dist/bcrypt");
const Mongoose = require('mongoose')
const Course_User = require("../models/Course_User");
const Schedule = require("../models/Schedule");


const getCourse = async (req, res) => {
    const resultDetail = await DetailCourse.findOne({ Course_id: req.params.id });
    const resultCourse = await Course.findById(req.params.id);
    return res.status(200).json({
        success: true,
        message: "Lay thanh cong danh sach",
        data: { resultCourse, resultDetail }
    })

}

const createDetailCourse = async (req, res) => {
    const result = new DetailCourse(req.body);
    result.save();
}

const addUserToCourse = async (req, res) => {
    const check = await Course_User.findOne({
        Course_id: req.body.Course_id,
        User_id: req.body.User_id
    });
    if (check) {
        console.log("test");
    } else {
        const newData = new Course_User({
            Course_id: req.body.Course_id,
            User_id: req.body.User_id
        })
        newData.save();
        return res.status(200).json({
            success: true,
            message: "Them thanh cong danh sach",
        })
    }
}

const deleteUserFromCourse = async (req, res) => {
    console.log(req.body)
    const result = await Course_User.findOneAndDelete({
        Course_id: req.body.Course_id,
        User_id: req.body.User_id
    });
    console.log("result delete:", result);
    return res.status(200).json({
        message: "SuccessFull"
    })
}

const checkStatus = async (req, res) => {
    const check = await Course_User.findOne({
        Course_id: req.body.Course_id,
        User_id: req.body.User_id
    });
    if (check) {
        return res.status(200).json({
            status: false
        })
    } else {
        return res.status(200).json({
            status: true
        })
    }
}

const getListMyCourse = async (req, res) => {
    const listMyCourse = await Course_User.find({ User_id: req.body.user_id });
    const listCourseId = listMyCourse.map((item) => item.Course_id);
    const listScheduleData = await Schedule.find({ course_id: { $in: listCourseId } })
    const listCourse = await Course.find({ _id: { $in: listCourseId } })
    const response = listCourse.map((item, index) => {
        return {
            name: item.name,
            descriptions: item?.descriptions,
            createAt: item?.createAt,
            schedule: listScheduleData[index].schedule,
            price: item?.price,
            learnedArray: item?.learnedArray,
            teacher_id: item?.teacher_id,
            image: item?.image
        }
    })
    return res.status(200).json({
        message: "Lay thanh cong danh sach",
        data: response
    });
}

const createSchedule = async (req, res) => {
    // const newSchedule = new Schedule(req.body);
    // await newSchedule.save();
    // return res.status(200).json({
    //     message: "Tao schedule thanh cong danh sach",
    // });
}

const getSchedule = async (req, res) => {
    const user_id = req.decode.id;
    const listMyCourse = await Course_User.find({ User_id: user_id });
    const listCourseId = listMyCourse.map((item) => item.Course_id);
    const listScheduleData = await Schedule.find({ course_id: { $in: listCourseId } });
    const listCourse = await Course.find({ _id: { $in: listCourseId } });
    let array = [];
    const listData = listScheduleData.map((item) => {
        item.schedule.map((item2) => array.push(item2))
    });
    return res.status(200).json({
        message: "Lay schedule thanh cong danh sach",
        data: array
    });
}

const getScheduleOfCourse = async (req, res) => {
    const scheduleData = await Schedule.findOne({ course_id: req.query.course_id });
    const test = await Schedule.findOne({ course_id: req.query.course_id });
    const listUserFind = await Course_User.find({ Course_id: req.query.course_id })
    const listUserID = listUserFind.map(item => item.User_id);
    const listUser = await User.find({ _id: { $in: listUserID } });
    return res.status(200).json({
        data: scheduleData,
        listUser: listUser
    })
}
const getUserOfCourse = async (req, res) => {

}

const changedSchedule = async (req, res) => {
    console.log("changed schedule", req.body);
    const course = await Schedule.findOne({ course_id: req.body.course_id });
    console.log("schedule prev: ", course.schedule);
    course.schedule = req.body.data;
    console.log("schedule new: ", course.schedule);
    await course.save();
    return res.status(200).json({
        message: "successfully updated"
    })
}

const getSearch = async (req, res) => {
    const listCourse = await Course.find({ name: { '$regex': '' + req.query.keyword } });
    console.log(listCourse.length)
    return res.status(200).json({
        data: listCourse,
        message: "search thanh cong danh sach"
    })
}
module.exports = { changedSchedule, getScheduleOfCourse, getCourse, createDetailCourse, deleteUserFromCourse, addUserToCourse, checkStatus, getListMyCourse, createSchedule, getSchedule, getUserOfCourse, getSearch };