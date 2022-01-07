"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = void 0;

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({
        messages: messages
      });
    } else {
      return Promise.reject({
        messages: [messages]
      });
    }
  } else {
    return Promise.reject({
      messages: ['error']
    });
  }
}
/**
 * axios instance
 */


let instance = _axios.default.create({
  baseURL: process.env.REACT_APP_BASE_URL
}); // request header


instance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('authToken');

  if (accessToken) {
    config.headers = {
      Authorization: "Bearer ".concat(accessToken),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  } else {
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  return config;
}, error => {
  return Promise.reject(error);
}); // response parse

instance.interceptors.response.use(response => {
  return response;
}, error => {
  console.warn('Error status', error);

  if (error.response) {
    return parseError(error.response.data);
  } else {
    return Promise.reject(error);
  }
});
const http = instance;
exports.http = http;