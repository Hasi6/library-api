import { Breadcrumbs } from '@mantine/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export namespace BreadcrumbNS {
  export interface Link {
    title: string;
    to: string;
  }
}

interface Props {
  links: BreadcrumbNS.Link[];
}

const Breadcrumb: FC<Props> = ({ links }) => {
  const items = links.map((item, index) => (
    <Link to={item.to} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
    </>
  );
};

export default Breadcrumb;
