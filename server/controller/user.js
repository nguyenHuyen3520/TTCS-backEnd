const mongoose = require('mongoose');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getAllUser = (req, res) => User.find().then((data) => {
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

const deleteUser = (req, res) => User.findByIdAndDelete(req.params.id).then((result) => {
    return res.status(200).json({
        message: "User deleted successfully"
    })
});

const signupUser = async (req, res) => {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
        console.log("use da ton tai")
        return res.status(204).json({
            success: false,
            message: 'Tài khoản đã tồn tại!',
            data: req.body
        })
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await new User({
            userName: req.body.userName,
            password: hashedPassword,
            phone: req.body.phone,
            typeUser: req.body.typeUser,
            email: req.body.email,
        }).save();
        console.log("user", user)
        return res.status(200).json({
            success: true,
            message: 'Tài khoản đã tạo thành công!',
            data: req.body
        })
    }
};

const loginUser = async (req, res) => {
    if (req.body.isGoogle) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const payload = {
                id: user.id,
                userName: user.userName,
                email: user.email,
                typeUser: user.typeUser,
                isGoogle: true,
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({
                accessToken: accessToken,
                success: true,
                needCreate: true,
                isGoogle: true,
            });
        } else {
            console.log("tao user moi")
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                image: req.body.image
            }).save();
            console.log("user moi duoc tao la:", await User.findOne({ email: req.body.email }))
            const payload = {
                id: newUser.id,
                userName: newUser.userName,
                email: newUser.email,
                typeUser: newUser.typeUser,
                isGoogle: true,
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({
                accessToken: accessToken,
                success: true,
                isGoogle: true,
            });
        }
    } else {
        User.findOne({ email: req.body.email }).then((user) => {
            bcrypt.compare(req.body.password, user.password).then((result) => {
                if (result) {
                    console.log("ok ")
                    const payload = {
                        id: user.id,
                        userName: user.userName,
                        email: user.email,
                        typeUser: user.typeUser
                    }
                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                    return res.status(200).json({
                        accessToken: accessToken,
                        success: true,
                        image: user.image,
                        isGoogle: false,
                    });
                } else {
                    console.log("mat khau sai roi")
                    return res.status(202).json({
                        success: false,
                        message: 'Mật khẩu không đúng!',
                        type: 'password'
                    });
                }
            })
        }).catch((err) => {
            return res.status(202).json({
                success: false,
                message: 'Tài khoản không tồn tại!',
                type: 'email'
            })
        });
    }

};

const getProfile = (req, res) => {
    console.log(req.decode);
    return res.status(200).json({ user: req.decode });
}


module.exports = { getAllUser, signupUser, loginUser, deleteUser, getProfile };