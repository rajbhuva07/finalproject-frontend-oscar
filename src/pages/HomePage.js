import React, { useState, useEffect } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
// import { Routes } from "../routes";

// // pages
// import Presentation from "./Presentation";
// import Upgrade from "./Upgrade";
// import DashboardOverview from "./dashboard/DashboardOverview";
// import Transactions from "./Transactions";
// import Settings from "./Settings";
// import BootstrapTables from "./tables/BootstrapTables";
// import Signin from "./examples/Signin";
// import Signup from "./examples/Signup";
// import ForgotPassword from "./examples/ForgotPassword";
// import ResetPassword from "./examples/ResetPassword";
// import Lock from "./examples/Lock";
// import NotFoundPage from "./examples/NotFound";
// import ServerError from "./examples/ServerError";

// // documentation pages
// // import DocsOverview from "./documentation/DocsOverview";
// // import DocsDownload from "./documentation/DocsDownload";
// // import DocsQuickStart from "./documentation/DocsQuickStart";
// // import DocsLicense from "./documentation/DocsLicense";
// // import DocsFolderStructure from "./documentation/DocsFolderStructure";
// // import DocsBuild from "./documentation/DocsBuild";
// // import DocsChangelog from "./documentation/DocsChangelog";

// // components
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Preloader from "../components/Preloader";

// import Accordion from "./components/Accordion";
// import Alerts from "./components/Alerts";
// import Badges from "./components/Badges";
// import Breadcrumbs from "./components/Breadcrumbs";
// import Buttons from "./components/Buttons";
// import Forms from "./components/Forms";
// import Modals from "./components/Modals";
// import Navs from "./components/Navs";
// import Navbars from "./components/Navbars";
// import Pagination from "./components/Pagination";
// import Popovers from "./components/Popovers";
// import Progress from "./components/Progress";
// import Tables from "./components/Tables";
// import Tabs from "./components/Tabs";
// import Tooltips from "./components/Tooltips";
// import Toasts from "./components/Toasts";
// import OtpVerfication from './examples/OtpVerfication';
// import UserTables from './tables/UserTables';

// const RouteWithLoader = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
//   );
// };

// const RouteWithSidebar = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const localStorageIsSettingsVisible = () => {
//     return localStorage.getItem('settingsVisible') === 'false' ? false : true
//   }

//   const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

//   const toggleSettings = () => {
//     setShowSettings(!showSettings);
//     localStorage.setItem('settingsVisible', !showSettings);
//   }

//   return (
//     <Route {...rest} render={props => (
//       <>
//         <Preloader show={loaded ? false : true} />
//         <Sidebar />

//         <main className="content">
//           <Navbar />
//           <Component {...props} />
//           <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
//         </main>
//       </>
//     )}
//     />
//   );
// };

// export default () => (
//   <Switch>
//     {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
//     <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
//     <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
//     <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
//     <RouteWithLoader exact path={Routes.OtpVerfication.path} component={OtpVerfication} />
//     <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
//     <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
//     <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
//     <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

//     {/* pages */}
//     <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
//     <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
//     <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
//     {/* <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} /> */}
//     <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
//     <RouteWithSidebar exact path={Routes.UserTables.path} component={UserTables} />


//     {/* components */}
//     <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
//     <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
//     <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
//     <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
//     <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
//     <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
//     <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
//     <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
//     <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
//     <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
//     <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
//     <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
//     <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
//     <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
//     <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
//     <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

//     {/* documentation */}
//     {/* <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
//     <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
//     <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
//     <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
//     <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
//     <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
//     <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} /> */}

//     <Redirect to={Routes.NotFound.path} />
//   </Switch>
// );
// import React, { useState, useEffect } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
// import { Routes } from "../routes";

