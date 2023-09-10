import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Group } from '@mantine/core';

import FormContainer from '@/containers/FormContainer';
import ModalContainer from '@/components/templates/ModalContainer';
import { API_ROUTES, HTTP_TYPES } from '@/utils/constants';
import ButtonContainer from '@/components/atoms/Button';
import { AuthorZ } from '@/models/author';
import { useQuery } from '@/hooks/useQuery';
import { bookCreateSchema } from '@/models/book';

interface Props {
  onAfterSuccess: () => void;
}

const NewBookModal: FC<Props> = ({ onAfterSuccess }) => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery<AuthorZ[]>({
    url: `${API_ROUTES.AUTHORS.BASE}?isAll=true`,
  });

  const generateUISchema = (): FormContainer.UISchema[] => {
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
        options: (data || []).map((author) => ({
          label: `${author.firstName || ''} ${author.lastName || ''}`,
          value: author.id,
        })),
      },
    ];
  };

  const handleSuccess = () => {
    toast.success('Book has been created');
    onAfterSuccess();
    setOpen(false);
  };

  return (
    <>
      {open && (
        <ModalContainer onClose={() => setOpen(false)} title='Create Book'>
          <FormContainer
            initialValues={{
              isbn: '',
              name: '',
              authorId: '',
            }}
            method={HTTP_TYPES.POST}
            onSuccess={handleSuccess}
            schema={bookCreateSchema}
            uiSchema={generateUISchema()}
            url={API_ROUTES.BOOKS.BASE}
          />
        </ModalContainer>
      )}
      <Group position='center'>
        <ButtonContainer onClick={() => setOpen(true)}>
          Create Book
        </ButtonContainer>
      </Group>
    </>
  );
};

export default NewBookModal;
