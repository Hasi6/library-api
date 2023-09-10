import { Button, Checkbox } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import InputContainer from '@/components/molecules/Input';
import { HTTP_TYPES } from '@/utils/constants';
import { useMutation } from '@/hooks/useMutate';
import SelectContainer from '@/components/molecules/Select';
import DateInputContainer from '@/components/molecules/DateInputContainer';

namespace FormContainer {
  export interface UISchema {
    id: string;
    label?: string;
    helperText?: string;
    placeHolder?: string;
    field: 'input' | 'checkbox' | 'select' | 'dateinput';
    type?: 'email' | 'password' | 'text' | 'number';
    options?: SelectOption[];
  }

  export interface SelectOption {
    label: string;
    value: string | boolean;
  }
}

interface Props<T> {
  initialValues: object;
  isEdit?: boolean;
  method?: HTTP_TYPES;
  onBeforeSubmit?: (data: T) => object;
  onCancel?: () => void;
  onSuccess: (response?: object) => void;
  readOnly?: boolean;
  schema: z.SomeZodObject;
  uiSchema: FormContainer.UISchema[];
  url?: string;
}

function FormContainer<T>({
  initialValues,
  isEdit,
  method,
  onBeforeSubmit,
  onCancel,
  onSuccess,
  readOnly,
  schema,
  uiSchema,
  url,
}: Props<T>) {
  const form = useForm({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const { mutate, loading } = useMutation({
    url: url || '',
  });

  const onSubmit = async (data: object) => {
    if (url) {
      let body = data;

      if (onBeforeSubmit) {
        body = onBeforeSubmit(body as T);
      }

      const res = await mutate(body, method);
      if (res.success) {
        onSuccess(res?.data?.data);
        form.reset();
        return;
      } else {
        res.apiError?.formErrors?.forEach((error) => {
          if (error.field) {
            form.setFieldError(error.field, error.message);
          }
        });
      }
    }
  };

  const renderFormComponent = (schema: FormContainer.UISchema) => {
    switch (schema.field) {
      case 'input': {
        return (
          <InputContainer
            form={form}
            id={schema.id}
            key={schema.id}
            label={schema.label}
            readOnly={readOnly}
            type={schema.type}
          />
        );
      }
      case 'checkbox': {
        return (
          <Checkbox
            key={schema.id}
            id={schema.id}
            label={schema.label}
            // @ts-ignore
            checked={initialValues[schema.id] ?? false}
            {...form.getInputProps(schema.id, { type: 'checkbox' })}
            className='mx-[17px]'
          />
        );
      }
      case 'select': {
        return (
          <SelectContainer
            readOnly={readOnly}
            id={schema.id}
            form={form}
            // @ts-ignore
            value={initialValues?.[schema.id] ? 'Active' : 'Inactive'}
            label={schema.label}
            placeHolder={schema.placeHolder}
            data={schema.options || []}
            className='mx-[17px]'
          />
        );
      }
      case 'dateinput': {
        return (
          <DateInputContainer
            readOnly={readOnly}
            id={schema.id}
            form={form}
            // @ts-ignore
            value={initialValues?.[schema.id]}
            label={schema.label}
            placeHolder={schema.placeHolder}
            className='mx-[17px]'
          />
        );
      }
      default: {
        return (
          <InputContainer
            key={schema.id}
            id={schema.id}
            form={form}
            label={schema.label}
            type={schema.type}
          />
        );
      }
    }
  };

  const handleCancel = () => {
    form.resetDirty();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      {uiSchema.map((schema) => (
        <div className='my-[15px]' key={schema.id}>
          {renderFormComponent(schema)}
        </div>
      ))}

      {!readOnly && (
        <>
          {isEdit ? (
            <div className='mt-[10px] flex mx-[17px]'>
              <Button
                className='bg-orange-500 hover:bg-orange-600 mr-[10px]'
                disabled={loading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className='bg-blue-500 hover:bg-blue-600'
                loading={loading}
                type='submit'
                disabled={!form.isDirty()}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              loading={loading}
              type='submit'
              disabled={!form.isValid()}
              className='bg-blue-500 text-black w-full mt-[20px]'
            >
              Submit
            </Button>
          )}
        </>
      )}
    </form>
  );
}

export default FormContainer;
