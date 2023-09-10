import { useParams } from 'react-router-dom';

import DetailsContainer from '@/containers/DetailsContainer';
import Spinner from '@/components/atoms/Spinner';
import { API_ROUTES, ROUTES } from '@/utils/constants';
import FormContainer from '@/containers/FormContainer';
import { AuthorZ, authorCreateSchema } from '@/models/author';

const generateSchema = (): FormContainer.UISchema[] => {
  return [
    {
      field: 'input',
      id: 'firstName',
      helperText: 'First Name',
      label: 'First Name',
      placeHolder: 'First Name',
      type: 'text',
    },
    {
      field: 'input',
      id: 'lastName',
      helperText: 'Last Name',
      label: 'Last Name',
      placeHolder: 'Last Name',
      type: 'text',
    },
  ];
};

const generateInitialValues = (values: AuthorZ) => {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
  };
};

const AuthorDetailsPage = () => {
  const { id } = useParams();

  return (
    <main className='main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in p-4'>
      {!id ? (
        <div className='m-auto w-full mt-[100px] text-center'>
          <Spinner size={32} />
        </div>
      ) : (
        <DetailsContainer<AuthorZ>
          breadcrumbLinks={[
            {
              title: 'Authors',
              to: ROUTES.AUTHROS,
            },
            {
              title: 'Author Details',
              to: ROUTES.AUTHOR_DETAILS.replace(':id', id),
            },
          ]}
          generateInitialValues={generateInitialValues}
          onBeforeSubmit={({ firstName, lastName }) => ({
            firstName,
            lastName,
          })}
          path={`${API_ROUTES.AUTHORS.BASE}/${id}`}
          schema={authorCreateSchema}
          uiSchema={generateSchema()}
        />
      )}
    </main>
  );
};

export default AuthorDetailsPage;
