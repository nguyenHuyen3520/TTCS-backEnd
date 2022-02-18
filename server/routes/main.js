const express = require('express');
const { getAllUser, signupUser, loginUser, getProfile } = require("../controller/user");
const { getListUserOfType, getDetailCourse, getListUser, createCourse, createTypeCourse, getTypeCourses, createUser, getListCourse, deleteUser, AdminUpdateUser, AdminUpdateCourse, addedSchedule } = require("../controller/admin");
const { changedSchedule, getUserOfCourse, getSchedule, getCourse, createDetailCourse, addUserToCourse, deleteUserFromCourse, checkStatus, getListMyCourse, createSchedule, getScheduleOfCourse, getSearch } = require("../controller/course");
const controller = require('../meet/controller');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader;

    if (!token) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decode = decoded;
        next();
    } catch (error) {
        console.log("sai roi")
        console.log(error);
        return res.sendStatus(403);
    }
};

const verifyAdmin = (req, res, next) => {
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
// router.delete("/users/:id", verifyToken, deleteUser);

//========================== Course ===================
router.get('/list-course', getListCourse);
router.get('/course/:id', getCourse);
router.post('/list-myCourse', getListMyCourse);
router.get('/get-schedule', verifyToken, getSchedule);
router.get('/get-schedule-of-course', verifyToken, getScheduleOfCourse);
router.get('/get-user-of-course', verifyToken, getUserOfCourse);

router.post('/create-detailCourse', createDetailCourse);
router.post('/add-user-to-course', verifyToken, addUserToCourse);
router.post('/delete-user-from-course', verifyToken, verifyAdmin, deleteUserFromCourse);
router.post('/check-course', verifyToken, checkStatus);
router.post('/create-schedule', verifyToken, createSchedule);
router.post('/changed-schedule', verifyToken, verifyAdmin, changedSchedule);
router.get('/search', getSearch)

//  =================== ADMIN =============================
router.get("/admin/list-user", verifyToken, verifyAdmin, getListUser);
router.get("/admin/list-typeCourses", getTypeCourses);
router.get("/admin/get-detail-course", getDetailCourse);
router.get("/admin/get-list-users", getListUserOfType);

router.post("/admin/create-course", verifyToken, verifyAdmin, createCourse);
router.post("/admin/create-user", verifyToken, verifyAdmin, createUser);
router.post("/admin/create-typeCourse", createTypeCourse);
router.post('/added-schedule', verifyToken, verifyAdmin, addedSchedule);

router.patch("/admin/update-user", verifyToken, verifyAdmin, AdminUpdateUser);
router.patch("/admin/update-course", verifyToken, verifyAdmin, AdminUpdateCourse);
router.delete("/admin/delete-user", verifyToken, verifyAdmin, deleteUser);

// MEET
router.post("/api/save-call-id", controller.saveCallId);
router.get("/api/get-call-id/:id", controller.getCallId);
module.exports = router;