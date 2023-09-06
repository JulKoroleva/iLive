import TheImportanceofChoosingYourself from '../images/articles/bg/The-Importance-of-Choosing-Yourself.jpg';
import EmbracingImperfection from '../images/articles/bg/Embracing-Imperfection.jpg';
import CultivatingInnerPeace from '../images/articles/bg/Cultivating-Inner-Peace.jpg';
const {
  host, hostname, href, origin, pathname, port, protocol, search
} = window.location;


export const baseURL = `http://${hostname}:4000`;

console.log('baseURL = ', baseURL)

export const API_paths = {
  signup: '/signup',
  login: '/login',
  refresh: '/refresh',
  logout: '/logout',
  homeCarouselCards: '/get_carousel_cards',
  checkToken: '/checkToken',
  getGeneralIdeaCarouselCards: '/ideas',
  addPersonalIdeaCard: '/ideas/add',
  deleteCardForever: '/ideas/delete',
  getUserCardList: '/profile/cards',
  getUserDoneCardList: '/profile/cards-is-done',
  changeCardCompletedStatus: '/profile/cards-completed',
  giveUpAndDelete: '/profile/cards/delete',
  getPhotogallery: '/photogallery',
  postNewPhoto: '/photogallery/post',
  deletePhoto: '/photogallery/delete',
  getUserData: '/profile',
  changeUserAvatar: '/profile/avatar',
  updateUserInfo: '/profile/update-user',
  getUsefulArticle: '/articles',
  addArticleToFavorite: '/articles/add-favorite',
  getUserArticles: '/articles/user-favorite-list',
  drawing: '/profile/drawing',
};

export const headersCORS = {
  'Accept': 'application/json, text/html, *',
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Methods',
};

export const LIKE_PHOTO_STATUS = Object.freeze({
  liked: 1,
  unliked: 0,
  unknown: -1,
});

export const CANVAS_WIDTH = 1100;
export const WINDOW_INNERWIDHT = 1024;
export const MAX_WIDTH = 2000;
export const MAX_HEIGHT = 2000;
export const COOKIES_EXPIRES = 7;
export const TIMEOUT_SLIDER_UP = 1250;
export const TIMEOUT_SLIDER_LEFT = 1250;
export const TIMEOUT_SLIDER_RIGHT = 2500;
export const TIMEOUT_DELETE_CARD = 1500;
export const MIN_ALLOWED_YEAR = 1950;


export const articleBackgrounds = {
  TheImportanceofChoosingYourself : TheImportanceofChoosingYourself,
  EmbracingImperfection : EmbracingImperfection,
  CultivatingInnerPeace: CultivatingInnerPeace
}
