import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { http } from './axiosInterceptor';

export const useAxiosInterceptor = () => {
  const [data, setData] = useState(undefined);
  const [isPending, setIsPending] = useState(undefined);
  const [error, setError] = useState(null);

  const successHandler = (res, message, delay) => {
    setData(res.data);
    setIsPending(false);
    toast.success(message || 'Success', {
      position: 'top-right',
      autoClose: delay || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      rtl: false,
      theme: 'colored',
    });
  };

  const errorHandler = (error, message, delay) => {
    setError(error);
    setIsPending(false);
    toast.error(message || JSON.stringify(error.messages[0]), {
      position: 'top-right',
      autoClose: delay || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      rtl: false,
      theme: 'colored',
    });
  };

  const apiHandler = useCallback(async config => {
    return new Promise((resolve, reject) => {
      try {
        setIsPending(true);
        if (config?.method !== 'get' && config?.method !== 'delete') {
          return http[config?.method](config?.url, config?.data)
            .then(res => {
              successHandler(res, config?.successMessage, config?.delay);
              resolve(true);
            })
            .catch(error => {
              errorHandler(error, config?.errorMessage, config?.delay);
              reject(false);
            });
        } else {
          http[config?.method](config?.url)
            .then(res => {
              successHandler(res, config?.successMessage, config?.delay);
              resolve(true);
            })
            .catch(error => {
              errorHandler(error, config?.errorMessage, config?.delay);
              reject(false);
            });
        }
      } catch (error) {
        reject(false);
      }
    });
  }, []);

  return { data, isPending, apiHandler };
};
