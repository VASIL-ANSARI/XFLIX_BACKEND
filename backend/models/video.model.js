const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
    {
        videoLink: {
            type: String,
            required: true,
            validate(value) {
                if (!value.includes('youtube.com/embed/')) {
                  throw new Error(
                    "Link not correct"
                  );
                }
            },
        },
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        contentRating : {
            type: String,
            required: true,
        },
        releaseDate: {
            type: String,
            required: true,
        },
        previewImage : {
            type: String,
            required: true,
        },
        votes: {
            upVotes : {
                type: Number,
                default : 0,
            },
            downVotes : {
                type: Number,
                default : 0,
            },
        },
        viewCount : {
            type: Number,
            default : 0,
        },
    },
    {
        timestamps: false,
    }
);

const Video = mongoose.model('Video',videoSchema);

module.exports = {
    Video,
    videoSchema,
};