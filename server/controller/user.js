const mongoose = require('mongoose');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const getAllUser = (req, res) => User.find().then((data) => {
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

const deleteUser = (req, res) => User.findByIdAndDelete(req.params.id).then((result)=> {
    console.log(result);
});

const signupUser = async (req, res) => {
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
        then((hashedPassword) => {
            const user = new User({
                userName: req.body.userName,
                password: hashedPassword,
                phone: req.body.phone,
                typeUser: req.body.typeUser,
                email: req.body.email,
            });
            return user.save()
                .then((newUser) => {
                    return res.status(200).json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
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
        })
};

const loginUser = (req, res) => {
    User.find({ email: req.body.email }).then((user) => {        
        bcrypt.compare(req.body.password,user[0].password).then((result) => {
            if (result) {
                const payload = {
                    id: user[0].id,
                    userName: user[0].userName,
                    email: user[0].email,
                    typeUser: user[0].typeUser
                }                
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                return res.status(200).json({
                    accessToken: accessToken
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'mat khau sai.',                    
                });
            }
        })
    });
};

const getProfile = (req, res)=>{
    console.log(req.decode);
    return  res.status(200).json({user: req.decode});
}


module.exports = { getAllUser, signupUser, loginUser, deleteUser, getProfile };