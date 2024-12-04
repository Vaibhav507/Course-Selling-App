const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const { adminModel, courseModel, userModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");
require('dotenv').config();
const bcrypt = require("bcrypt");


adminRouter.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hashedPassword = await bcrypt.hash(password, 5);
    
    await adminModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Signup Successful"
    })

})

adminRouter.post("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password;

    const admin = await adminModel.findOne({
        email: email
    });

    if(!admin) {
        res.status(401).json({
            message: "No ID found with this email"
        });
        return;
    }

    const passwordMatched = await bcrypt.compare(password, admin.password);


    if(passwordMatched) {

        const token = jwt.sign({
            id: admin._id.toString()
        },process.env.JWT_SECRET2);

        res.json({
            token: token
        });

    } else {
        res.status(401).json({
            message: "Wrong Password"
        });
    }

   
    

})

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    const {title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    
    res.json({
        message: "Course created successfully",
        courseId: course._id
    })
 
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId

    const {title, description, imageUrl, price, courseId} = req.body

    await courseModel.updateOne(
        { 
            _id: courseId,
            creatorId: adminId
        },
        {
            $set: { 
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl
            }
        }
    )

    res.json({
        message: "Updated Course Successfully"
    })

})

adminRouter.get("/course", adminMiddleware, async (req, res) => {
    const adminId= req.adminId;

    const courses = await courseModel.find({creatorId: adminId})

    let courseTitles = [];

    for (let i = 0; i < courses.length; i++) {
        courseTitles.push(courses[i].title);
    }



    res.json({
        message: "All courses created by you",
        courses: courseTitles
    })


})

module.exports = {
    adminRouter: adminRouter
}
