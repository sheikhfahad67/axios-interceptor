"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAxiosInterceptor = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _reactToastify = require("react-toastify");

var _axiosInterceptor = require("./axiosInterceptor");

const useAxiosInterceptor = () => {
  const [data, setData] = (0, _react.useState)(undefined);
  const [isPending, setIsPending] = (0, _react.useState)(undefined);
  const [error, setError] = (0, _react.useState)(null);

  const pushToast = (method, message, config) => {
    _reactToastify.toast[method](message, {
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

  const successHandler = (res, config) => {
    setData(res.data);
    setIsPending(false);

    if (config !== null && config !== void 0 && config.displayToast) {
      pushToast('success', (config === null || config === void 0 ? void 0 : config.successMessage) || res.data.message, config);
    }
  };

  const errorHandler = (error, config) => {
    setError(error);
    setIsPending(false);

    if (config !== null && config !== void 0 && config.displayToast) {
      if (error && error.messages && error.messages[0] && error.messages[0].status == 500) {
        pushToast('error', 'Something went wrong please contact system admin', config);
      }

      if (error && error.messages && error.messages[0].status !== 500 && error.messages[0].data && error.messages[0].data.errors && Object.keys(error.messages[0].data.errors).length > 0) {
        error.messages[0].data.errors.map(err => pushToast('error', err || 'Something went wrong', config));
      }

      if (error && error.messages && error.messages[0].status !== 500 && error.messages[0].data && error.messages[0].data.message) {
        pushToast('error', error.messages[0].data.message, config);
      }
    }
  };

  const apiHandler = (0, _react.useCallback)(async config => {
    return new Promise((resolve, reject) => {
      try {
        var _config$data, _config$params;

        setIsPending(true);
        return (0, _axiosInterceptor.http)({
          url: config === null || config === void 0 ? void 0 : config.url,
          method: config === null || config === void 0 ? void 0 : config.method,
          data: (_config$data = config === null || config === void 0 ? void 0 : config.data) !== null && _config$data !== void 0 ? _config$data : config === null || config === void 0 ? void 0 : config.data,
          params: (_config$params = config === null || config === void 0 ? void 0 : config.params) !== null && _config$params !== void 0 ? _config$params : config === null || config === void 0 ? void 0 : config.params
        }).then(res => {
          successHandler(res, config);
          resolve(res.data);
        }).catch(error => {
          errorHandler(error, config);
          reject(error);
        });
      } catch (error) {
        reject(false);
      }
    });
  }, []);
  return {
    data,
    error,
    isPending,
    apiHandler
  };
};

exports.useAxiosInterceptor = useAxiosInterceptor;