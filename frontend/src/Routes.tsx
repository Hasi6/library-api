import { Outlet, Routes as ReactRouter, Route } from 'react-router-dom';
import { lazy } from 'react';

import Loadable from '@/components/atoms/Loadable';
import { ROUTES } from './utils/constants';
import AppLayout from './components/templates/AppLayout';

const HomePage = Loadable(lazy(() => import('@/pages/HomePage')));
const BooksPage = Loadable(lazy(() => import('@/pages/BooksPage')));
const BookDetailsPage = Loadable(lazy(() => import('@/pages/BookDetailsPage')));
const AuthorsPage = Loadable(lazy(() => import('@/pages/AuthorsPage')));
const AuthorDetailsPage = Loadable(
  lazy(() => import('@/pages/AuthorDetailsPage'))
);

function Routes() {
  return (
    <ReactRouter>
      <Route
        path='/'
        element={
          <AppLayout>
            <Outlet />
          </AppLayout>
        }
      >
        <Route index element={<HomePage />} />
        <Route path={ROUTES.BOOKS} element={<BooksPage />} />
        <Route path={ROUTES.AUTHROS} element={<AuthorsPage />} />
        <Route path={ROUTES.AUTHOR_DETAILS} element={<AuthorDetailsPage />} />
        <Route path={ROUTES.BOOK_DETAILS} element={<BookDetailsPage />} />
      </Route>
    </ReactRouter>
  );
}

export default Routes;
