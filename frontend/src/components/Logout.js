import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

const Logout = () => {
  const navigate = useNavigate();


  const handleLogout = async () => {
    const token = auth.getJwtFromLS();
    await auth.logout(token);
    navigate('/home', { replace: true });
    window.location.reload();
  };


  
  useEffect(() => {
       handleLogout();
  }, [navigate]);

  return (
    <div>     
      Logging out...
    </div>
  );
};

export default Logout;
