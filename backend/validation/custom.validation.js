const videolink = (value, helpers) => {
    if (!value.includes('youtube.com/embed/')) {
      return helpers.message("Video link is not correct");
    }
    return value;
};

module.exports = {
    videolink,
};