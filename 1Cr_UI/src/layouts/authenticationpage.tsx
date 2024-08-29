import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
// import Switcher1 from '../layouts/layoutcomponents/switcher1';

interface AuthenticationPageProps { }

const AuthenticationPage: FC<AuthenticationPageProps> = () => {
  document.body.classList.add('login-img');
  return (
    <Fragment>
      <div className="page">
        {/* <Switcher1 /> */}
        <Outlet />
      </div>
    </Fragment>
  )
};
export default AuthenticationPage;