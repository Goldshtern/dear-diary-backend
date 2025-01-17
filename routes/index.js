const express = require("express");
const userRouter = require("./users");
const diaryPagesRouter = require("./diaryPages");
const NotFoundError = require("../errors/not-found-err");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validation");

const router = express.Router();

router.use("/users", userRouter);
router.use("/pages", diaryPagesRouter);

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserInfo, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