// // pages
// import Presentation from "./Presentation";
// import Upgrade from "./Upgrade";
// import DashboardOverview from "./dashboard/DashboardOverview";
// import Transactions from "./Transactions";
// import Settings from "./Settings";
// import BootstrapTables from "./tables/BootstrapTables";
// import Signin from "./examples/Signin";
// import Signup from "./examples/Signup";
// import ForgotPassword from "./examples/ForgotPassword";
// import ResetPassword from "./examples/ResetPassword";
// import Lock from "./examples/Lock";
// import NotFoundPage from "./examples/NotFound";
// import ServerError from "./examples/ServerError";

// // components
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Preloader from "../components/Preloader";

// import Accordion from "./components/Accordion";
// import Alerts from "./components/Alerts";
// import Badges from "./components/Badges";
// import Breadcrumbs from "./components/Breadcrumbs";
// import Buttons from "./components/Buttons";
// import Forms from "./components/Forms";
// import Modals from "./components/Modals";
// import Navs from "./components/Navs";
// import Navbars from "./components/Navbars";
// import Pagination from "./components/Pagination";
// import Popovers from "./components/Popovers";
// import Progress from "./components/Progress";
// import Tables from "./components/Tables";
// import Tabs from "./components/Tabs";
// import Tooltips from "./components/Tooltips";
// import Toasts from "./components/Toasts";
// import OtpVerfication from './examples/OtpVerfication';
// import UserTables from './tables/UserTables';
// import MainPage from '../components/user/MainPage';

// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route {...rest} render={(props) =>
//     isAuthenticated ? (
//       <Component {...props} />
//     ) : (
//       <Redirect to={Routes.Signin.path} />
//     )
//   } />
// );

// const RouteWithLoader = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
//   );
// };


// const RouteWithSidebar = ({ component: Component, isAuthenticated, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const localStorageIsSettingsVisible = () => {
//     return localStorage.getItem('token') !== 'false' ? false : true;
//   }

//   const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

//   const toggleSettings = () => {
//     setShowSettings(!showSettings);
//     localStorage.setItem('token', !showSettings);
//   }

//   return (
//     <Route {...rest} render={props => (
//       <>
//         <Preloader show={loaded ? false : true} />
//         <Sidebar />

//         <main className="content">
//           <Navbar />
//           <Component {...props} />
//           <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
//         </main>
//       </>
//     )}
//     />
//   );
// };

// const HomePage = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Example: You may have a token stored in localStorage
//     setIsAuthenticated(!!token); // Update authentication state based on token presence
//   }, []);
//   return (
//     <Switch>
//       {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}
//       <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
//       <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
//       <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
//       <RouteWithLoader exact path={Routes.OtpVerfication.path} component={OtpVerfication} />
//       <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
//       <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
//       <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
//       <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

//       {/* pages */}
//       <ProtectedRoute exact path={Routes.DashboardOverview.path} component={DashboardOverview} isAuthenticated={isAuthenticated} />
//       <ProtectedRoute exact path={Routes.Upgrade.path} component={Upgrade} />
//       <ProtectedRoute exact path={Routes.Transactions.path} component={Transactions} />
//       <ProtectedRoute exact path={Routes.Settings.path} component={Settings} />
//       <ProtectedRoute exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
//       <ProtectedRoute exact path={Routes.UserTables.path} component={UserTables} />
//       <ProtectedRoute exact path={Routes.MainPage.path} component={MainPage} />


//       {/* components */}
//       <ProtectedRoute exact path={Routes.Accordions.path} component={Accordion} />
//       <ProtectedRoute exact path={Routes.Alerts.path} component={Alerts} />
//       <ProtectedRoute exact path={Routes.Badges.path} component={Badges} />
//       <ProtectedRoute exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
//       <ProtectedRoute exact path={Routes.Buttons.path} component={Buttons} />
//       <ProtectedRoute exact path={Routes.Forms.path} component={Forms} />
//       <ProtectedRoute exact path={Routes.Modals.path} component={Modals} />
//       <ProtectedRoute exact path={Routes.Navs.path} component={Navs} />
//       <ProtectedRoute exact path={Routes.Navbars.path} component={Navbars} />
//       <ProtectedRoute exact path={Routes.Pagination.path} component={Pagination} />
//       <ProtectedRoute exact path={Routes.Popovers.path} component={Popovers} />
//       <ProtectedRoute exact path={Routes.Progress.path} component={Progress} />
//       <ProtectedRoute exact path={Routes.Tables.path} component={Tables} />
//       <ProtectedRoute exact path={Routes.Tabs.path} component={Tabs} />
//       <ProtectedRoute exact path={Routes.Tooltips.path} component={Tooltips} />
//       <ProtectedRoute exact path={Routes.Toasts.path} component={Toasts} />

