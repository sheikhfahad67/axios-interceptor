import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { http } from './axiosInterceptor';

export const useAxiosInterceptor = () => {
  const [data, setData] = useState(undefined);
  const [isPending, setIsPending] = useState(undefined);
  const [error, setError] = useState(null);

  const pushToast = (method, message, config) => {
    toast[method](message, {
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
  };

  const successHandler = (res, config) => {
    setData(res.data);
    setIsPending(false);
    if (config?.displayToast) {
      pushToast('success', config?.successMessage || res.data.message, config);
    }
  };

  const errorHandler = (error, config) => {
    setError(error);
    setIsPending(false);
    if (config?.displayToast) {
      if (
        error &&
        error.messages &&
        error.messages[0] &&
        error.messages[0].status == 500
      ) {
        pushToast(
          'error',
          'Something went wrong please contact system admin',
          config
        );
      }
      if (
        error &&
        error.messages &&
        error.messages[0].status !== 500 &&
        error.messages[0].data &&
        error.messages[0].data.errors &&
        Object.keys(error.messages[0].data.errors).length > 0
      ) {
        error.messages[0].data.errors.map(err =>
          pushToast('error', err || 'Something went wrong', config)
        );
      }
      if (
        error &&
        error.messages &&
        error.messages[0].status !== 500 &&
        error.messages[0].data &&
        error.messages[0].data.message
      ) {
        pushToast('error', error.messages[0].data.message, config);
      }
    }
  };

  const apiHandler = useCallback(async config => {
    return new Promise((resolve, reject) => {
      try {
        setIsPending(true);
        return http({
          url: config?.url,
          method: config?.method,
          data: config?.data ?? config?.data,
          params: config?.params ?? config?.params,
        })
          .then(res => {
            successHandler(res, config);
            resolve(res.data);
          })
          .catch(error => {
            errorHandler(error, config);
            reject(error);
          });
      } catch (error) {
        reject(false);
      }
    });
  }, []);

  return { data, error, isPending, apiHandler };
};
