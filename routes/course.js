const express = require("express");
const courseRouter = express.Router();
const { courseModel } = require("../db")


courseRouter.post("/signup", (req, res) => {

    
})

courseRouter.post("/signin", (req, res) => {
    

})

courseRouter.get("/purchased", (req, res) => {
    
})

module.exports = {
    courseRouter: courseRouter
}
