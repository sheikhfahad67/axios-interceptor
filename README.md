# axios-interceptor-hooks
![npm](https://img.shields.io/badge/axios%20interceptor-axios-green)

React hooks for [axios] with built in react-tostify integration. Simple to use with minimum configuration.

![axios-interceptor-hook](https://raw.githubusercontent.com/sheikhfahad67/axios-interceptor/master/.github/images/axios-interceptor-hook.gif "axios-interceptor-hook")

## Features

- All the [axios] awesomeness you are familiar with
- Zero configuration, but configurable if needed
- Integrated react-toastify for better toast messages
- Minimize file managment

## Installation

`npm install axios react-toastify axios-interceptor-hook`

> `axios` and `react-toastify` are peer dependencies and needs to be installed explicitly

## Example

```js
import { ToastContainer } from 'react-toastify';
import { useAxiosInterceptor } from 'axios-interceptor-hook';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data, isPending, apiHandler } = useAxiosInterceptor();
  const config = {
    method: 'get',
    url: '/todos',
    delay: 4000,
    successMessage: 'Todos data retrieve',
    errorMessage: 'Todos data fetch error',
    toastPosition: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  };
  const getTodosData = async () => {
    await apiHandler(config);
  };

  useEffect(() => {
    getTodosData();
  }, []);

  return (
    <div>
      <ToastContainer />
      {isPending && <p>Loading.......</p>}
      {data &&
        Object.keys(data).length > 0 &&
        data?.map((todo, index) => (
          <h6 key={index + 'testing'}>{todo.title}</h6>
        ))}
    </div>
  );
}

export default App;
```

## Documentation

### Return

It will return following fields:

| Fields     |  Type  |                                                                                   Description |
| ---------- | :----: | --------------------------------------------------------------------------------------------: |
| data       | Object |                                                    It return the response of api `(res.data)` |
| isPending  |  Bool  | For loading purpose return `true` while fetching and return false after completion or failure |
| apiHandler |  Func  |              Function to give you control over calling when you need just by passing `config` |

### For Bearer Token

Need to save your auth token as, interceptor will automatically get it.

> localStorage.setItem('authToken', `<YOUR TOKEN>`);

### Environment Variable for Base URL

Please add env variable into your `.env` or `.env.local` file.

> REACT_APP_BASE_URL="https://jsonplaceholder.typicode.com"

### Config Props

| Fields          |  Type  |                                                                           Description |
| --------------- | :----: | ------------------------------------------------------------------------------------: |
| method          | string |                                               'get', 'post', 'put', 'delete', 'patch' |
| url             | string |                                                              it will be your endpoint |
| delay           | number |                                                                          default 5000 |
| data            | Object |                                                 required on post, put, patch requests |
| successMessage  | string |                                                                         'Any Message' |
| errorMessage    | string |                                                                         'Any Message' |
| position        | string | 'top-right', 'top-left', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center' |
| hideProgressBar |  Bool  |                                                                     `true` or `false` |
| closeOnClick    |  Bool  |                                                                     `true` or `false` |
| pauseOnHover    |  Bool  |                                                                     `true` or `false` |
| draggable       |  Bool  |                                                                     `true` or `false` |
| theme           | string |                                                              'light','dark','colored' |

## License

MIT

[axios]: https://github.com/axios/axios
