const LIKE_PHOTO_STATUS = Object.freeze({
    liked: 1,
    unliked: 0,
    unknown: -1,
});

const PATH_TO_IDEAS_ARTICLES = 'C:\Users\Юля\Desktop\сайтик\iLive\ilive\ilive\backend\components\IdeasArticles'

const MONGODB_DNS_DOCKER = "mongodb-container";
const MONGODB_PORT = '27017'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

module.exports = {
    LIKE_PHOTO_STATUS,
    PATH_TO_IDEAS_ARTICLES,
    emailRegex,
    passwordRegex,
    MONGODB_DNS_DOCKER,
    MONGODB_PORT
}
