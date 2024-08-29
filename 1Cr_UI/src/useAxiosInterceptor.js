import axios from 'axios';

const useAxiosInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      response
    }, // Pass through successful responses unchanged
    (error) => {
      console.error(error.response);
      if (error.response && error.response.status === 403) {
        // Token is invalid (HTTP status code 403 Forbidden)
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptor;
