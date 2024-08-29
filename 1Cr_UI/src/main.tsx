import React, { Fragment, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./layouts/layoutcomponents/loader";
import "./index.scss";
// const Auth = lazy(
//   () => import("./components/authentication/firebaseauth/auth")
// );
const App = lazy(() => import("./layouts/app"));
// const HomeScreen = lazy(
//   () => import("./components/home")
// );
// const AuthLogin = lazy(
//   () => import("./components/login/authlogin")
// );
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import Dashboard from "./components/Dashboard/Dashboard";
// import SignUp from "./components/authentication/Signup/signup";



const container: HTMLElement | any = document.getElementById("root");
const root = createRoot(container);

const helmetContext = {};

// Retrieve the token from localStorage, if it exists
// const token = localStorage.getItem("token");

// If the token exists, set it as the default Authorization header for Axios
// if (token) {
//   axios.defaults.headers.common["Authorization"] = token;
// }
const token = localStorage.getItem("token");

// If the token exists, set it as the default Authorization header for Axios
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}
root.render(
  <Fragment>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <ToastContainer
          style={{ zIndex: "11000" }}
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <React.Suspense fallback={<Loader />}>
          <Routes>
            {/* <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
              <Route index element={<AuthLogin />} />
            </Route> */}
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route
                path={`${import.meta.env.BASE_URL}`}
                element={<Dashboard />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}dashboard`}
                element={<Dashboard />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}testimonials`}
                element={<Dashboard />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}master/blog`}
                element={<Dashboard />}
              />
             
             
            
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </Fragment>
);
