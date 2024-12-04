const jwt = require("jsonwebtoken");
require('dotenv').config()

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded)
    {
       req.userId = decoded.id;
       next();

    } else {
        res.status(403).json({
            message: "Token or signature invalid"
        });
    }
}

module.exports = {
    userMiddleware
}