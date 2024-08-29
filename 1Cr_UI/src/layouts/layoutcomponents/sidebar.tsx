import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Imagesdata } from '../../commondata/commonimages';

// import axios from 'axios';


const Onhover = () => {
  if (document.querySelector(".app")?.classList.contains("sidenav-toggled"))
    document.querySelector(".app")?.classList.add("sidenav-toggled-open");

}
const Outhover = () => {
  document.querySelector(".app")?.classList.remove("sidenav-toggled-open");
}
// let history: any = [];

export const Sidebar = () => {

  // const navigate = useNavigate();
  // const RouteChange = () => {
  //   const path = `${import.meta.env.BASE_URL}home`;
  //   navigate(path);
  // };


  // let location = useLocation();
  // const [menuitems, setMenuitems] = useState(MENUITEMS);
  // useEffect(() => {

  //   history.push(location.pathname);  // add  history to history  stack for current location.pathname to prevent multiple history calls innerWidth  and innerWidth calls from  multiple users. This is important because the history stack is not always empty when the user clicks  the history       
  //   if (history.length > 2) {
  //     history.shift();
  //   }
  //   if (history[0] !== history[1]) {
  //     setSidemenu();
  //   }
  //   let mainContent: any = document.querySelector('.main-content');

  //   //when we click on the body to remove


  //   //eslint
  //   mainContent.addEventListener('click', mainContentClickFn);
  //   return () => {
  //     mainContent.removeEventListener('click', mainContentClickFn);
  //   }

  // }, [location])// eslint-disable-line react-hooks/exhaustive-deps

  // // location
  // useEffect(() => {

  //   if (document.body.classList.contains('horizontal') && window.innerWidth >= 992) {
  //     clearMenuActive();
  //   }
  // }, []);

  // //  In Horizontal When we click the body it should we Closed using in useEfffect Refer line No:16
  // //eslint
  // function mainContentClickFn() {
  //   if (document.body.classList.contains('horizontal') && window.innerWidth >= 992) {
  //     clearMenuActive();
  //   }
  // }


  // function clearMenuActive() {
  //   MENUITEMS.map((mainlevel: any) => {
  //     if (mainlevel.Items) {
  //       mainlevel.Items.map((sublevel: any) => {
  //         sublevel.active = false;
  //         if (sublevel.children) {
  //           sublevel.children.map((sublevel1: any) => {
  //             sublevel1.active = false;
  //             if (sublevel1.children) {
  //               sublevel1.children.map((sublevel2: any) => {
  //                 sublevel2.active = false;
  //                 return sublevel2;
  //               })
  //             }
  //             return sublevel1;
  //           })
  //         }
  //         return sublevel;
  //       })
  //     }
  //     return mainlevel;

  //   })

  //   setMenuitems(arr => [...arr]);
  // }

  // function setSidemenu() {

  //   if (menuitems) {
  //     menuitems.map((mainlevel: any) => {
  //       if (mainlevel.Items) {
  //         mainlevel.Items.map((items: any) => {
  //           items.active = false;
  //           items.selected = false;
  //           if (
  //             location.pathname === "/sash/preview/" ||
  //             location.pathname === "/sash/preview") {
  //             location.pathname = "/sash/preview/Dashboard/";
  //           }

  //           if (location.pathname === items.path + '/') {
  //             items.active = true;
  //             items.selected = true;
  //           }
  //           if (items.children) {
  //             items.children.map((submenu: any) => {
  //               submenu.active = false;
  //               submenu.selected = false;
  //               if (location.pathname === submenu.path + '/') {
  //                 items.active = true;
  //                 items.selected = true;
  //                 submenu.active = true;
  //                 submenu.selected = true;
  //               }
  //               if (submenu.children) {
  //                 submenu.children.map((submenu1: any) => {
  //                   submenu1.active = false;
  //                   submenu1.selected = false;
  //                   if (location.pathname === submenu1.path + '/') {
  //                     items.active = true;
  //                     items.selected = true;
  //                     submenu.active = true;
  //                     submenu.selected = true;
  //                     submenu1.active = true;
  //                     submenu1.selected = true;
  //                   }
  //                   return submenu1;
  //                 })
  //               }
  //               return submenu;
  //             })
  //           }
  //           return items;
  //         })
  //       }
  //       setMenuitems(arr => [...arr]);
  //       return mainlevel;
  //     })
  //   }
  // }

  // function toggleSidemenu(item: any) {

  //   // To show/hide the menu
  //   if (!item.active) {
  //     submenuItems.map((mainlevel: any) => {
  //       if (mainlevel.Items) {
  //         mainlevel.Items.map((sublevel: any) => {
  //           sublevel.active = false;
  //           if (item === sublevel) {
  //             sublevel.active = true;
  //           }
  //           if (sublevel.children) {
  //             sublevel.children.map((sublevel1: any) => {
  //               sublevel1.active = false;
  //               if (item === sublevel1) {
  //                 sublevel.active = true;
  //                 sublevel1.active = true;
  //               }
  //               if (sublevel1.children) {
  //                 sublevel1.children.map((sublevel2: any) => {
  //                   sublevel2.active = false;
  //                   if (item === sublevel2) {
  //                     sublevel.active = true;
  //                     sublevel1.active = true;
  //                     sublevel2.active = true;
  //                   }
  //                   return sublevel2;
  //                 });
  //               }
  //               return sublevel1;
  //             });
  //           }
  //           return sublevel;
  //         });
  //       }
  //       return mainlevel;
  //     });
  //   } else {
  //     item.active = !item.active;
  //   }


  //   setsubMenuitems((arr) => [...arr]);
  // }
  const [submenuItems] = useState([
    {
        "SubDisplayName": "Testimonials",
        "subTabs": [
            {
                "type": "link",
                "Icon": "fe fe-cpu",
                "pagename": "Testimonials",
                "PageRoute": "/testimonials",
                "selected": false
            }
        ]
    },
    {
      "SubDisplayName": "Blogs",
      "subTabs": [
          {
              "type": "link",
              "Icon": "fe fe-cpu",
              "pagename": "Blogs",
              "PageRoute": "/master/blog",
              "selected": false
          }
      ]
  },
//     {
//         "SubDisplayName": "Process Repository",
//         "subTabs": [
//             {
//                 "type": "link",
//                 "Icon": "fe fe-cpu",
//                 "pagename": "Process Repository",
//                 "PageRoute": "/process/repository",
//                 "selected": false
//             }
//         ]
//     },
//     {
//       "SubDisplayName": "Automation Tracker",
//       "subTabs": [
//           {
//               "type": "link",
//               "Icon": "fe fe-cpu",
//               "pagename": "Automation Tracker",
//               "PageRoute": "/automation/tracker",
//               "selected": false
//           }
//       ]
//   },
//     {
//         "SubDisplayName": "Tracking Master",
//         "subTabs": [
//             {
//                 "type": "link",
//                 "Icon": "fe fe-cpu",
//                 "pagename": "Tracking Master",
//                 "PageRoute": "master/tracking",
//                 "selected": false
//             }
//         ]
//     },
//   {
//     "SubDisplayName": "Applications",
//     "subTabs": [
//         {
//             "type": "link",
//             "Icon": "fe fe-cpu",
//             "pagename": "Application Master",
//             "PageRoute": "master/application",
//             "selected": false
//         }
//     ]
// },
// {
//   "SubDisplayName": "Functions",
//   "subTabs": [
//       {
//           "type": "link",
//           "Icon": "fe fe-cpu",
//           "pagename": "Function Master",
//           "PageRoute": "master/function",
//           "selected": false
//       }
//   ]
// },
// {
//   "SubDisplayName": "Stages",
//   "subTabs": [
//       {
//           "type": "link",
//           "Icon": "fe fe-cpu",
//           "pagename": "Stage",
//           "PageRoute": "master/stage",
//           "selected": false
//       }
//   ]
// },
// {
//   "SubDisplayName": "Technologies",
//   "subTabs": [
//       {
//           "type": "link",
//           "Icon": "fe fe-cpu",
//           "pagename": "Technology",
//           "PageRoute": "master/technology",
//           "selected": false
//       }
//   ]
// },
// {
//   "SubDisplayName": "Transformation Levers",
//   "subTabs": [
//       {
//           "type": "link",
//           "Icon": "fe fe-cpu",
//           "pagename": "Transformation Levers",
//           "PageRoute": "master/transformation/levers",
//           "selected": false
//       }
//   ]
// },
    // {
    //     "SubDisplayName": "Automation Maintainence",
    //     "subTabs": [
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "OS Digital Service Requests",
    //             "PageRoute": "ticketRaise",
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Change Request",
    //             "PageRoute": "changeRequest",
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Issue Log",
    //             "PageRoute": "issueLog",
    //             "selected": false
    //         }
    //     ]
    // },
    // {
    //     "SubDisplayName": "Admin",
    //     "subTabs": [
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Technology",
    //             "PageRoute": "/technology",
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Function",
    //             "PageRoute": "/function",
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Users",
    //             "PageRoute": `${import.meta.env.BASE_URL}User`,
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Teams",
    //             "PageRoute": `${import.meta.env.BASE_URL}createTeamMaster`,
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Roles",
    //             "PageRoute": `${import.meta.env.BASE_URL}createRole`,
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Projects",
    //             "PageRoute":`${import.meta.env.BASE_URL}createProject`,
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Process",
    //             "PageRoute": `${import.meta.env.BASE_URL}createProcess`,
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Vendor",
    //             "PageRoute": "vendor",
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "Contract",
    //             "PageRoute": "contract",
    //             "selected": false
    //         }
    //     ]
    // },
    // {
    //     "SubDisplayName": "Settings",
    //     "subTabs": [
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "UserManagement",
    //             "PageRoute": "/user-management",
    //             "selected": false
    //         },
    //         {
    //             "type": "link",
    //             "Icon": "fe fe-cpu",
    //             "pagename": "RoleManagement",
    //             "PageRoute": "/role-management",
    //             "selected": false
    //         }
    //     ]
    // }
]);
  useEffect(() => {
    // const roleGroup_id = sessionStorage.getItem('id')
    // console.log("roleGroup_id: ", roleGroup_id);
    
    // axios
    //   .get(`${process.env.URL}/getDynamicMenu/${roleGroup_id}`)
    //   .then((res) => {
    //     // console.log("sub menu", res.data);
    //     setsubMenuitems(res.data);
    //     // setLoading(false);
    //     console.log("formatted data",formattedData)
    //   });
  }, []);

  const formattedData = submenuItems.map((tab:any) => {
    if (tab.subTabs.length === 1) {
      // If there's only one sub-tab, treat it as the main tab
      return {
        MainDisplayName: tab.SubDisplayName,
        // Extracting sub-tab data here
        // Assuming sub-tab data has specific properties, adjust this accordingly
        ...tab.subTabs[0]
      };
    } else {
      // If there are multiple sub-tabs, keep the structure as is
      return {
        MainDisplayName: tab.SubDisplayName,
        subTabs: tab.subTabs
      };
    }
  });

  const [expandedMenus, setExpandedMenus]:any = useState({});

  const toggleSidemenu = (mainmenu: any) => {
    setExpandedMenus((prev:any) => ({
      ...prev,
      [mainmenu.MainDisplayName]: !prev[mainmenu.MainDisplayName],
    }));
  };

  return (
    <Fragment>
      <div className="app-sidebar" onMouseOver={() => Onhover()}
        onMouseOut={() => Outhover()}>
        <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }}>
          <div className="side-header">
            <Link className="header-brand1" to={`${import.meta.env.BASE_URL}master/blog`}>
              {/* <img src={Imagesdata("msl_top_logo")} className="header-brand-img desktop-logo" alt="logo1" />
              <img src={Imagesdata("msl_top_logo")} className="header-brand-img toggle-logo" alt="logo-2" />
              <img src={Imagesdata("msl_top_logo")} className="header-brand-img light-logo" alt="logo-3" />
              <img src={Imagesdata("msl_top_logo")} className="header-brand-img light-logo1" alt="logo-4" style={{width: '200px'}}/> */}
              <img src={Imagesdata("one_cr_logo")} className="header-brand-img light-logo1" alt="logo-4" style={{width: '200px'}}/>
            </Link>
          </div>
          <div className="main-sidemenu mb-8 d-flex flex-column justify-content-between h-100 ">
            <div className="slide-left disabled" id="slide-left"><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
            </svg></div>
            {/* <div>
        {formattedData.map((tab, index) => (
          <div key={index}>
            <h2>{tab.MainDisplayName}</h2>
            {Array.isArray(tab.subTabs) ? (
              <ul>
                {tab.subTabs.map((subTab:any, subIndex:any) => (
                  <li key={subIndex}></li>
                ))}
              </ul>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div> */}
       <ul className="side-menu" style={{ marginLeft: '0px' }}>
      {formattedData.map((mainmenu: any, i: number) => (
        <Fragment key={i + Math.random() * 100}>
          <li className={`slide ${expandedMenus[mainmenu.MainDisplayName] ? 'is-expanded' : ''}`} key={i}>
            {!mainmenu?.type ? (<>
            
              <Link
                to="#"
                className={`side-menu__item ${mainmenu.selected ? '' : ''}`}
                onClick={(event:any) => {
                  event.preventDefault();
                  toggleSidemenu(mainmenu);
                }}
              >
                <i className={`${mainmenu?.subTabs[0]?.Icon} side-menu__icon`}></i>
                {mainmenu?.MainDisplayName}
                <span className="side-menu__label">
                  {mainmenu.title}
                  {mainmenu.active}
                </span>
                {mainmenu.badge ? (
                  <span className={mainmenu.badge}>
                    {mainmenu.badgetxt}
                  </span>
                ) : (
                  ''
                )}
                
                <i className="angle fe fe-chevron-right"></i>
              </Link>
              <ul
                className={`slide-menu ${expandedMenus[mainmenu.MainDisplayName] ? 'open' : ''}`}
                style={
                  expandedMenus[mainmenu.MainDisplayName]
                    ? { opacity: 1, transition: 'opacity 500ms ease-in', display: 'block' }
                    : { display: 'none' }
                }
              >
                {mainmenu?.subTabs?.map((childrenItem: any, index: number) => (
                  <li key={index} className={`sub-slide ${childrenItem.active ? 'is-expanded' : ''}`}>
                    <NavLink to={childrenItem.PageRoute + '/'} className="slide-item">
                      {childrenItem.pagename}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
            ) : (
              <NavLink to={mainmenu.PageRoute + '/'} className="side-menu__item">
                <i className={`${mainmenu?.Icon} side-menu__icon`}></i>
                <span className="side-menu__label">{mainmenu.MainDisplayName}</span>
              </NavLink>
            )}

            
          </li>
        </Fragment>
      ))}
    </ul>
  
            {/* first level */}
            {/* <ul className="side-menu" style={{ marginLeft: "0px" }}>
              {submenuItems.map((section: any, i) => {
                return <Fragment key={i + Math.random() * 100}>
                  {section.Items.map((menuItem: any, i: any) => (
                    <li className={`slide ${menuItem.selected ? 'is-expanded' : ''}`} key={i}>
                      {menuItem.type === "sub" ? (
                        <Link
                          to="#"
                          className={`side-menu__item ${menuItem.selected ? '' : ''}`}
                          onClick={(event: any) => {
                            event.preventDefault();
                            toggleSidemenu(menuItem);
                          }}
                        >

                          <i className={`${menuItem.icon} side-menu__icon`}></i>
                          <span className="side-menu__label">
                            {menuItem.title}{menuItem.active}
                          </span>
                          {menuItem.badge ? (
                            <span className={menuItem.badge}>
                              {menuItem.badgetxt}
                            </span>
                          ) : (
                            ""
                          )}

                          {menuItem.active ? document.body.classList.contains('horizontal') ? <i className="angle fe fe-chevron-up"></i> : <i className="angle fe fe-chevron-down"></i> : document.body.classList.contains('horizontal') ? <i className="angle fe fe-chevron-right"></i> : <i className="angle fe fe-chevron-right"></i>}
                        </Link>
                      ) : (
                        ""
                      )}

                      {menuItem.type === "link" ?
                      
                        <NavLink
                        to={menuItem.PageRoute + "/"}
                        className="side-menu__item"
                      >
                        <i className={`${menuItem.Icon} side-menu__icon`}></i>
                        <span className="side-menu__label">
                        {menuItem.PageDisplayName}
                          </span>
                        
                      </NavLink>
                        :
                        ""
                      }
                      {/* Second Level */}
                      {/* {menuItem.children ? (
                        <ul
                          className={`slide-menu ${menuItem.Names} ${menuItem.active ? "open" : ""}`}
                          style={
                            menuItem.active
                              ? { opacity: 1, transition: 'opacity 500ms ease-in', display: 'block' }
                              : { display: "none" }
                          }
                        >
                          <div className={`${menuItem.Name}`}>
                            {menuItem.children.map((childrenItem: any, index: any) => {
                              return (

                                <li key={index} className={`sub-slide ${childrenItem.active ? "is-expanded" : ""}`} >
                                  {childrenItem.type === "sub" ?
                                    <Link
                                      to="#"
                                      className={`sub-side-menu__item ${childrenItem.selected ? "active" : ""}`}
                                      onClick={(event: any) => { event.preventDefault(); toggleSidemenu(childrenItem); }}>
                                      <span className="sub-side-menu__label">{childrenItem.PageDisplayName}{childrenItem.active}</span>
                                      {childrenItem.active ?
                                        <i className="sub-angle fa fa-angle-down"></i> : <i className="sub-angle fa fa-angle-right"></i>
                                      }
                                    </Link>
                                    :
                                    ""
                                  }

                                  {childrenItem.type === "link" ?
                                    <NavLink
                                      to={childrenItem.PageRoute + "/"}
                                      className="slide-item"
                                    >
                                      {childrenItem.PageDisplayName}
                                    </NavLink>
                                    :
                                    ""
                                  }
                                </li>

                              );
                            })}
                          </div>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </Fragment>;
              })}
            </ul> */} 
            <div className="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </div>
            {/* <div className="side-footer position-fixed bottom-0 start-0">
              <Link className="header-brand1" to={`${import.meta.env.BASE_URL}/`}>
               <img src={Imagesdata("msl_white_logo")} className="footer-header-brand-img desktop-logo" alt="logo1" />
                <img src={Imagesdata("msl_small_white")} className="header-brand-img toggle-logo" alt="logo-2" /> 
              </Link>
            </div> */}
            {/* <div className="side-footer bottom-0 d-flex justify-content-center align-items-end">
              <Link className="header-brand" to={`${import.meta.env.BASE_URL}`}>
                <img src={Imagesdata("msl_bottom_logo")} className="header-brand-img desktop-logo1 mb-4" alt="msl_bottom_logo" style={{width: '200px'}}/> */}
                {/* <img src={Imagesdata("msl_small_white")} className="header-brand-img light-logo" alt="logo-3" /> */}
              {/* </Link>
            </div> */}
          </div>

        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};