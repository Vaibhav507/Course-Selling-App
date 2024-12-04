const express = require("express");
const userRouter = express.Router();
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");
require('dotenv').config()


userRouter.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Signup Successful"
    })

    
})

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email
    });

    if(user) {

        if(user.password === password) {

            const token = jwt.sign({
                id: user._id.toString()
            },process.env.JWT_SECRET);

            res.json({
                token: token
            });

        } else {
            res.status(401).json({
                message: "Wrong Password"
            });
        }

    } else {
        res.status(401).json({
            message: "No ID found with this email"
        });

    }

})

userRouter.get("/purchased", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const courses = await purchaseModel.find({
        userId: userId
    })

    res.json({
        courses
    })
    
})

module.exports = {
    userRouter: userRouter
}
