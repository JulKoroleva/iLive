import * as constants from '../constants/constants';
import * as auth from './auth';

class APIManager {
  static async getGeneralIdeaCarouselCards() {
    try {
      const jwt = auth.getJwtFromLS();
      const response = await fetch(
        `${constants.baseURL}${constants.API_paths.getGeneralIdeaCarouselCards}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${jwt}`,
            ...constants.headersCORS,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error while getting data. Status: ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Received data is not an array');
      }

      return data;
    } catch (error) {
      console.error('Error while getting data:', error);
      throw error; 
    }
  }

  static async addPersonalIdeaCard(key) {
    const jwt = auth.getJwtFromLS();
    return await fetch(`${constants.baseURL}${constants.API_paths.addPersonalIdeaCard}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
        ...constants.headersCORS,
      },
      body: JSON.stringify({ key }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error adding card:', error);
      });
  }

  static async deleteCardForever(key) {
    const jwt = auth.getJwtFromLS();
    return await fetch(`${constants.baseURL}${constants.API_paths.deleteCardForever}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
        ...constants.headersCORS,
      },
      body: JSON.stringify({ key }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Card deletion error:', error);
      });
  }

  static async changeCardCompletedStatus(key, isDone) {
    const jwt = auth.getJwtFromLS();
    return fetch(`${constants.baseURL}${constants.API_paths.changeCardCompletedStatus}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
        ...constants.headersCORS,
      },
      body: JSON.stringify({ key, isDone }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error changing card status:', error);
      });
  }

  static async giveUpAndDelete(key) {
    const jwt = auth.getJwtFromLS();
    return await fetch(`${constants.baseURL}${constants.API_paths.giveUpAndDelete}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Idea deletion error:', error);
      });
  }

  static async postNewPhoto(fileData) {
    console.log('formData!!!!!!!!!!! =', fileData);
    const jwt = auth.getJwtFromLS(); 
    return await fetch(`${constants.baseURL}${constants.API_paths.postNewPhoto}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${jwt}`,
        ...constants.headersCORS,
      },
      body: fileData,
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Photo post error:', error);
      });
  }

  static async likeToPhoto(photoId, jwt) {
    console.log('`${constants.baseURL}/photos/${photoId}/likes`', `${constants.baseURL}/photos/${photoId}/likes`);
    return fetch(`${constants.baseURL}/photogallery/photos/${photoId}/likes`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error setting likes:', error);
      });
  }

  static async deletePhoto(photoId, jwt) {
    console.log('${constants.baseURL}${constants.API_paths.deletePhoto}/${photoId}', `${constants.baseURL}${constants.API_paths.deletePhoto}/${photoId}`);
    return fetch(`${constants.baseURL}${constants.API_paths.deletePhoto}/${photoId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Photo deletion error:', error);
      });
  }

  static async saveDrawing(dataURL, jwt) {
    return fetch(`${constants.baseURL}${constants.API_paths.drawing}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataURL }),
    });
  }

  static async getDrawing(jwt) {
    const response = await fetch(`${constants.baseURL}${constants.API_paths.drawing}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.dataURL;
    }

    return null;
  }

  static async getArticle(articleURL) {
    const jwt = auth.getJwtFromLS();
    console.log('`${constants.baseURL}/articles/article/${articleURL}`', `${constants.baseURL}/articles/article/${articleURL}`)
    try {
      const response = await fetch(`${constants.baseURL}/articles/article/${articleURL}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS,
        },
      });

      console.log('response.status = ', response.status);

      const article = await response.json();
      console.error('getArticle article = ', article);
      return article;
    } catch (error) {
      console.error('Error while getting data:', error);
      throw error;
    }
  }

  static async getCarouselData() {
    const jwt = auth.getJwtFromLS();
    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.homeCarouselCards}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${jwt}`,
          ...constants.headersCORS,
        },
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error while getting data:', error);
      return null;
    }
  }

  static async getIdeaArticle(fileName, language) {
    const jwt = auth.getJwtFromLS();

    try {
      const response = await fetch(`${constants.baseURL}/ideas/articles/${fileName}/${language}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS
        }
      });

      console.log('response.status = ', response.status);

      if (!response.ok) {
        // Handle error, e.g., redirect to login page
        console.log('!response.ok = ');
        throw new Error('Response not OK');
      }

      const json = await response.json();
      console.error('getIdeaArticle json = ', json);
      return json.html_code;
    } catch (error) {
      console.error('Error while getting data:', error);
      throw error;
    }
  }

  static async getUserData() {
    const jwt = auth.getJwtFromLS();
    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.getUserData}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${jwt}`,
          ...constants.headersCORS
        }
      });
      if (!response.ok) {
        throw new Error('Failed to get user data');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getPhotogallery() {
    const jwt = auth.getJwtFromLS();
    try {
      const response = await fetch(
        `${constants.baseURL}${constants.API_paths.getPhotogallery}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${jwt}`,
            ...constants.headersCORS,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to get photogallery');
      }
      const json = await response.json();
      return json.reverse();
    } catch (error) {
      console.error('Failed to get photogallery:', error);
      throw error;
    }
  }

  static async getUserArticles() {
    const jwt = auth.getJwtFromLS();

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.getUserArticles}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user articles');
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error while fetching user articles:', error);
      throw error;
    }
  }

  static async getUsefulArticle() {
    const jwt = auth.getJwtFromLS();

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.getUsefulArticle}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get useful article');
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error while getting data:', error);
      throw error;
    }
  }

  static async getUserCardList() {
    const jwt = auth.getJwtFromLS();

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.getUserCardList}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user card list');
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error while getting user card list:', error);
      throw error;
    }
  }

  static async getUserDoneCardList() {
    const jwt = auth.getJwtFromLS();

    try {
      const response = await fetch(`${constants.baseURL}${constants.API_paths.getUserDoneCardList}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          ...constants.headersCORS,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user done card list');
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error while getting user done card list:', error);
      throw error;
    }
  }

  static async changeCardCompletedStatus(key, isDone) {
    const jwt = auth.getJwtFromLS();
    return fetch(`${constants.baseURL}${constants.API_paths.changeCardCompletedStatus}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
        ...constants.headersCORS,
      },
      body: JSON.stringify({ key, isDone }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error changing card status:', error);
      });
  }

  static async giveUpAndDelete(key) {
    const jwt = auth.getJwtFromLS();
    return await fetch(`${constants.baseURL}${constants.API_paths.giveUpAndDelete}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Idea deletion error:', error);
      });
  }

  
}

export default APIManager;
