import { Link } from 'react-router-dom';

import TableContainer from '@/containers/TableContainer';
import { useQuery } from '@/hooks/useQuery';
import { BookZ } from '@/models/book';
import { API_ROUTES, ROUTES } from '@/utils/constants';
import NewBookModal from '@/components/molecules/NewBookModal';

function BooksPage() {
  const { data, loading, meta, retry } = useQuery<BookZ[]>({
    url: API_ROUTES.BOOKS.BASE,
  });

  const generateColumn = (): TableContainer.Column<BookZ>[] => {
    return [
      {
        id: 'id',
        label: 'Book Id',
        render: (attributes) => (
          <Link
            to={ROUTES.BOOK_DETAILS.replace(':id', attributes.id)}
            className='text-blue-600 underline'
          >
            {attributes.id}
          </Link>
        ),
      },
      {
        id: 'author',
        label: 'Author',
        render: (attributes) => (
          <Link
            to={ROUTES.AUTHOR_DETAILS.replace(':id', attributes.authorId)}
            className='text-blue-600 underline'
          >
            {`${attributes.author.firstName || ''} ${
              attributes.author.lastName || ''
            }`}
          </Link>
        ),
      },
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'isbn',
        label: 'ISBN',
      },
    ];
  };

  return (
    <>
      <div className='flex justify-end'>
        <NewBookModal onAfterSuccess={retry} />
      </div>
      <TableContainer
        columns={generateColumn()}
        data={data || []}
        meta={meta}
        loading={loading}
      />
    </>
  );
}

export default BooksPage;
