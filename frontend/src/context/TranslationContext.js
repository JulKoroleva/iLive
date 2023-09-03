import React  from 'react';
import UnderConstruction from '../components/UnderConstruction';

export const TranslationContext = React.createContext();

export const translations = {

  en: {
    lang : 'en' ,

    stickyMenu: {
      homePage:  'home',
      articles:  'articles',
      tests:  'tests',
      ideas:  'ideas',
      photogallery:  'photogallery',
      profile:  'profile',
      logout:  'logout',
    },

    upperHeader: {
      homePage:  'Home',
    },
    signup : {
        title: 'signup',
        submitButton: 'signup',
        errMessage: 'Something went wrong! Try again.',
        passwordLengthError: "Password must be at least 8 characters long, contain at least one uppercase letter and a number",
        homeRegButton:'Signup',
        registered: 'Already registered? Login'
    },
    login : {
        title: 'login',
        submitButton: 'login',
        errMessage: 'Wrong email or password.',
        passwordLengthError: "Password must be at least 8 characters long, contain at least one uppercase letter and a number.",
        homeLogButton:'Login',
        notRegistered: 'Not registered yet? Signup'
    },
    photogallery: {
      postPhotoTitle: 'Post a photo',
      choosePhoto: 'Choose a photo',
      writeTitle: 'Write a title...',
      writePost: 'Write a post...',
      postPhotoButton: 'Post'
    },
    profile: {
      name: 'Name:',
      age: 'Age:',
      quote: 'Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do. So сatch the trade winds in your sails. Explore. Dream. Discover!',
      ideasButton: 'ideas',
      calendarButton: 'calendar',
      drawingButton: 'sketchpad',
    },
    ideas: {
      deleteCardForeverTitle: 'Are you sure?',
      deleteCardForeverSubtitle: 'This action will delete the idea permanently.',     
      linkButton: 'More'     
    },
    sketchpad: 'Start drawing',
    calendar: {
      err: 'Please provide your date of birth',
      title: 'Calendar of Life',
      subtitle: 'The Calendar of Life is your faithful companion in the captivating journey through days and months. It reminds you that each day is a blank canvas in your hands, ready to become a work of art. May every date become an opportunity for new beginnings, kind deeds, and personal transformation.',
      isLived: 'You have lived for' 
    },
    underConstruction: {
      title: 'This page is under construction',
      button: 'Go back to the home page'
    },
    articles: {
      emptyTitle: 'Empty'
    },
    cookies: {
      buttonText: 'Accept',
      message: 'This website uses cookies to improve your user experience.'
    }
  },

  ru: {
    lang : 'ru' ,

    stickyMenu: {
      homePage:  'главная',
      articles:  'статьи',
      tests:  'тесты',
      ideas:  'идеи',
      photogallery:  'фотогалерея',
      profile:  'моя страница',
      logout:  'выход',
    },

    upperHeader: {
      homePage:  'Главная',
    },

    signup : {
        title: 'регистрация',
        submitButton: 'зарегестрироваться',
        errMessage: 'Что-то пошло не так! Попробуйте ещё раз.',
        passwordLengthError: "Пароль должен содержать не менее 8 символов, содержать хотя бы одну заглавную букву и цифру.",
        homeRegButton:'Регистрация',
        registered: 'Уже зарегестрировались? Войти'
    },
    login : {
        title: 'вход',
        submitButton: 'войти',
        errMessage: 'Неправильный адрес электронной почты или пароль.',
        passwordLengthError: "Пароль должен содержать не менее 8 символов, содержать хотя бы одну заглавную букву и цифру.",
        homeLogButton:'Войти',
        notRegistered: 'Еще не зарегистрировались? Регистрация'
    },
    photogallery: {
      postPhotoTitle: 'Опубликовать фото',
      choosePhoto: 'Выберете фото',
      writeTitle: 'Придумайте название...',
      writePost: 'Напишите пост...',
      postPhotoButton: 'Опубликовать',
      
    },
    profile: {
      name: 'Имя:',
      age: 'Возраст:',
      quote: 'Через двадцать лет вы будете сожалеть о том, чего не сделали, чем о том, что вы сделали. Поэтому, отбросьте сомнения. Исследуйте. Мечтайте. Открывайте!',
      ideasButton: 'идеи',
      calendarButton: 'календарь',
      drawingButton: 'скетчпад',
    },
    ideas: {
      deleteCardForeverTitle: 'Вы уверены?',
      deleteCardForeverSubtitle: 'Это действие удалит идею навсегда.', 
      linkButton: 'Подробнее'     
    },
    sketchpad: 'Нарисуй что-нибудь',
    calendar: {
      err: 'Укажите дату своего рождения',
      title: 'Календарь жизни',
      subtitle: 'Календарь жизни — ваш верный спутник в увлекательном путешествии сквозь дни и месяцы. Он напоминает, что каждый день — чистый лист в ваших руках, готовый стать произведением искусства. Пусть каждая дата станет возможностью для новых начинаний, добрых дел и личной трансформации.',
      isLived: 'Вы прожили' 
    },
    underConstruction: {
      title: 'Эта страница находится в разработке',
      button: 'Вернуться на главную'
    },
    articles: {
      emptyTitle: 'Пусто'
    },
    cookies: {
      buttonText: 'Принять',
      message: 'Этот сайт использует куки для лучшей работы.'
    }
  },
}; 