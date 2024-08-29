import { useState } from 'react';
import { Form, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import { Imagesdata } from '../../commondata/commonimages';
import axios from 'axios';
import { toast } from 'react-toastify';
 
const   CustomSignIn = () => {
  const [, setError] = useState('');
  // const [loading, ] = useState(false);
 
  const [data, setData] = useState({
    email: '',
    password: 'msl@123',
  });
  const { email, password } = data;
 
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError('');
  };
 
  const navigate = useNavigate();
  const RouteChange = () => {
    const path = `${import.meta.env.BASE_URL}customerdashboard`;
    navigate(path);
  };
 
  const Login1 = async (_e: any) => {
    await axios
      .post(
        `${process.env.URL}/user/login`,
        {
          username: email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        sessionStorage.setItem("id",res.data.user.ID)
        sessionStorage.setItem("role",res.data.user.ROLE_NAME)
        sessionStorage.setItem("mail",res.data.user.MAIL)
        sessionStorage.setItem("role_id",res.data.user.ROLE_ID)
        sessionStorage.setItem("name",res.data.user.FIRSTNAME+" "+res.data.user.LASTNAME)
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        RouteChange();
      })
      .catch((err) => {
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
              
              <div className="login_seprator">
 
              </div>
              <div className='me-7'>
                <Tab.Container id='left-tabs-example' defaultActiveKey='react'>
                  <Tab.Content>
                    <Tab.Pane eventKey='react'>
                      <form className='login100-form validate-form'>
                        <span className='login100-form-title pb-5 mt-5'>Login</span>
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
                       
                        <div className='container-login100-form-btn'>
                          <div
                            onClick={Login1}
                            className='login100-form-btn btn-primary'
                          >
                            Login
                            
                          </div>
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
 
export default  CustomSignIn;