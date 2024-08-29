import { FC, Fragment } from 'react';
import Footer from '../layouts/layoutcomponents/footer';
// import Header2 from '../layouts/layoutcomponents/header2';
import Rightside from '../layouts/layoutcomponents/rightside';
// import { Sidebar1 } from '../layouts/layoutcomponents/sidebar1';
import * as  SwitcherData from '../commondata/switcherdata';
import { Outlet } from 'react-router-dom';


interface SwitcherappProps { }

const Switcherapp: FC<SwitcherappProps> = () => {
  document.querySelector("body")?.classList.add( 'app', 'sidebar-mini', 'ltr','light-mode');
  return (
  <Fragment>
    <div className='horizontalMenucontainer'>
      <div className="page">
        <div className="page-main">
          {/* <Header2/>
          <Sidebar1 /> */}
          <div className="jumps-prevent" style={{ paddingTop: "74px" }}></div>
          <div className="main-content app-content mt-0" onClick={() => SwitcherData.responsiveSidebarcloseHeader()}>
            <div className="side-app">
              <div className="main-container container-fluid px-0">
              <Outlet/>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
        <Rightside />
    </div>
  </Fragment>
)};
export default Switcherapp;
