import { Navbar } from '@mantine/core';
import { PiBooks } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsPersonCheck } from 'react-icons/bs';

import { ROUTES } from '@/utils/constants';

function NavbarComponent() {
  const path = useLocation();
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    setSelectedPath(path.pathname);
  }, [path]);

  return (
    <Navbar width={{ base: 300 }} p='xs'>
      <Link
        to={ROUTES.BOOKS}
        className={`flex p-[5px] hover:bg-blue-400 ${
          selectedPath.includes(ROUTES.BOOKS) ? 'bg-blue-600 text-white' : ''
        }`}
      >
        <PiBooks className='my-auto mx-[5px] text-xl' />
        <div className='my-auto'>Books</div>
      </Link>
      <Link
        to={ROUTES.AUTHROS}
        className={`flex p-[5px] hover:bg-blue-400 ${
          selectedPath.includes(ROUTES.AUTHROS) ? 'bg-blue-600 text-white' : ''
        }`}
      >
        <BsPersonCheck className='my-auto mx-[5px] text-xl' />
        <div className='my-auto'>Authors</div>
      </Link>
    </Navbar>
  );
}

export default NavbarComponent;
