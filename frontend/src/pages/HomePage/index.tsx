import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/utils/constants';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.BOOKS);
  }, []);

  return (
    <div>
      <h1>Books</h1>
    </div>
  );
}

export default HomePage;
