import { FC } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props {
  size: number;
}

const Spinner: FC<Props> = ({ size }) => {
  return <BiLoaderAlt className='animate-spin text-center w-full' style={{ fontSize: size }} />;
};

export default Spinner;
