import { ToastContainer } from 'react-toastify';
import { useAxiosInterceptor } from './lib';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data, isPending, apiHandler } = useAxiosInterceptor();
  const formData = new FormData();

  const config = {
    method: 'get',
    url: '/todos',
    delay: 4000,
    displayToast: false,
    headers: {
      'Content-Type': 'multipart/form-data',
      // ...formData.getHeaders(),
    },
    // successMessage: 'Todos data retrieve',
    // errorMessage: 'Todos data fetch error',
    // toastPosition: 'top-right',
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // theme: 'colored',
  };

  const getTodosData = async () => {
    const res = await apiHandler(config);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
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
