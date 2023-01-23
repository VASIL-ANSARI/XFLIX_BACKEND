const Joi = require("joi");
const { contentRating } = require("../config/contentRating");
const { genres } = require("../config/genre");
const { videolink } = require("./custom.validation");

const upload = {
    body: Joi.object().keys({
      videoLink: Joi.string().custom(videolink,'video link validation'),
      title: Joi.string().required(),
      genre: Joi.string().valid(genres.ALL,genres.COMEDY,genres.EDUCATION,genres.LIFESTYLE,genres.MOVIES,genres.SPORTS).required(),
      contentRating: Joi.string().valid(contentRating.Anyone,contentRating.EighteenPlus,contentRating.SevenPlus,contentRating.SixteenPlus,contentRating.TwelvePlus).required(),
      releaseDate : Joi.date().required(),
      previewImage : Joi.string().required(),
    }),
};

const voteValidate = {
    body: Joi.object().keys({
        vote: Joi.string().required().valid("upVote","downVote"),
        change: Joi.string().required().valid("increase","decrease"),
    }),
}

module.exports = {
    upload,
    voteValidate
};