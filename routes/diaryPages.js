const router = require("express").Router();

router.get("/", () => console.log("GET /pages"));
router.post("/", () => console.log("POST /pages"));
router.delete("/:pageId", () => console.log("DELETE /pages by ID"));

module.exports = router;
