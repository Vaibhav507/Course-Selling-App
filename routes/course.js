const express = require("express");
const courseRouter = express.Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");


courseRouter.post("/purchase", userMiddleware , async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.json({
        message: "Course purchased successfully"
    })

})

courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({});

    res.json({
        courses
    })
    
})

module.exports = {
    courseRouter: courseRouter
}
