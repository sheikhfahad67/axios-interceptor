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

  const successHandler = (res, config) => {
    setData(res.data);
    setIsPending(false);

    _reactToastify.toast.success((config === null || config === void 0 ? void 0 : config.message) || 'Success', {
      position: config === null || config === void 0 ? void 0 : config.tostPosition,
      autoClose: (config === null || config === void 0 ? void 0 : config.delay) || 5000,
      hideProgressBar: config === null || config === void 0 ? void 0 : config.hideProgressBar,
      closeOnClick: config.closeOnClick,
      pauseOnHover: config === null || config === void 0 ? void 0 : config.pauseOnHover,
      draggable: config.draggable,
      progress: undefined,
      rtl: false,
      theme: config.theme
    });
  };

  const errorHandler = (error, config) => {
    setError(error);
    setIsPending(false);

    _reactToastify.toast.error((config === null || config === void 0 ? void 0 : config.message) || JSON.stringify(error.messages[0]), {
      position: config === null || config === void 0 ? void 0 : config.tostPosition,
      autoClose: (config === null || config === void 0 ? void 0 : config.delay) || 5000,
      hideProgressBar: config === null || config === void 0 ? void 0 : config.hideProgressBar,
      closeOnClick: config.closeOnClick,
      pauseOnHover: config === null || config === void 0 ? void 0 : config.pauseOnHover,
      draggable: config.draggable,
      progress: undefined,
      rtl: false,
      theme: config.theme
    });
  };

  const apiHandler = (0, _react.useCallback)(async config => {
    return new Promise((resolve, reject) => {
      try {
        setIsPending(true);

        if ((config === null || config === void 0 ? void 0 : config.method) !== 'get' && (config === null || config === void 0 ? void 0 : config.method) !== 'delete') {
          return _axiosInterceptor.http[config === null || config === void 0 ? void 0 : config.method](config === null || config === void 0 ? void 0 : config.url, config === null || config === void 0 ? void 0 : config.data).then(res => {
            successHandler(res, config);
            resolve(true);
          }).catch(error => {
            errorHandler(error, config);
            reject(false);
          });
        } else {
          _axiosInterceptor.http[config === null || config === void 0 ? void 0 : config.method](config === null || config === void 0 ? void 0 : config.url).then(res => {
            successHandler(res, config);
            resolve(true);
          }).catch(error => {
            errorHandler(error, config);
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