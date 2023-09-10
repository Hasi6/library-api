import { useParams } from 'react-router-dom';

import DetailsContainer from '@/containers/DetailsContainer';
import Spinner from '@/components/atoms/Spinner';
import { API_ROUTES, ROUTES } from '@/utils/constants';
import FormContainer from '@/containers/FormContainer';
import { BookZ, bookCreateSchema } from '@/models/book';
import { AuthorZ } from '@/models/author';
import { useQuery } from '@/hooks/useQuery';

const generateSchema = (authors: AuthorZ[]): FormContainer.UISchema[] => {
  return [
    {
      field: 'input',
      id: 'name',
      helperText: 'Name',
      label: 'Name',
      placeHolder: 'Name',
      type: 'text',
    },
    {
      field: 'input',
      id: 'isbn',
      helperText: 'ISBN',
      label: 'ISBN',
      placeHolder: 'ISBN',
      type: 'text',
    },
    {
      field: 'select',
      id: 'authorId',
      helperText: 'Author',
      label: 'Author',
      placeHolder: 'Author',
      options: (authors || []).map((author) => ({
        label: `${author.firstName || ''} ${author.lastName || ''}`,
        value: author.id,
      })),
    },
  ];
};

const generateInitialValues = (values: BookZ) => {
  return {
    name: values.name,
    isbn: values.isbn,
    authorId: values.authorId,
  };
};

const BooksDetailsPage = () => {
  const { id } = useParams();

  const { data } = useQuery<AuthorZ[]>({
    url: `${API_ROUTES.AUTHORS.BASE}?isAll=true`,
  });

  return (
    <main className='main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in p-4'>
      {!id ? (
        <div className='m-auto w-full mt-[100px] text-center'>
          <Spinner size={32} />
        </div>
      ) : (
        <DetailsContainer<BookZ>
          breadcrumbLinks={[
            {
              title: 'Books',
              to: ROUTES.BOOKS,
            },
            {
              title: 'Book Details',
              to: ROUTES.BOOK_DETAILS.replace(':id', id),
            },
          ]}
          generateInitialValues={generateInitialValues}
          onBeforeSubmit={({ authorId, isbn, name }) => ({
            authorId,
            isbn,
            name,
          })}
          path={`${API_ROUTES.BOOKS.BASE}/${id}`}
          schema={bookCreateSchema}
          uiSchema={generateSchema(data || [])}
        />
      )}
    </main>
  );
};

export default BooksDetailsPage;
