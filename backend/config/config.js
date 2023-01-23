const dotenv = require('dotenv');
const path = require('path');

const VOTE_UP = "upVote";
const VOTE_DOWN = "downVote";
const CHANGE_INC = "increase";
const CHANGE_DESC = "decrease";

dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORTS,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  upVote: VOTE_UP,
  downVote: VOTE_DOWN,
  changeInc: CHANGE_INC,
  changeDesc : CHANGE_DESC,
};