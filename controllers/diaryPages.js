const DiaryPage = require("../models/diaryPage");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

const getPages = (req, res, next) => {
  DiaryPage.find()
    .then((diaryPages) => res.send({ diaryPages }))
    .catch(next);
};

const createPage = (req, res, next) => {
  const { title, imageUrl, text } = req.body;
  const owner = req.user._id;
  DiaryPage.create({ title, imageUrl, owner, text })
    .then((page) => res.status(201).send(page))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deletePage = (req, res, next) => {
  DiaryPage.findById(req.params.pageId)
    .orFail(() => {
      throw new NotFoundError("Requested resource not found");
    })
    .then((page) => {
      if (page.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Access forbidden");
      }
      return page
        .deleteOne()
        .then(() => res.status(200).send({ message: "Page deleted" }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = { getPages, createPage, deletePage };
