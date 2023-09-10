import { Link } from 'react-router-dom';

import TableContainer from '@/containers/TableContainer';
import { useQuery } from '@/hooks/useQuery';
import { API_ROUTES, ROUTES } from '@/utils/constants';
import { AuthorZ } from '@/models/author';
import NewAuthorModal from '@/components/molecules/NewAuthorModal';

function AuthorsPage() {
  const { data, loading, meta, retry } = useQuery<AuthorZ[]>({
    url: API_ROUTES.AUTHORS.BASE,
  });

  const generateColumn = (): TableContainer.Column<AuthorZ>[] => {
    return [
      {
        id: 'id',
        label: 'Book Id',
        render: (attributes) => (
          <Link
            to={ROUTES.AUTHOR_DETAILS.replace(':id', attributes.id)}
            className='text-blue-600 underline'
          >
            {attributes.id}
          </Link>
        ),
      },
      {
        id: 'firstName',
        label: 'First Name',
      },
      {
        id: 'lastName',
        label: 'Last Name',
      },
    ];
  };

  return (
    <>
      <div className='flex justify-end'>
        <NewAuthorModal onAfterSuccess={retry} />
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

export default AuthorsPage;
