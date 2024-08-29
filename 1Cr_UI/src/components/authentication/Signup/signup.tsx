import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {  Form, InputGroup } from 'react-bootstrap';
import { Imagesdata } from "../../../commondata/commonimages";
import axios from 'axios';
const SignUp = () => {
  // const [err, setError] = useState("");
  // const [Loader, setLoader] = useState(false);
  const [passwordshow, setpasswordshow] = useState(false);
  const [ConfirmPasswordShow, SetConfirmPasswordShow] = useState(false);
  const [ConfirmPassword, SetConfirmPassword] = useState('');
  const [data, setData] = React.useState({
    FirstName: "",
    LastName: "",
    EmailId: "",
    MobileNumber: "",
    Password: "",
    OrgName: ""
  });
  const { FirstName, LastName, EmailId, MobileNumber, Password, OrgName } = data;

  const navigate = useNavigate();
  const RouteChange = () => {
    const path = `${import.meta.env.BASE_URL}home`;
    navigate(path);
  };

  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const confirmPasswordChangeHandler = (e: any) => {
    SetConfirmPassword(e.target.value);
  }

  const Signup = (e: any) => {
    e.preventDefault();

    axios.post(`${process.env.URL}/signup`,data).then((res) => {

      if (res.status == 200) {
        console.log(res);

        toast.success('Registered Successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })

        // sessionStorage.setItem('UserId');
        RouteChange();
      }
    }).catch((err) => {
      console.error(err);
      toast.error('Failed to register. Please try again later', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    });
  }


  return (
    <>
      <div className='login-img'>
        <div className="page">
          <div className="col-login mx-auto mt-7">
            <div className="text-center">
              <img src={Imagesdata('')} className="header-brand-img m-0" alt="" />
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-6">
              <form className="login100-form validate-form">
                <span className="login100-form-title">
                  Registration
                </span>
        


                <div className="d-flex gap-2">
                  <div className="wrap-input100 validate-input input-group">
                    <Link to="#" className="input-group-text bg-white text-muted">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </Link>
                    <Form.Control
                      className="input100 border-start-0 ms-0 form-control flex-grow-1"
                      type="text"
                      name="FirstName"
                      placeholder="First Name"
                      value={FirstName}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="wrap-input100 validate-input input-group">
                    <Link to="#" className="input-group-text bg-white text-muted">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </Link>
                    <Form.Control
                      className="input100 border-start-0 ms-0 form-control flex-grow-1"
                      type="text"
                      name="LastName"
                      placeholder="Last Name"
                      value={LastName}
                      onChange={changeHandler}
                    />
                  </div>

                </div>

                <div className="wrap-input100 validate-input input-group">
                  <Link to="#" className="input-group-text bg-white text-muted">
                    <i className="zmdi zmdi-email" aria-hidden="true"></i>
                  </Link>
                  <Form.Control
                    className="input100 border-start-0 ms-0 form-control"
                    type="email"
                    name="EmailId"
                    placeholder="Email Id"
                    value={EmailId}
                    onChange={changeHandler} />
                </div>

                <div className="wrap-input100 validate-input input-group">
                  <Link to="#" className="input-group-text bg-white text-muted">
                    <i className="zmdi zmdi-email" aria-hidden="true"></i>
                  </Link>
                  <Form.Control
                    className="input100 border-start-0 ms-0 form-control"
                    type="tel"
                    name="MobileNumber"
                    placeholder="Mobile Number"
                    value={MobileNumber}
                    onChange={changeHandler} />
                </div>

                <InputGroup className="wrap-input100 validate-input" id="Password-toggle">
                  <InputGroup.Text id="basic-addon2" className="bg-white p-0" onClick={() => setpasswordshow(!passwordshow)}>
                    <Link to='#' className='bg-white text-muted p-3'><i className={`zmdi ${passwordshow ? 'zmdi-eye' : 'zmdi-eye-off'} text-muted`}></i></Link>
                  </InputGroup.Text>
                  <Form.Control
                    className="input100 border-start-0 ms-0"
                    type={(passwordshow) ? 'text' : "Password"}
                    name="Password"
                    placeholder="Password"
                    value={Password}
                    onChange={changeHandler} required />{" "}
                </InputGroup>
                <InputGroup className="wrap-input100 validate-input" id="Password-toggle">
                  <InputGroup.Text id="basic-addon2" className="bg-white p-0" onClick={() => SetConfirmPasswordShow(!ConfirmPasswordShow)}>
                    <Link to='#' className='bg-white text-muted p-3'><i className={`zmdi ${passwordshow ? 'zmdi-eye' : 'zmdi-eye-off'} text-muted`}></i></Link>
                  </InputGroup.Text>

                  <Form.Control
                    className="input100 border-start-0 ms-0"
                    type={(ConfirmPasswordShow) ? 'text' : "password"}
                    name="cnfpassword"
                    placeholder="Confirm Password"
                    value={ConfirmPassword}
                    onChange={confirmPasswordChangeHandler} required />{" "}
                </InputGroup>

                <div className="wrap-input100 validate-input input-group">

                  <Link to="#" className="input-group-text bg-white text-muted">
                    <i className="mdi mdi-account" aria-hidden="true"></i>
                  </Link>
                  <Form.Control
                    className="input100 border-start-0 ms-0 form-control"
                    type="text"
                    name="OrgName"
                    placeholder="Organization Name"
                    value={OrgName}
                    onChange={changeHandler} />
                </div>
                <label className="custom-control custom-checkbox mt-4">
                  <input type="checkbox" className="custom-control-input" />
                  <span className="custom-control-label">I accept all the<Link to={`${import.meta.env.BASE_URL}pages/extension/term/`}> Terms & Conditions </Link> and <Link to={`${import.meta.env.BASE_URL}`}> Privacy Policy</Link></span>
                </label>
                <div className="container-login100-form-btn">
                  <Link to='#' onClick={Signup} className="login100-form-btn btn-primary"> Register

                    {/* {Loader ? <span role="status" aria-hidden="true" className="spinner-border spinner-border-sm ms-2"></span> : ""} */}
                  </Link>
                </div>
                <div className="text-center pt-3">
                  <p className="text-dark mb-0">Already have account?<Link to={`${import.meta.env.BASE_URL}Authentication/firebaseAuth/login/`} className="text-primary ms-1">Sign In</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// SignUp.propTypes = {};

// SignUp.defaultProps = {};

export default SignUp;
