import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layouts/layoutcomponents/header';
import Rightside from '../layouts/layoutcomponents/rightside';
import Switcher from '../layouts/layoutcomponents/switcher';
import * as  SwitcherData from '../commondata/switcherdata'
import BacktoTop from '../layouts/layoutcomponents/backtotop';
import { Sidebar } from '../layouts/layoutcomponents/sidebar';

// import { useNavigate } from 'react-router-dom';
// import Footer from './layoutcomponents/footer';
interface AppProps { }

const App: FC<AppProps> = () => {
  // const navigate=useNavigate()
  document.querySelector("body")?.classList.remove('login-img', 'landing-page', 'horizontal');
  document.querySelector("body")?.classList.add('app', 'sidebar-mini', 'ltr', 'light-mode');
  

  return (

    <Fragment>
        <div className='horizontalMenucontainer'  >
          <Switcher />
          <div className="page">
            <div className="page-main">
              <Header />
              <div className="sticky" style={{ paddingTop: "-74px" }}>
                <Sidebar />
              </div>
              <div className="jumps-prevent" style={{ paddingTop: "74px" }}></div>
              <div className="main-content app-content mt-0 " onClick={() => SwitcherData.responsiveSidebarclose()}>
                <div className="side-app">
                  <div className="main-container container-fluid ">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
          <Rightside />
          <BacktoTop />
        </div>
    </Fragment>
  );
}

export default App;
