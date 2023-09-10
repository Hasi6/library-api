/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { toast } from 'react-toastify';

import { HTTP_TYPES } from '@/utils/constants';
import http from '@/services/http';
import { exceptionHandler } from '@/utils/execptionHandler';

interface IProps {
  url: string;
}

const useMutation = ({ url }: IProps) => {
  const [loading, setLoading] = useState(false);

  const mutate = async (
    body: object,
    method?: HTTP_TYPES,
    customHeaders?: object,
    requestUrl?: string
  ) => {
    setLoading(true);

    const headers = {
      headers: {
        ...customHeaders,
      },
    };
    try {
      const response = await http[method || HTTP_TYPES.POST](
        requestUrl || url,
        body,
        headers
      );
      setLoading(false);
      return {
        success: true,
        data: response?.data?.data,
        errors: null,
        apiError: null,
      };
    } catch (err: any) {
      setLoading(false);
      if (err.status === 403) {
        toast.error("Don't have permissions");
      }
      return {
        success: false,
        data: null,
        errors: err,
        apiError: exceptionHandler(err?.data?.errors || []),
      };
    }
  };

  return { loading, mutate };
};

export { useMutation };
