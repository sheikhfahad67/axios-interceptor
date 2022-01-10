import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { http } from './axiosInterceptor';

export const useAxiosInterceptor = () => {
  const [data, setData] = useState(undefined);
  const [isPending, setIsPending] = useState(undefined);
  const [error, setError] = useState(null);

  const successHandler = (res, config) => {
    setData(res.data);
    setIsPending(false);
    if (config?.displayToast) {
      toast.success(config?.message || 'Success', {
        position: config?.tostPosition,
        autoClose: config?.delay || 5000,
        hideProgressBar: config?.hideProgressBar,
        closeOnClick: config.closeOnClick,
        pauseOnHover: config?.pauseOnHover,
        draggable: config.draggable,
        progress: undefined,
        rtl: false,
        theme: config.theme,
      });
    }
  };

  const errorHandler = (error, config) => {
    setError(error);
    setIsPending(false);
    if (config?.displayToast) {
      toast.error(config?.message || JSON.stringify(error.messages[0]), {
        position: config?.tostPosition,
        autoClose: config?.delay || 5000,
        hideProgressBar: config?.hideProgressBar,
        closeOnClick: config.closeOnClick,
        pauseOnHover: config?.pauseOnHover,
        draggable: config.draggable,
        progress: undefined,
        rtl: false,
        theme: config.theme,
      });
    }
  };

  const apiHandler = useCallback(async config => {
    return new Promise((resolve, reject) => {
      try {
        setIsPending(true);
        if (config?.method !== 'get' && config?.method !== 'delete') {
          return http[config?.method](config?.url, config?.data)
            .then(res => {
              successHandler(res, config);
              resolve(res.data);
            })
            .catch(error => {
              errorHandler(error, config);
              reject(false);
            });
        } else {
          http[config?.method](config?.url)
            .then(res => {
              successHandler(res, config);
              resolve(res.data);
            })
            .catch(error => {
              errorHandler(error, config);
              reject(false);
            });
        }
      } catch (error) {
        reject(false);
      }
    });
  }, []);

  return { data, error, isPending, apiHandler };
};
