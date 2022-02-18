const User = require("../models/User");
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

const getListCourse = async (req, res) => Course.find().then(async (data) => {
    const listTeacher = await User.find({ typeUser: 'giao_vien' })
    const test = await User.findById("61ed9dfdbebab938a0f1355b")

    const response = data.map((item) => {
        const teacher = listTeacher.find((teacher) => {
            return teacher._id + "" === item.teacher_id + "";
        })
        return { typeCourse: item.typeCourse, image: item.image, _id: item._id, name: item.name, descriptions: item.descriptions, teacher_id: teacher._id, teacher: teacher }
    })
    console.log(response[0])
    return res.status(200).json({
        success: true,
        message: "Lay thanh cong danh sach",
        data: response
    })

}).catch((err) => {
    res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
    });
});

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
                "Sở hữu máy tính kết nối internet HDH Windows, Ubuntu hoặc MacOS",
                "Ý thức cao, trách nhiệm cao trong việc tự học. Thực hành lại sau mỗi bài học",
                "Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết"
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
    console.log("req.body", req.body)
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
    console.log("result", result)
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
    console.log(result);
    return res.status(200).json({
        data: result,
        success: true
    })
}

const addedSchedule = async (req, res) => {
    const course = await Schedule.findOne({ course_id: req.body.course_id });
    course.schedule = req.body.newSchedule;
    await course.save();
    console.log("course", course);
    return res.status(200).json({
        message: "successfully updated",
        data: course.schedule
    })
}
module.exports = { getListUser, createCourse, createTypeCourse, getListCourse, getTypeCourses, createUser, deleteUser, AdminUpdateUser, AdminUpdateCourse, getDetailCourse, getListUserOfType, addedSchedule };