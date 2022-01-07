import { ToastContainer } from 'react-toastify';
import { useAxiosInterceptor } from './lib';
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
