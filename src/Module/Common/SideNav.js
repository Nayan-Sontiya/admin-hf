import SideNavButton from "./SideNavComponents/Button";
import { Link } from "react-router-dom";
import msg from "../../assets/img/msg.png";
import { UserDataProvider } from "../ApiHandler/ApiHandler";
function SideNav() {
  const { role } = UserDataProvider();
  return (
    <>
      <nav className="side-navbar box-scroll sidebar-scroll">
        <ul className="list-unstyled">
          {role === "superAdmin" && (
            <li className="">
              <Link to="/dashboard" className="sideNavComponent">
                <i className="la la-info"></i>
                <span>Dashboard</span>
              </Link>
            </li>
          )}
          <li className="active">
            <SideNavButton
              ToggleComponentId="registration"
              ButtonHeading="Candidate Registration"
              ButtonIcon="la la-building"
              SubMenuOptions={[
                { name: "Candidate Registration", link: "/registration" },
                { name: "View Registration", link: "/view-registration" },
                { name: "Pending Registration", link: "/pending-registration" },
              ]}
            />
          </li>
          <li className="">
            <SideNavButton
              ToggleComponentId="occupation"
              ButtonHeading="Occupation"
              ButtonIcon="la la-dashboard"
              SubMenuOptions={[
                // { name: "Add Occupation", link: "/add-occupation" },
                { name: "View Occupation", link: "/view-occupation" },
              ]}
            />
          </li>
          <li className="">
            <SideNavButton
              ToggleComponentId="category"
              ButtonHeading="Category"
              ButtonIcon="la la-list"
              SubMenuOptions={[
                // { name: "Add Category", link: "/add-category" },
                { name: "View Category", link: "/view-category" },
              ]}
            />
          </li>
          <li className="">
            <SideNavButton
              ToggleComponentId="subcategory"
              ButtonHeading="Sub Category"
              ButtonIcon="la la-list"
              SubMenuOptions={[
                // { name: "Add Sub Category", link: "/add-sub-category" },
                { name: "View Sub Category", link: "/view-sub-category" },
              ]}
            />
          </li>
          <li className="">
            <SideNavButton
              ToggleComponentId="package"
              ButtonHeading="Package"
              ButtonIcon="la la-money"
              SubMenuOptions={[
                { name: "Add Package", link: "/add-package" },
                { name: "View Packages", link: "/view-package" },
              ]}
            />
          </li>
          <li className="">
            <SideNavButton
              ToggleComponentId="users"
              ButtonHeading="Users"
              ButtonIcon="la la-users"
              SubMenuOptions={[
                { name: "Veiw Users", link: "/view-users" },
                { name: "User Requirements", link: "/user-requirement" },
                { name: "User Reports", link: "/user-reports" },
              ]}
            />
          </li>
          {role === "superAdmin" && (
            <li className="">
              <SideNavButton
                ToggleComponentId="invoices"
                ButtonHeading="Invoices"
                ButtonIcon="la la-file"
                SubMenuOptions={[
                  { name: "Veiw Invoices", link: "/view-invoices" },
                  // { name: "User Requirements", link: "/user-requirement" },
                  // { name: "User Reports", link: "/user-reports" },
                ]}
              />
            </li>
          )}
          <li>
            <Link to={"/about"} className="sideNavComponent">
              <i className="la la-info"></i>
              <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link to={"/why-choose-us"} className="sideNavComponent">
              <i className="la la-info-circle"></i>
              <span>Why Choose Us</span>
            </Link>
          </li>

          <li>
            <Link to={"/get-in-touch"} className="sideNavComponent">
              <i className="la la-comment"></i>
              <span>Get In Touch</span>
            </Link>
          </li>
          <li>
            <Link to={"/contact-details"} className="sideNavComponent">
              <i className="la la-envelope-o"></i>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNav;
