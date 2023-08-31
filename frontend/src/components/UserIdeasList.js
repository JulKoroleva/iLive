import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, Link, NavLink } from 'react-router-dom';
import { TranslationContext } from '../context/TranslationContext';
import * as constants from '../constants/constants';
import * as auth from '../utils/auth';
import APIManager from '../utils/api';
import AnimatedButton from './AnimatedButton';

import giveUpButton from '../images/propfile/ideas/delete.png';

const UserIdeasList = (props) => {
  const translation = useContext(TranslationContext);
  const [userIdeaCardsData, setUserIdeaCardsData] = useState([]);
  console.log('userIdeaCardsData =,', userIdeaCardsData);
  const [doneCardsData, setDoneCardsDataData] = useState([]);
  console.log('doneCardsData =,', doneCardsData);
  

 

  const navigate = useNavigate();

  const getUserCardList = async () => {
    try {
      const json = await APIManager.getUserCardList();
      setUserIdeaCardsData(json);
    } catch (error) {
      console.error('Error while getting user card list:', error);
    }
  };

  useEffect(() => {
    getUserCardList();
  }, []);

  const getDoneCardList = async () => {
    try {
      const json = await APIManager.getUserDoneCardList();
      setDoneCardsDataData(json);
    } catch (error) {
      console.error('Error while getting user done card list:', error);
    }
  };

  useEffect(() => {
    getDoneCardList();
  }, []);

  const handleMoveToCompletedCard = async (key) => {
    await APIManager.changeCardCompletedStatus(key, true);

    const cardToMove = userIdeaCardsData.find((card) => card.key === key);
    setUserIdeaCardsData((prevCards) => prevCards.filter((card) => card.key !== key));
    setDoneCardsDataData((prevCards) => [...prevCards, cardToMove]);
  };

  const handleMoveToUncompletedCard = async (key) => {
    await APIManager.changeCardCompletedStatus(key, false);

    const cardToMove = doneCardsData.find((card) => card.key === key);
    setDoneCardsDataData((prevCards) => prevCards.filter((card) => card.key !== key));
    setUserIdeaCardsData((prevCards) => [...prevCards, cardToMove]);
  };

  const handleGiveUp = async (key) => {
    await APIManager.giveUpAndDelete(key);

    setUserIdeaCardsData((prevCards) => prevCards.filter((card) => card.key !== key));
  };
  
  return (
    <div className='profile-ideas__container'>
      {userIdeaCardsData.map((item) => (
        <>
          <div className='item__container'>
            <div className='item__container_data' onClick={() => props.openModal(item)}>
            <img className='item__container_data_image ideas__carousel-card_image' src={`${constants.baseURL}/${item.image}`} />
            <h1 className='item__container_data_title' style={{color:`${item.title.color}`}}>{item.title[translation.lang]}</h1>
            </div>

            <div className='item__container_buttons'>
              <div className='item-button'>
                <AnimatedButton onClick={() => handleMoveToCompletedCard(item.key)} completed={false}/>
              </div>

              <div className='item-button'>
                <button onClick={() => handleGiveUp(item.key)}><img src={giveUpButton} style={{width:'30px'}}/></button>
              </div>
            </div>
          </div>
        </>
      ))}

      {doneCardsData.map((item) => (
        <>
          <div className='done-item__container'>
            <div className='done-item__container_data'>
            <img className='item__container_data_image ideas__carousel-card_image' src={`${constants.baseURL}/${item.image}`} />
            <h1 className='item__container_data_title' style={{color:`${item.title.color}`}}>{item.title[translation.lang]}</h1>
            </div>

            <div className='done-item__container_buttons'>
              <div className='item-button'>
              <AnimatedButton onClick={() => handleMoveToUncompletedCard(item.key)} completed={true} />
              </div>

              <div className='item-button'>
                <button disabled><img src={giveUpButton} style={{width:'30px'}}/></button>
              </div>
            </div>

          </div>
        </>
      ))}
    </div>
  );
};

export default UserIdeasList;
