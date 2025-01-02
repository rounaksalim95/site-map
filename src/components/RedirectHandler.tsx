import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectFrom404 = sessionStorage.getItem('redirect_from_404');
    if (redirectFrom404) {
      navigate(redirectFrom404);
      sessionStorage.removeItem('redirect_from_404');
    }
  }, [navigate]);

  return null;
};

export default RedirectHandler; 