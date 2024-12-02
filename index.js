const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


async function main() {
    await mongoose.connect("mongodb+srv://vaibhavpratham507:%40Vaibhav507@cluster0.peef0.mongodb.net/Course-Selling-App")
    app.listen(3000);
    
};

main();

