import * as constants from '../constants/constants';

export const getJwtFromLS = () => {
  const jwt = localStorage.getItem('refreshToken');
  return jwt;
};

export const register = async (password, email) => {
  return fetch(`${constants.baseURL}${constants.API_paths.signup}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...constants.headersCORS,
    },
    body: JSON.stringify({ 
      email: email, 
      password: password 
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('An error occurred while sending the request.');
    }
    return response.json();
  })
  .then(data => {  
    console.log('data.token,', data.refreshToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    console.log('JWT token saved.');
    return data;
  })
  .catch(error => {
    console.error('Error:', error);
    throw error; 
  });
};


export const login = async (email, password) => {
  const jwt = getJwtFromLS();
  return fetch(`${constants.baseURL}${constants.API_paths.login}`, {
    method: 'POST',
    headers: {  
      'Content-Type': 'application/json',
      'authorization': `Bearer ${jwt}`,
      ...constants.headersCORS,
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      console.log('response = ', response)
      if (!response.ok) {
        throw new Error('An error occurred while sending the request.');
      }
      return response.json();
    })
    .then((data) => {
      console.log('login userData', JSON.stringify(data));
      console.log('login data.refreshToken', data.refreshToken);
      console.log('login data.findedUser', JSON.stringify(data.findedUser));
      if (data){
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(data.findedUser));  
        data.ok = true
        return data; 
      }
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; 
    });
  };

export const logout = (token) => {
  const jwt = getJwtFromLS();
  console.log('token getItem', token);
  return fetch(`${constants.baseURL}${constants.API_paths.logout}`, {
    method: 'POST',
    headers: {  
      'Content-Type': 'application/json',
      'authorization': `Bearer ${jwt}`,
      ...constants.headersCORS,
    }, 
    body: JSON.stringify({ token }),
  })
    .then((response => response.json()))
    .then((data) => {
      console.log('logout', data);
      if (data){
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser'); 
      }
    })
    .catch(err => console.log(err));
};

export const checkToken = async (token) => {
  return fetch(`${constants.baseURL}${constants.API_paths.checkToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
      ...constants.headersCORS,
    },
    body: JSON.stringify({ token }),
  });
};
