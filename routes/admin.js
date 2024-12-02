const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db")


adminRouter.post("/signup", (req, res) => {

    
})

adminRouter.post("/signin", (req, res) => {
    

})

adminRouter.post("/purchased", (req, res) => {
    
})

module.exports = {
    adminRouter: adminRouter
}
