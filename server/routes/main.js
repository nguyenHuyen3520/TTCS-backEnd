const express = require('express');
const { getAllUser, signupUser, loginUser, deleteUser, getProfile } = require("../controller/user");
const { getListUser, createCourse,createTypeCourse, getTypeCourses,createUser, getListCourse } = require("../controller/admin");
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader;

    if (!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decode = decoded;
        console.log(req.decode);
        next();
    } catch (error) {
        console.log("sai roi")
        console.log(error);
        return res.sendStatus(403);
    }
};

const verifyAdmin = (req, res, next) => {
    console.log(req.decode);
    if (req.decode.typeUser == 'admin') {        
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'User is not admin',
        });
    }
}

// =========== USER ===================
router.get("/users", verifyToken, getAllUser);
router.get("/profile", verifyToken, getProfile);
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.delete("/users/:id", verifyToken, deleteUser);

//========================== Course ===================
router.get('/list-course', getListCourse );

//  =================== ADMIN =============================
router.get("/admin/list-user", verifyToken, verifyAdmin, getListUser);
router.get("/admin/list-typeCourses", getTypeCourses );

router.post("/admin/create-course", verifyToken, verifyAdmin, createCourse);
router.post("/admin/create-user", verifyToken, verifyAdmin, createUser);
router.post("/admin/create-typeCourse",createTypeCourse);

module.exports = router;