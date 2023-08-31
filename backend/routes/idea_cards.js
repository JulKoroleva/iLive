const express = require('express');
const router = express.Router();
const {userIdeaCards, addPersonalUserIdeaCards, deleteCardForever, getPersonalUserIdeaList, getIsDoneIdeaCards, changeCardCompletedStatus, giveUpAndDelete} = require('../controllers/idea_cards');
const auth = require('../middlewares/auth');
const path = require ('path')
const fs = require('fs');
const { PATH_TO_IDEAS_ARTICLES } = require('../constants/constants')



router.get('/ideas', auth, userIdeaCards);
router.post('/ideas/add', auth, addPersonalUserIdeaCards);
router.post('/ideas/delete', auth, deleteCardForever);

router.get('/profile/cards', auth, getPersonalUserIdeaList);
router.get('/profile/cards-is-done', auth, getIsDoneIdeaCards);

router.post('/profile/cards-completed', auth, changeCardCompletedStatus);
router.post('/profile/cards/delete', auth, giveUpAndDelete);


router.get('/ideas/articles/:fileName/:language', auth, (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { language } = req.params;
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '..', 'components', 'IdeasArticles', `${fileName}_${language}.html`);

      console.log('fileName = ', fileName, ' language = ', language);

  // Read file with markup
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        const json_obj = {
            html_code: data
        };
        res.send(json_obj);
      }
    });
  });
  
module.exports = router;