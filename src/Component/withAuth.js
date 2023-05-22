import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const isAuthenticated = checkAuth();

      if (!isAuthenticated) {
        navigate('/login');
      }
    }, []);

    const checkAuth = () => {
      const cookies = new Cookies();
      const token = cookies.get('token');

      // Replace this condition with your token validation logic
      // Example: Check if the token is valid and not expired
      return !!token;
    };

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
