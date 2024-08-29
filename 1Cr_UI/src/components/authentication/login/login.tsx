import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Tabs, Form, Tab, InputGroup } from 'react-bootstrap';
import { Imagesdata } from '../../../commondata/commonimages';

interface LoginProps {}
const Log = () => {
  const Rightside: any = document.querySelector('.mobile-num');
  Rightside.style.display = 'none';
  const Rightsides: any = document.querySelector('.login-otp');
  Rightsides.style.display = 'flex';
};
const Login: FC<LoginProps> = () => {
  const [passwordshow, setpasswordshow] = useState(false);
  document.querySelector('.app')?.classList.remove('layout-boxed');

  const SwitcherIcons = () => {
    //leftsidemenu
    document.querySelector('.demo_changer')?.classList.add('active');
    const Rightside: any = document.querySelector('.demo_changer');
    Rightside.style.insetInlineEnd = '0px';
  };

  const RemoveSwitcherIcon: any = () => {
    //leftsidemenu
    document.querySelector('.demo_changer')?.classList.remove('active');
    const Rightside: any = document.querySelector('.demo_changer');
    Rightside.style.insetInlineEnd = '-270px';
  };
  return (
    <div>
      <Col className='col-login mx-auto'>
        <div className='text-center'>
          <Link to={`${import.meta.env.BASE_URL}dashboard/`}>
            <img
              src={Imagesdata('logowhite')}
              className='header-brand-img'
              alt=''
            />
          </Link>
        </div>
      </Col>
      <div className='container-login100' onClick={() => RemoveSwitcherIcon()}>
        <div className='wrap-login100 p-6'>
          <form className='login100-form validate-form'>
            <span className='login100-form-title pb-5 login-inputs'>
              {' '}
              Login
            </span>
            <div className='panel panel-primary'>
              <div className='tab-menu-heading border-0'>
                <div className='tabs-menu1'>
                  <Tabs
                    defaultActiveKey='Email'
                    id='uncontrolled-tab-example'
                    className='tab-content'
                  >
                    <Tab eventKey='Email' title='Email' className='p-0 pt-5'>
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
                        <input
                          className='input100 border-start-0 form-control ms-0'
                          type='email'
                          placeholder='Email'
                        />
                      </div>
                      <InputGroup
                        className='wrap-input100 validate-input'
                        id='Password-toggle'
                      >
                        <InputGroup.Text
                          id='basic-addon2'
                          onClick={() => setpasswordshow(!passwordshow)}
                          className='bg-white p-0'
                        >
                          <Link to='#' className='bg-white text-muted p-3'>
                            <i
                              className={`zmdi ${
                                passwordshow ? 'zmdi-eye' : 'zmdi-eye-off'
                              } text-muted`}
                              aria-hidden='true'
                            ></i>
                          </Link>
                        </InputGroup.Text>
                        <Form.Control
                          className='input100 border-start-0 ms-0'
                          type={passwordshow ? 'text' : 'password'}
                          placeholder='Password'
                        />
                      </InputGroup>
                      <div className='text-end pt-4'>
                        <p className='mb-0 fs-13'>
                          <Link
                            to={`${
                              import.meta.env.BASE_URL
                            }authentication/forgotpassword/`}
                            className='text-primary ms-1'
                          >
                            Forgot Password?
                          </Link>
                        </p>
                      </div>
                      <div className='container-login100-form-btn'>
                        <Link
                          to={`${import.meta.env.BASE_URL}dashboard/`}
                          className='login100-form-btn btn-primary'
                        >
                          Login
                        </Link>
                      </div>
                      <div className='text-center pt-3'>
                        <p className='text-dark mb-0 fs-13'>
                          Not a member?
                          <Link
                            to={`${
                              import.meta.env.BASE_URL
                            }authentication/register/`}
                            className='text-primary ms-1  d-inline-block'
                          >
                            Sign UP
                          </Link>
                        </p>
                      </div>
                      <label className='login-social-icon'>
                        <span>Login with Social</span>
                      </label>
                      <div className='d-flex justify-content-center'>
                        <Link to='#'>
                          <div className='social-login me-2 text-center'>
                            <i className='fa fa-google'></i>
                          </div>
                        </Link>
                        <Link to='#'>
                          <div className='social-login me-2 text-center'>
                            <i className='fa fa-facebook'></i>
                          </div>
                        </Link>
                        <Link to='#'>
                          <div className='social-login me-2 text-center mb-5'>
                            <i className='fa fa-twitter'></i>
                          </div>
                        </Link>
                      </div>
                    </Tab>
                    <Tab eventKey='Mobile' title='Mobile' className=''>
                      <div className='tab-pane pt-5' id='tab6'>
                        <div
                          id='mobile-num'
                          className='wrap-input100 mobile-num validate-input input-group mb-4'
                        >
                          <Link
                            to='#'
                            className='input-group-text bg-white text-muted'
                          >
                            <span>+91</span>
                          </Link>
                          <Form.Control
                            className='input100 border-start-0 ms-0'
                            type='number'
                          />
                        </div>
                        <div
                          id='login-otp'
                          className='justify-content-around login-otp mt-5 mb-5'
                        >
                          <Form.Control
                            className='text-center w-15'
                            id='txt1'
                            maxLength={1}
                          />
                          <Form.Control
                            className='text-center w-15'
                            id='txt2'
                            maxLength={1}
                          />
                          <Form.Control
                            className='text-center w-15'
                            id='txt3'
                            maxLength={1}
                          />
                          <Form.Control
                            className='text-center w-15'
                            id='txt4'
                            maxLength={1}
                          />
                        </div>
                        <small>
                          Note : Login with registered mobile number to generate
                          OTP.
                        </small>
                        <div className='container-login100-form-btn '>
                          <Link
                            to='#'
                            className='login100-form-btn btn-primary'
                            id='generate-otp'
                            onClick={() => Log()}
                          >
                            Proceed
                          </Link>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className='dropdown float-end custom-layout'
        onClick={() => SwitcherIcons()}
      >
        <div className='demo-icon nav-link icon mt-4'>
          <i className='fe fe-settings fa-spin text_primary'></i>
        </div>
      </div>
    </div>
  );
};
export default Login;
