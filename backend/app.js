const express = require('express');
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const auth = require('./middlewares/auth');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path')
const { MONGODB_DNS_DOCKER, MONGODB_PORT } = require('./constants/constants');

// async function run() {
//     const PORT = 3000
//     const app = express();
//     console.log("9")

//     await mongoose.connect('mongodb://127.0.0.1:27017/ilivedatabase');
//     console.log("15")

//     app.use(express.json());

//     console.log("19")
//     app.use(cors({
//         origin: '*'
//     }));

//     app.use('/', router);



//     app.listen(PORT, () => {
//         console.log(`App listening on port ${PORT}`)
//     }) 
// };

// run();


const PORT = 4000
const app = express();

console.log("9")

app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'images/users')))
app.use(express.static(path.join(__dirname, 'usersPhotos')))

console.log("15")


app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: '*',
}));


app.use(express.static(path.join(__dirname, 'components/IdeasArticles')));
app.use(express.static(path.join(__dirname, 'components/Home')));
app.use(express.static(path.join(__dirname, 'components/IdeasArticles/ideasImages')));

app.use('/', require('./routes/home_cards'));
app.use('/', require('./routes/idea_cards'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/photos'));
app.use('/', require('./routes/articles'));

const start = async () => {

    try {
        await mongoose.connect(`mongodb://${MONGODB_DNS_DOCKER}:${MONGODB_PORT}/ilivedatabase`);
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

