import $ from "jquery";
import "./../../assets/App css/index.css";
import { useHistory } from "react-router-dom";
import logo from "./../../assets/App icons/hfLogo.png";
import { useEffect } from "react";
import { UserTokenExpire } from "../ApiHandler/ApiHandler";
function Header({ setAuthToken }) {
  let history = useHistory();
  const {
    location: { pathname },
  } = history || {};
  function logout() {
    localStorage.removeItem("hospitality");
    setAuthToken(false);
    history.push("/");
  }

  // useEffect(() => {
  //   const userDataString = localStorage.getItem("hospitality");
  //   const userData = JSON.parse(userDataString);
  //   if (!userData?.expiry) {
  //     localStorage.setItem(
  //       "hospitality",
  //       JSON.stringify({ ...userData, expiry: new Date().getTime() + 300000 })
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (UserTokenExpire()) {
      logout();
    }
  }, [pathname]);
  function toggleSideNavMobile() {
    $(".side-navbar").toggleClass("hideDIv");
  }
  return (
    <header className="header">
      <nav className="navbar fixed-top">
        <div className="navbar-holder d-flex align-items-center align-middle justify-content-between">
          <div className="navbar-header">
            <button className="navbar-brand btn pl-1">
              <div className="brand-image brand-big">
                <img src={logo} width="165px" alt="" />
              </div>
              <div className="brand-image brand-small">
                <img src={logo} width="120px" alt="" />
              </div>
            </button>

            <button
              id="toggle-btn"
              onClick={toggleSideNavMobile}
              className="menu-btn active btn p-0 sideNavLogo"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center pull-right">
            <li className="float-left mr-2 mt-2" onClick={() => logout()}>
              <i className="la la-sign-out m-0 logout"></i>
            </li>
            <li className="float-left mt-2 font-weight-500">Logout</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
