const router = require("express").Router();

router.get("/me", () => console.log("GET users"));

module.exports = router;
