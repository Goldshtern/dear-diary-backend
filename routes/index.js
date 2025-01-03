const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const diaryPagesRouter = require("./diaryPages");

router.use("/users", userRouter);
router.use("/pages", diaryPagesRouter);

module.exports = router;
