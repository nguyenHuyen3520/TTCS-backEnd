const User = require("../models/User");
const Course = require("../models/Course");
const TypeCourse = require("../models/TypeCourse");
const bcrypt = require("bcryptjs/dist/bcrypt");
const getListUser = (req, res) => User.find().then((listUser) => {
    console.log("listUser: ", listUser);
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
        console.log("data: ", data);
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

const getListCourse = (req, res) => Course.find().then((data) => {
    console.log("data: ", data);
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

const createCourse = (req, res) => {
    console.log(req.body);
    const newCourse = new Course({
        name: req.body.name,
        descriptions: req.body.description,
        price: req.body.price,
    });
    console.log(newCourse);
    return newCourse.save().then((result) => {
        console.log(result);
        return res.status(200).json({
            success: true,
            message: 'New course created successfully',
            Course: result,
        });
    })
        .catch((error) => {
            console.log(error);
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
                return res.status(200).json({
                    success: true,
                    message: 'New type course created successfully',
                    Course: result,
                });
            })
                .catch((error) => {
                    console.log(error);
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
    console.log("data", req.body);
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(500).json({
                success: false,
                message: 'User da ton tai',
            });
        }
        return bcrypt.hash(req.body.password, 12)
    }).
        then(async (hashedPassword) => {
            const user = new User({
                userName: req.body.userName,
                password: hashedPassword,
                phone: req.body.phone,
                typeUser: req.body.typeUser,
                email: req.body.email,
            });
            const result = await user.save();
            return result;
            // return user.save()
            // .then((newUser) => {
            //     return res.status(200).json({
            //         success: true,
            //         message: 'New user created successfully',
            //         User: newUser,
            //     });
            // })
            // .catch((error) => {
            //     console.log(error);
            //     res.status(500).json({
            //         success: false,
            //         message: 'Server error. Please try again.',
            //         error: error.message,
            //     });
            // });
        })
}
module.exports = { getListUser, createCourse, createTypeCourse, getListCourse, getTypeCourses, createUser };