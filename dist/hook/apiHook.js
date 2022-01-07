"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAxiosInterceptor = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.json.stringify.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _reactToastify = require("react-toastify");

var _axiosInterceptor = require("./axiosInterceptor");

const useAxiosInterceptor = () => {
  const [data, setData] = (0, _react.useState)(undefined);
  const [isPending, setIsPending] = (0, _react.useState)(undefined);
  const [error, setError] = (0, _react.useState)(null);

  const successHandler = (res, message, delay) => {
    setData(res.data);
    setIsPending(false);

    _reactToastify.toast.success(message || 'Success', {
      position: 'top-right',
      autoClose: delay || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      rtl: false,
      theme: 'colored'
    });
  };

  const errorHandler = (error, message, delay) => {
    setError(error);
    setIsPending(false);

    _reactToastify.toast.error(message || JSON.stringify(error.messages[0]), {
      position: 'top-right',
      autoClose: delay || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      rtl: false,
      theme: 'colored'
    });
  };

  const apiHandler = (0, _react.useCallback)(async config => {
    return new Promise((resolve, reject) => {
      try {
        setIsPending(true);

        if ((config === null || config === void 0 ? void 0 : config.method) !== 'get' && (config === null || config === void 0 ? void 0 : config.method) !== 'delete') {
          return _axiosInterceptor.http[config === null || config === void 0 ? void 0 : config.method](config === null || config === void 0 ? void 0 : config.url, config === null || config === void 0 ? void 0 : config.data).then(res => {
            successHandler(res, config === null || config === void 0 ? void 0 : config.successMessage, config === null || config === void 0 ? void 0 : config.delay);
            resolve(true);
          }).catch(error => {
            errorHandler(error, config === null || config === void 0 ? void 0 : config.errorMessage, config === null || config === void 0 ? void 0 : config.delay);
            reject(false);
          });
        } else {
          _axiosInterceptor.http[config === null || config === void 0 ? void 0 : config.method](config === null || config === void 0 ? void 0 : config.url).then(res => {
            successHandler(res, config === null || config === void 0 ? void 0 : config.successMessage, config === null || config === void 0 ? void 0 : config.delay);
            resolve(true);
          }).catch(error => {
            errorHandler(error, config === null || config === void 0 ? void 0 : config.errorMessage, config === null || config === void 0 ? void 0 : config.delay);
            reject(false);
          });
        }
      } catch (error) {
        reject(false);
      }
    });
  }, []);
  return {
    data,
    isPending,
    apiHandler
  };
};

exports.useAxiosInterceptor = useAxiosInterceptor;