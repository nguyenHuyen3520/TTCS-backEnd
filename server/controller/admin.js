const User = require("../models/User");
const mongoose = require("mongoose");
const Course = require("../models/Course");
const TypeCourse = require("../models/TypeCourse");
const bcrypt = require("bcryptjs/dist/bcrypt");
const DetailCourse = require("../models/DetailCourse");
const Schedule = require("../models/Schedule");
const getListUser = (req, res) => User.find().then((listUser) => {
    return res.status(200).json({
        success: true,
        message: "Lay thanh cong danh sach",
        listUser: listUser
    })

}).catch((err) => {
    res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
    });
});

const getTypeCourses = (req, res) => {
    const listTypeCourses = TypeCourse.find().then((data) => {
        return res.status(200).json({
            success: true,
            message: "Lay thanh cong danh sach",
            data: data
        })

    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
}

const getListCourse = async (req, res) => {
    const listCourse = await Course.find();
    const listTeacherId = listCourse.map((item) => item.teacher_id);
    const listTeacher = await User.find({ _id: { $in: listTeacherId } })
    const response = listCourse.map((item) => {
        let teacherFind = listTeacher.find((a) => {
            return a._id + "" === item.teacher_id + "";
        });
        return {
            teacher: teacherFind,
            typeCourse: item.typeCourse,
            image: item.image,
            _id: item._id,
            name: item.name,
            teacher_id: item.teacher_id,
            createAt: item.createAt,
            descriptions: item.descriptions,
        };
    })
    return res.status(200).json({
        success: true,
        message: "Lay thanh cong danh sach",
        data: response
    })
}

// Course.find().then(async (data) => {
//     const listTeacher = await User.find({ typeUser: 'giao_vien' })    
//     const response = data.map((item) => {
//         const teacher = listTeacher.find((teacher) => {
//             return teacher._id + "" === item.teacher_id + "";
//         })
//         return { typeCourse: item.typeCourse, image: item.image, _id: item._id, name: item.name, descriptions: item.descriptions, teacher_id: teacher._id, teacher: teacher }
//     })
//     console.log(response[0])
//     return res.status(200).json({
//         success: true,
//         message: "Lay thanh cong danh sach",
//         data: response
//     })

// }).catch((err) => {
//     res.status(500).json({
//         success: false,
//         message: 'Server error. Please try again.',
//         error: err.message,
//     });
// });
const createCourse = async (req, res) => {
    const newCourse = new Course({
        name: req.body.name,
        descriptions: req.body.descriptions,
        price: req.body.price,
        image: req.body.image,
        teacher_id: req.body.teacher_id,
    });
    return newCourse.save().then((result) => {
        const newSchedule = new Schedule({
            course_id: result._id,
            schedule: []
        })
        newSchedule.save();
        const newDetailCourse = new DetailCourse({
            Course_id: result._id,
            Content: [
                result.name + ' basic'
            ],
            Requirements: [
                "S??? h???u m??y t??nh k???t n???i internet HDH Windows, Ubuntu ho???c MacOS",
                "?? th???c cao, tr??ch nhi???m cao trong vi???c t??? h???c. Th???c h??nh l???i sau m???i b??i h???c",
                "B???n kh??ng c???n bi???t g?? h??n n???a, trong kh??a h???c t??i s??? ch??? cho b???n nh???ng g?? b???n c???n ph???i bi???t"
            ]
        })
        newDetailCourse.save()
        return res.status(200).json({
            success: true,
            message: 'New course created successfully',
            Course: result,
        });
    })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

const createTypeCourse = (req, res) => {
    const find = TypeCourse.findOne({ nameType: req.body.nameType }).then((result) => {
        if (!result) {

            const newTypeCourse = new TypeCourse({
                nameType: req.body.nameType,
            });
            return newTypeCourse.save().then((result) => {
                return res.status(201).json({
                    success: true,
                    message: 'New type course created successfully',
                    Course: result,
                });
            })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        } else {
            return res.status(500).json({
                success: false,
                message: 'name already exists',
            });
        }
    });
}

const createUser = async (req, res) => {
    const userFind = await User.findOne({ email: req.body.email });
    if (userFind) {
        res.status(204).json({
            success: false,
            message: 'User da ton tai',
        });
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            userName: req.body.userName,
            password: hashedPassword,
            phone: req.body.phone,
            typeUser: req.body.typeUser,
            email: req.body.email,
            image: req.body.image
        })
        user.save();
        return res.status(200).json({
            message: "Create user successfully",
            success: true,
            data: user
        });
    }
    // User.findOne({ email: req.body.email }).then(user => {
    //     if (user) {
    //         res.status(204).json({
    //             success: false,
    //             message: 'User da ton tai',
    //         });
    //     }
    //     return bcrypt.hash(req.body.password, 12)
    // }).
    //     then(async (hashedPassword) => {
    //         if (!req.body.image) {
    //             req.body.image = "https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-11.jpg";
    //         }
    //         const user = new User({
    //             userName: req.body.userName,
    //             password: hashedPassword,
    //             phone: req.body.phone,
    //             typeUser: req.body.typeUser,
    //             email: req.body.email,
    //             image: req.body.image
    //         });
    //         const result = await user.save();
    //         return res.status(200).json({
    //             message: "Create user successfully",
    //             success: true,
    //         });
    //     }).catch(err => {
    //         console.log("err trong create", err)
    //     })
}

const deleteUser = async (req, res) => {
    const userFind = await User.findById(req.query.id);
    const uid = userFind.uid;
    return userFind.delete().then(() => {
        return res.status(200).json({
            success: true,
            message: 'Delete user successfully',
            uid: uid
        })
    }).catch((err) => {
        return res.status(400).json({
            success: false,
            message: err,
        });
    })
}

const AdminUpdateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    // if (!req.body.image) {
    //     req.body.image = "https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-11.jpg";
    // }
    // const user = {
    //     userName: req.body.userName,
    //     password: hashPassword,
    //     phone: req.body.phone,
    //     typeUser: req.body.typeUser,
    //     email: req.body.email,
    //     image: req.body.image
    // };
    const result = await User.updateOne({ _id: req.body._id }, { $set: req.body });

    const userUpdate = await User.findById(req.body._id);
    return res.status(200).json({
        success: true,
        message: 'Update user successfully',
    })
}

const AdminUpdateCourse = async (req, res) => {
    const result = await Course.updateOne({ _id: req.body._id }, { $set: req.body });
    return res.status(200).json({
        message: "Update successfully"
    })
}

const getDetailCourse = async (req, res) => {
    const result = await DetailCourse.findOne({ Course_id: req.query.Course_id });
    return res.status(200).json({
        data: result,
        success: true,
    })
}

const getListUserOfType = async (req, res) => {
    const result = await User.find({ typeUser: req.query.typeUser });
    return res.status(200).json({
        data: result,
        success: true
    })
}

const addedSchedule = async (req, res) => {
    const course = await Schedule.findOne({ course_id: req.body.course_id });
    course.schedule = req.body.newSchedule;
    await course.save();
    return res.status(200).json({
        message: "successfully updated",
        data: course.schedule
    })
}
module.exports = { getListUser, createCourse, createTypeCourse, getListCourse, getTypeCourses, createUser, deleteUser, AdminUpdateUser, AdminUpdateCourse, getDetailCourse, getListUserOfType, addedSchedule };