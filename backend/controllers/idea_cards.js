const IdeaCard = require('../models/idea_cards')
const User = require('../models/users')
const mongoose = require('mongoose');
const tokenModel = require('../models/token')
const tokenService = require('../service/token')
const userService = require('../service/users')
const path = require('path');

const userIdeaCards = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
  

  const userData = req.headers;
  console.log('userIdeaCards userData= ',userData)
  try {
    const user = await userService.findUserByJWT(userData);
    console.log(`userIdeaCards user.`, user);
    if (user) {   
     // Find user collection by name
      //const collection = user.collections.find((item) => item.name === `${user.email}_general-cards`);
      const userGeneralCardsCollection = user.collections[`${user.email}_general-cards`]; 
      console.log(`userGeneralCardsCollection.`, userGeneralCardsCollection);       
        if (userGeneralCardsCollection) {
          // Send response to Fetch request
          console.log(`userGeneralCardsCollection.`, userGeneralCardsCollection); 
          const ideaDataBase = await IdeaCard.find();

          const originalPath = path.join(__dirname, 'IdeasArticles', 'ideasImages');
          const modifiedPath = originalPath.replace('controllers', 'components');
          
         // Formation of an array of objects with information about images
          const ideasData = userGeneralCardsCollection.map(idea => ({
            _id: idea._id,
            key: idea.key,
            title: idea.title,
            subtitle: idea.subtitle,
            image: idea.image, // Relative path to the image
            isDone: idea.isDone,
            link: idea.link,
            name: idea.name
          }));
          
          console.log('__dirname:', ideasData.image);
          console.log('ideaData:', ideasData);
    
          

          return res.json(ideasData);
        } else {
          console.log(`Collection named '${user.email}_general-cards' not found.`);
          
        }
    } else {
      console.log(`User named '${user.email}' not found.`);
    }
  } catch (error) {
      console.error('An error has occurred:', error);
      res.status(500).json({ error: 'A server error has occurred' });
      return res.json(error);
  } 
}

const addPersonalUserIdeaCards = async (req, res) => {
  const userData = req.headers;
  const { key } = req.body;

  try {
    const user = await userService.findUserByJWT(userData);

    let generalCardCollection = user.collections[`${user.email}_general-cards`];
    console.log('let generalCardCollection = user.collections.find', generalCardCollection);

    let selectedItemIndex = generalCardCollection.findIndex((item) => item.key === key);
    console.log('selectedItemIndex', selectedItemIndex);
    let personalCardCollection = user.collections[`${user.email}_personal-cards`];

    if (selectedItemIndex !== -1) {
      let selectedItem = generalCardCollection[selectedItemIndex];
      console.log('selectedItem', selectedItem);

      

      let newDocument = { ...selectedItem };
      personalCardCollection.unshift(newDocument);
      console.log('user.collection', user.collections);

      generalCardCollection.splice(selectedItemIndex, 1); // Remove the selected object from generalCardCollection
      console.log('generalCardCollection after removal', generalCardCollection);

      user.markModified('collections');
      await user.save();
      console.log('Item successfully copied to personalCardCollectionName');
    } else {
      console.log('The selected object was not found in generalCardCollection');
    }

    personalCardCollection = user.collections[`${user.email}_personal-cards`];
    console.log('personalCardCollection', user);
    user.markModified('collections');
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'A server error has occurred' });
  }
};

const deleteCardForever  = async (req, res) => {
  const userData = req.headers;
  const { key } = req.body;

  try {
    const user = await userService.findUserByJWT(userData);

    let generalCardCollection = user.collections[`${user.email}_general-cards`];
    console.log('let generalCardCollection = user.collections.find', generalCardCollection);

    let selectedItemIndex = generalCardCollection.findIndex((item) => item.key === key);
    console.log('selectedItemIndex', selectedItemIndex);
   
    if (selectedItemIndex !== -1) {      
      generalCardCollection.splice(selectedItemIndex, 1); // Remove the selected object from generalCardCollection
      console.log('generalCardCollection after removal', generalCardCollection);

      user.markModified('collections');
      await user.save();
      console.log('Item removed successfully');
     } else {
       console.log('The selected object was not found in generalCardCollection');
     }

     res.status(200).json({ success: true });
   } catch (error) {
     console.error('An error occurred:', error);
     res.status(500).json({ error: 'A server error has occurred' });
   }
};