//       {/* documentation */}
//       {/* <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
//       <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
//       <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
//       <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
//       <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
//       <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
//       <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} /> */}

//       <Redirect to={Routes.NotFound.path} />
//     </Switch>
//   );
// };

// export default HomePage;import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
// import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import MainPage from '../components/user/MainPage';
import Signup from './examples/Signup';
import OtpVerfication from './examples/OtpVerfication';
import UserTables from './tables/UserTables';
import BuyProduct from './tables/BuyProduct';
import Cart from '../components/user/Cart';

const ProtectedRoute = ({ component: Component, isAuthenticated, isAdmin, ...rest }) => (
  <Route {...rest} render={(props) =>
    isAuthenticated ? (
      !isAdmin ? (
        <>
          <Preloader />
          <Sidebar />
          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer />
          </main>
        </>
      ) : (
        <Redirect to={Routes.MainPage.path} />
      )
    )
      : (
        <Redirect to={Routes.Signin.path} />
      )
  } />
);

// const ProtectedRoute = ({ component: Component, isAuthenticated, isAdmin, ...rest }) => {

//   useEffect(() => {
//     if (isAdmin) {
//       // Render the current page without redirection
//       return;
//     }
//   }, [isAdmin]);

//   return (
//     <Route {...rest} render={(props) =>
//       isAuthenticated ? (
//         !isAdmin ? (
//           <>
//             <Redirect to={Routes.DashboardOverview.path} />
//           </>
//         ) : (
//           <Redirect to={Routes.MainPage.path} />
//         )
//       )
//         : (
//           <Redirect to={Routes.Signin.path} />
//         )
//     } />
//   );
// };

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

export default () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAuthenticated(!!token);
    setIsAdmin(adminStatus === 'true');
  }, []);


  return (
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
      <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
      {/* <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} /> */}

      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
      <RouteWithLoader exact path={Routes.OtpVerfication.path} component={OtpVerfication} />
      <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
      <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />


      <RouteWithLoader exact path={Routes.MainPage.path} component={MainPage} />
      <RouteWithLoader exact path={Routes.BuyProduct.path} component={BuyProduct} />
      <RouteWithLoader exact path={Routes.Cart.path} component={Cart} />

      <ProtectedRoute exact path={Routes.UserTables.path} component={UserTables} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.DashboardOverview.path} component={DashboardOverview} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Upgrade.path} component={Upgrade} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Transactions.path} component={Transactions} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Settings.path} component={Settings} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.BootstrapTables.path} component={BootstrapTables} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Accordions.path} component={Accordion} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Alerts.path} component={Alerts} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Badges.path} component={Badges} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Buttons.path} component={Buttons} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Forms.path} component={Forms} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Modals.path} component={Modals} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Navs.path} component={Navs} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Navbars.path} component={Navbars} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Pagination.path} component={Pagination} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Popovers.path} component={Popovers} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Progress.path} component={Progress} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Tables.path} component={Tables} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Tabs.path} component={Tabs} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Tooltips.path} component={Tooltips} isAuthenticated={isAuthenticated} />
      <ProtectedRoute exact path={Routes.Toasts.path} component={Toasts} isAuthenticated={isAuthenticated} />

      {/* Redirect to NotFoundPage if no route matches */}
      <Redirect to={Routes.NotFound.path} />
    </Switch>
  );
};


