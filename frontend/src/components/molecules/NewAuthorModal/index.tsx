import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Group } from '@mantine/core';

import FormContainer from '@/containers/FormContainer';
import ModalContainer from '@/components/templates/ModalContainer';
import { API_ROUTES, HTTP_TYPES } from '@/utils/constants';
import ButtonContainer from '@/components/atoms/Button';
import { authorCreateSchema } from '@/models/author';

interface Props {
  onAfterSuccess: () => void;
}

const NewAuthorModal: FC<Props> = ({ onAfterSuccess }) => {
  const [open, setOpen] = useState(false);

  const generateUISchema = (): FormContainer.UISchema[] => {
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

  const handleSuccess = () => {
    toast.success('Author has been created');
    onAfterSuccess();
    setOpen(false);
  };

  return (
    <>
      {open && (
        <ModalContainer onClose={() => setOpen(false)} title='Create Author'>
          <FormContainer
            initialValues={{
              firstName: '',
              lastName: '',
            }}
            method={HTTP_TYPES.POST}
            onSuccess={handleSuccess}
            schema={authorCreateSchema}
            uiSchema={generateUISchema()}
            url={API_ROUTES.AUTHORS.BASE}
          />
        </ModalContainer>
      )}
      <Group position='center'>
        <ButtonContainer onClick={() => setOpen(true)}>
          Create Author
        </ButtonContainer>
      </Group>
    </>
  );
};

export default NewAuthorModal;