const getPersonalUserIdeaList = async (req, res) => {

  const userData = req.headers;

  try {
    const user = await userService.findUserByJWT(userData);
    if (user) {   
      // Find user collection by name
      //const collection = user.collections.find((item) => item.name === `${user.email}_personal-cards`);
      const userPersonalCardsCollection = user.collections[`${user.email}_personal-cards`];
      const filteredCards = userPersonalCardsCollection.filter(item => item.isDone === false);
        if (filteredCards) {
          // Send response to Fetch request   
          return res.json(filteredCards);
        } else {
          console.log(`Collection named '${user.email}_personal-cards' not found.`);
        }
    } else {
      console.log(`User named '${user.email}' not found.`);
    }
  } catch (error) {
      console.error('An error has occurred:', error);
      res.status(500).json({ error: 'A server error has occurred' });
  }   
}


const getIsDoneIdeaCards = async (req, res) => {  

    const userData = req.headers;
  
    try {
      const user = await userService.findUserByJWT(userData);
      if (user) {           
        const userPersonalCardsCollection = user.collections[`${user.email}_personal-cards`];
        const filteredCards = userPersonalCardsCollection.filter(item => item.isDone === true);
          if (filteredCards) {
           // Send response to Fetch request        
            return res.json(filteredCards);
          } else {
            console.log(`Collection named '${user.email}_personal-cards' not found.`);
          }
      } else {
        console.log(`User named '${user.email}' not found.`);
      }
    } catch (error) {
        console.error('An error has occurred:', error);
        res.status(500).json({ error: 'A server error has occurred' });
    }     
}



const changeCardCompletedStatus = async (req, res) => {  

  const userData = req.headers;
  const { key, isDone } = req.body;
  console.log('isDone  =', isDone)
  console.log('moveCardToCompleted key =', key)
  try {
    const user = await userService.findUserByJWT(userData);

 

    let personalCardCollection = user.collections[`${user.email}_personal-cards`];
    console.log('let generalCardCollection = user.collections.find', personalCardCollection);

    let selectedItemIndex = personalCardCollection.findIndex((item) => item.key === key);
    console.log('selectedItemIndex', selectedItemIndex);
    

    user.collections[`${user.email}_personal-cards`][selectedItemIndex].isDone = isDone;
    user.markModified('collections');
    const updatedDoc = await user.save();

    console.log('updatedDoc:', updatedDoc);

    if (updatedDoc) {
      // The object has been found and its isDone property has been changed
      console.log('Object updated successfully:', updatedDoc);
      res.status(200).json({ message: 'Object updated successfully' });
    } else {
      // Object with specified key not found
      console.log('Object not found.');
      res.status(404).json({ message: 'Object not found.' });
    }
  } catch (error) {
    // Handling errors if the operation failed
    console.error('Error updating object:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const giveUpAndDelete = async (req, res) => { 
  const userData = req.headers;
  const { key } = req.body;

  try {
    const user = await userService.findUserByJWT(userData);

    let generalCardCollection = user.collections[`${user.email}_general-cards`];
    console.log('let generalCardCollection = user.collections.find', generalCardCollection);

    let personalCardCollection = user.collections[`${user.email}_personal-cards`];

    let selectedItemIndex = personalCardCollection.findIndex((item) => item.key === key);
    console.log('selectedItemIndex', selectedItemIndex);
    

    if (selectedItemIndex !== -1) {
      let selectedItem = personalCardCollection[selectedItemIndex];
      console.log('selectedItem', selectedItem);

      

      let newDocument = { ...selectedItem };
      generalCardCollection.unshift(newDocument);
      console.log('user.collection', user.collections);

      personalCardCollection.splice(selectedItemIndex, 1); // Remove the selected object from generalCardCollection
      console.log('personalCardCollection after removal', personalCardCollection);

      user.markModified('collections');
      await user.save();
      console.log('Item successfully copied to personalCardCollectionName');
    } else {
      console.log('The selected object was not found in generalCardCollection');
    }

    generalCardCollection = user.collections[`${user.email}_general-cards`];
    console.log('personalCardCollection', user);
    user.markModified('collections');
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'A server error has occurred' });
  }
};


module.exports = {
    userIdeaCards,
    addPersonalUserIdeaCards,
    getPersonalUserIdeaList,
    getIsDoneIdeaCards,
    changeCardCompletedStatus,
    giveUpAndDelete,
    deleteCardForever
  };