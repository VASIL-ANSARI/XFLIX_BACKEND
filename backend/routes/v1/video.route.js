const express = require("express");
const { postVideo, updateViews, updateVotes, getAllVideos, getFilteredVideos } = require("../../controller/video.controller");
const validate = require("../../middleware/validate");
const { upload, voteValidate } = require("../../validation/video.validation");
const router = express.Router();

router.post("/", validate(upload) , async(req,res) => {
    //console.log(req.body);
    postVideo(req,res);
});

router.patch("/:videoId/views", async(req,res) => {
    console.log(req.params);
    updateViews(req,res);
});

router.patch("/:videoId/votes", validate(voteValidate), async(req,res) => {
    console.log(req.params);
    updateVotes(req,res);
});

router.get("/",async(req,res) => {
    console.log(req.query);
    if(req.query.length === 0){
        getAllVideos(req,res);
    }else{
        getFilteredVideos(req,res);
    }
});

router.get("/:videoId",async(req,res) => {
    getAllVideos(req,res);
});

module.exports = router;