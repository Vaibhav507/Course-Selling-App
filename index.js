const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()
const { userRouter } = require("./routes/user")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")

app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


async function main() {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION_URL)
    app.listen(3000);
};

main();

