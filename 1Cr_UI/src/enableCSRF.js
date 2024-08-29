import axios from "axios";

// Function to retrieve CSRF token from the server after successful login
const getCSRFToken = async () => {
  const response = await axios.get(`${process.env.URL}/getCSRFToken`);
  const token = response.data.CSRFToken;
  // console.log("CSRFToken: ", token);
  axios.defaults.headers.common["X-CSRF-Token"] = token;
};

// Axios interceptor to add CSRF token to requests if available
const enableCSRFAxiosInterceptor = () => {
  // console.log("enableCSRFAxiosInterceptor");  

  axios.interceptors.request.use( 
    (config) => {
      // Check if the request method is 'POST' or 'PUT'
      // console.log(config.method);

      if (config.method === "post" || config.method === "put") {
        getCSRFToken();
      }

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};

export default enableCSRFAxiosInterceptor;