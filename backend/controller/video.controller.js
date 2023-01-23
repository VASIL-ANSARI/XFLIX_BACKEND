const httpStatus = require("http-status");
const config = require("../config/config");
const { contentRating } = require("../config/contentRating");
const { genres } = require("../config/genre");
const { Video } = require("../models/video.model");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const postVideo = catchAsync(async (req,res) => {
    const videoObj = {
        videoLink: req.body.videoLink,
        title: req.body.title,
        genre: req.body.genre,
        contentRating: req.body.contentRating,
        releaseDate: req.body.releaseDate,
        previewImage: req.body.previewImage,
    };
    console.log(videoObj);
    try{
        const response = await Video.create(videoObj);
        res.status(201).send(response);
    }catch(err){
        console.log(err);
        res.status(400).send();
    }
});


const updateViews = catchAsync(async (req,res) => {
    const id = req.params.videoId;
    console.log(id);
    const videoObj = await Video.findById(id);
    if(!videoObj){
        throw new ApiError(httpStatus.BAD_REQUEST,"video id must be a valid id");
    }
    videoObj.viewCount = videoObj.viewCount + 1;
    videoObj.save();
    res.status(204).send();
});

const updateVotes = catchAsync(async (req,res) => {
    const id = req.params.videoId;
    const body = req.body;
    const videoObj = await Video.findById(id);
    if(!videoObj){
        throw new ApiError(httpStatus.BAD_REQUEST,"video id must be a valid id");
    }
    if(body.vote === config.upVote){
        if(body.change === config.changeInc){
            videoObj.votes.upVotes += 1;
        }
        else if(body.change === config.changeDesc){
            videoObj.votes.upVotes -= 1;
        }
    }
    else if(body.vote === config.downVote){
        if(body.change === config.changeInc){
            videoObj.votes.downVotes += 1;
        }
        else if(body.change === config.changeDesc){
            videoObj.votes.downVotes -= 1;
        }
    }
    videoObj.save();
    res.status(204).send();
});

const getAllVideos = catchAsync(async (req,res) => {
    const id = req.params.videoId;
    if(id){
        const videos = await Video.findById(id);
        res.status(200).send(videos);
    }else{
        const videos = await Video.find({});
        res.status(200).send({videos: videos});
    }
});

const getFilteredVideos = catchAsync(async(req,res) => {
    try{
        const title = req.query.title ? req.query.title : '';
        const genre = req.query.genres;
        let genresList = [genres.COMEDY,genres.ALL,genres.EDUCATION,genres.LIFESTYLE,genres.MOVIES,genres.SPORTS];
        if(genre){
            if(genre === 'ALL'){
            }else{
                genresList = genre.split(',');
            }
            
        }
        const content = req.query.contentRating;
        let contentRatingList = [contentRating.Anyone,contentRating.EighteenPlus,contentRating.SevenPlus,contentRating.SixteenPlus,contentRating.TwelvePlus];
        if(content){
            contentRatingList = content.split(',');
        }
        const sortBy = req.query.sortBy ? req.query.sortBy : 'releaseDate';
        const queryList = [
            {
                title: {$regex: `(?i)${title}`}
            },
            {
                genre: {$in: genresList}
            },
            {
                contentRating: {$in: contentRatingList}
            },
        ];
        console.log(queryList);
        const videos = await Video.find({$and : queryList}).sort([[sortBy,-1]]);
        res.status(200).send({videos: videos});
    }
    catch(err){
        console.log(err);
        res.status(400).send();
    }
    
});

module.exports = {
    postVideo,
    updateViews,
    updateVotes,
    getAllVideos,
    getFilteredVideos,
};