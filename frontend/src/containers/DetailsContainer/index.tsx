import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

import Breadcrumb, { BreadcrumbNS } from '@/components/molecules/Breadcrumb';
import { useQuery } from '@/hooks/useQuery';
import Spinner from '@/components/atoms/Spinner';
import FormContainer from '@/containers/FormContainer';
import { HTTP_TYPES } from '@/utils/constants';

interface Props<T> {
  breadcrumbLinks: BreadcrumbNS.Link[];
  extraSchema?: React.ReactNode;
  generateInitialValues: (values: T) => Partial<T>;
  onBeforeSubmit: (attributes: T) => Partial<T>;
  onDataLoaded?: (data: T | null) => void;
  path: string;
  schema: z.SomeZodObject;
  uiSchema: FormContainer.UISchema[];
}

function DetailsContainer<T>({
  breadcrumbLinks,
  extraSchema,
  generateInitialValues,
  onBeforeSubmit,
  onDataLoaded,
  path,
  schema,
  uiSchema,
}: Props<T>) {
  const { data, error, loading, retry } = useQuery<T>({
    url: path,
    notFetchOnLoad: true,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [nonce, setNonce] = useState(uuid());

  useEffect(() => {
    retry();
  }, [path]);

  const handleSuccess = async () => {
    toast.success('Operation Success');
    setIsEdit(false);
    await retry();
  };

  useEffect(() => {
    if (onDataLoaded) {
      onDataLoaded(data);
    }
  }, [data]);

  const handleCancel = () => {
    setNonce(uuid());
    setIsEdit(false);
  };

  return (
    <div key={nonce}>
      <div className='font-bold text-2xl text-gray-700 flex justify-between my-[10px]'>
        <Breadcrumb links={breadcrumbLinks} />
        <Button
          className={`bg-blue-500 ${isEdit ? 'invisible' : ''}`}
          onClick={() => setIsEdit(true)}
        >
          Edit
        </Button>
      </div>
      {error ? (
        <div className='bg-red-200 py-1 px-2 rounded-md border-[1px] border-red-500 mt-[10px]'>
          Something went wrong.
          <span className='underline cursor-pointer' onClick={retry}>
            Click Here
          </span>
          <span> to try again</span>
        </div>
      ) : null}
      {loading && (
        <div className='m-auto w-full mt-[100px] text-center'>
          <Spinner size={32} />
        </div>
      )}
      {data && (
        <FormContainer
          readOnly={!isEdit}
          initialValues={generateInitialValues(data)}
          onSuccess={handleSuccess}
          schema={schema}
          uiSchema={uiSchema}
          isEdit={isEdit}
          method={HTTP_TYPES.PUT}
          url={path}
          onBeforeSubmit={onBeforeSubmit}
          onCancel={handleCancel}
        />
      )}
      {!isEdit && extraSchema ? extraSchema : null}
    </div>
  );
}

export default DetailsContainer;
