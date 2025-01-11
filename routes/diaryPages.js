const router = require("express").Router();
const {
  getPages,
  createPage,
  deletePage,
} = require("../controllers/diaryPages");
const auth = require("../middlewares/auth");
const { validateDiaryPage, validateId } = require("../middlewares/validation");

router.get("/", auth, getPages);
router.post("/", auth, validateDiaryPage, createPage);
router.delete("/:pageId", auth, validateId, deletePage);

module.exports = router;
