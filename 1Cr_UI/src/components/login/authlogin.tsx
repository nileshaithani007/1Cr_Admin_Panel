import { useState } from 'react';
import { Form, InputGroup, Spinner, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Imagesdata } from '../../commondata/commonimages';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { encryptText } from '../../utils/AESencryption';
// import CustomSpinner from '../Common/CustomSpinner';
// import { color } from 'echarts';
// import useAxiosInterceptor from '../../useAxiosInterceptor';
// import enableCSRFAxiosInterceptor from '../../enableCSRF';

const SignIn = () => {
  const navigate = useNavigate();
  const [, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(e.target.name + ': ' + e.target.value);

    setError('');
  };

  const RouteChange = () => {
    const path = `${import.meta.env.BASE_URL}home`;
    navigate(path);
  };

  // const getCSRFToken = async () => {
  //   const response = await axios.get(`${process.env.URL}/getCSRFToken`);
  //   const token = response.data.CSRFToken;
  //   console.log("CSRFToken: ", token);
  //   axios.defaults.headers.common["X-CSRF-Token"] = token;
  // };

  // useEffect(() => {
  //   console.log('get csrf token');
  //   getCSRFToken();
  // }, []);

  const Login1 = async (e: any) => {
    setLoading(true);
    e.preventDefault()

    // const encryptedMail = encryptText(email);
    // const encryptedPass = encryptText(password);
// RouteChange()
console.log(email,password)
    await axios
      .post(
        `${process.env.URL}/login`,
        {
          EmailId: email,
          Password: password
        },
        {
          withCredentials: true,
        }
        // {
        //   withCredentials: true,
        // }
      )
      .then((res) => {
      
        if(res.status === 200){
          setLoading(false);
          console.log(res);
          sessionStorage.setItem("UserId", res.data.data[0].UserId);
          sessionStorage.setItem("OrgId", res.data.data[0].OrgId);
          sessionStorage.setItem("Role", res.data.data[0].Role);
          RouteChange();
        }
        // console.log("login data", res.data);

        // if (res.data.isFirstLogin) {
        //   navigate(`${import.meta.env.BASE_URL}authentication/changepassword/${res.data.token}`)
        // }
        // else {
        //   sessionStorage.setItem("id", res.data.user.ID)
        //   sessionStorage.setItem("role", res.data.user.ROLE_NAME)
        //   sessionStorage.setItem("mail", res.data.user.MAIL)
        //   sessionStorage.setItem("role_id", res.data.user.ROLE_ID)
        //   sessionStorage.setItem("name", res.data.user.FIRSTNAME + " " + res.data.user.LASTNAME)

        //   const token = res.data.token;
        //   localStorage.setItem("token", 'Bearer ' + token);
        //   // console.log('token: ', token)
        //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        //   // enableCSRFAxiosInterceptor();
        //   // useAxiosInterceptor();

        //   toast.success(res.data.message, {
        //     position: "top-center",
        //     autoClose: 1000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //   })
        //   RouteChange();
        // }
      
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error('Invalid Username or Password', {
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
  };

  return (
    <div className='login-img'>
      <div className='page'>

        <div className='container-login100'>

          <div className='wrap-login100  p-6'>
            <div className="d-flex h-100 align-items-center justify-content-between">
              <div>
                <img src={Imagesdata('estee_lauder_logo_xl')} className='p-6 ms-8' height={200} alt="" />
              </div>
              <div className="login_seprator">

              </div>
              <div className='me-7'>
                <Tab.Container id='left-tabs-example' defaultActiveKey='react'>
                  <Tab.Content>
                    <Tab.Pane eventKey='react'>
                      <form className='login100-form validate-form'>
                        <span className='login100-form-title pb-5 mt-5'>Login</span>
                        {/* <input type="hidden" name="_csrf" value="<%= csrfToken %>"></input> */}
                        <div
                          className='wrap-input100 validate-input input-group'
                          data-bs-validate='Valid email is required: ex@abc.xyz'
                        >
                          <Link
                            to='#'
                            className='input-group-text bg-white text-muted'
                          >
                            <i
                              className='zmdi zmdi-email text-muted'
                              aria-hidden='true'
                            ></i>
                          </Link>
                          <Form.Control
                            className='input100 border-start-0 form-control ms-0'
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={changeHandler}
                          />
                        </div>
                        <InputGroup
                          className='wrap-input100 validate-input'
                          id='Password-toggle'
                        >
                          <InputGroup.Text
                            id='basic-addon2'
                            onClick={() => setPasswordShow(!passwordShow)}
                            className='bg-white p-0'
                          >
                            <Link to='#' className='bg-white text-muted p-3'>
                              <i
                                className={`zmdi ${passwordShow ? 'zmdi-eye' : 'zmdi-eye-off'
                                  } text-muted`}
                                aria-hidden='true'
                              ></i>
                            </Link>
                          </InputGroup.Text>
                          <Form.Control
                            className='input100 border-start-0 form-control ms-0'
                            type={passwordShow ? 'text' : 'password'}
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={changeHandler}
                            required
                          />
                        </InputGroup>
                        <div className='container-login100-form-btn'>
                          {
                            (
                              <button
                                onClick={(e) => Login1(e)}
                                className='login100-form-btn btn-primary'
                              >
                                {loading ? <Spinner className="spinner-border spinner-border-sm" style={{color:'#ffffff'}} animation="border" role="status">
                                </Spinner> : 'Login'}
                              </button>
                            )
                          }
                        </div>

                        <div className="mt-2 text-center">
                          Don't have an account? <Link className='text-primary' to="/signup">Sign Up</Link>
                        </div>

                      </form>
                    </Tab.Pane>

                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;