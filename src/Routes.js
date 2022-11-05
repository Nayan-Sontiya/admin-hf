import React, { useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./assets/vendors/css/base/elisyam-1.5.min.css";
import About from "./Module/About/About";
import AuthRoutes from "./Module/Auth/AuthRoutes";
import WhyChooseUs from "./Module/About/WhyChooseUs";

function Routes() {
  const Header = React.lazy(() => import("./Module/Common/Header"));
  const Footer = React.lazy(() => import("./Module/Common/Footer"));
  const Dashboard = React.lazy(() => import("./Module/Dashboard"));
  const ViewSingleUser = React.lazy(() =>
    import("./Module/Users/ViewSingleUser")
  );
  const AddOccupation = React.lazy(() =>
    import("./Module/Occupation/AddOccupation.js")
  );
  const ManageOccupation = React.lazy(() =>
    import("./Module/Occupation/ManageOccupation.js")
  );
  const AddCategory = React.lazy(() => import("./Module/Category/AddCategory"));
  const ManageCategory = React.lazy(() =>
    import("./Module/Category/ManageCategory")
  );
  const AddSubCategory = React.lazy(() =>
    import("./Module/SubCategory/AddSubCategory")
  );
  const ManageSubCategory = React.lazy(() =>
    import("./Module/SubCategory/ManageSubCategory")
  );
  const Registration = React.lazy(() =>
    import("./Module/Registration/Registration")
  );
  const ViewRegistration = React.lazy(() =>
    import("./Module/Registration/ViewRegistration")
  );
  const PendingRegistration = React.lazy(() =>
    import("./Module/Registration/PendingRegistration")
  );
  const UpdateRegistration = React.lazy(() =>
    import("./Module/Registration/UpdateRegistration")
  );
  const AddPackage = React.lazy(() => import("./Module/Packages/AddPackage"));
  const ViewPackage = React.lazy(() => import("./Module/Packages/ViewPackage"));
  const ViewIndividualRecord = React.lazy(() =>
    import("./Module/Registration/ViewSingleRegistration")
  );
  const ViewUsers = React.lazy(() => import("./Module/Users/ViewUsers"));
  const UserReports = React.lazy(() => import("./Module/Users/UserReports"));
  const GrtInTouchData = React.lazy(() =>
    import("./Module/GetInTouch/GrtInTouchData")
  );
  const ContactDetails = React.lazy(() =>
    import("./Module/GetInTouch/ContactDetails")
  );
  const UserRequirement = React.lazy(() =>
    import("./Module/Users/UserRequirement")
  );
  const Invoices = React.lazy(() => import("./Module/Invoices/index"));

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("hospitality") === null ? false : true
  );
  return (
    <div>
      <React.Suspense
        fallback={
          <div className="lazy">
            {" "}
            <div className="container"> loading... </div>{" "}
          </div>
        }
      >
        {authToken === true ? (
          <Router>
            <Header setAuthToken={setAuthToken} />
            <Switch>
              <Route exact path="/add-occupation" component={AddOccupation} />
              <Route path="/view-occupation" component={ManageOccupation} />
              
              <Route path="/add-category" component={AddCategory} />
              <Route path="/view-category" component={ManageCategory} />
              <Route path="/add-sub-category" component={AddSubCategory} />
              <Route path="/view-sub-category" component={ManageSubCategory} />
              <Route path="/registration" component={Registration} />
              <Route path="/view-registration" component={ViewRegistration} />
              <Route path="/view-single-user" component={ViewSingleUser} />
              <Route path="/user-reports" component={UserReports} />
              <Route
                path="/pending-registration"
                component={PendingRegistration}
              />

              <Route
                path="/update-individual-registration"
                component={UpdateRegistration}
              />
              <Route path="/add-package" component={AddPackage} />
              <Route path="/view-package" component={ViewPackage} />
              <Route
                path="/view-individual-registration"
                component={ViewIndividualRecord}
              />
              <Route path="/about" component={About} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/why-choose-us" component={WhyChooseUs} />
              <Route path="/view-users" component={ViewUsers} />
              <Route path="/get-in-touch" component={GrtInTouchData} />
              <Route path="/contact-details" component={ContactDetails} />
              <Route path="/user-requirement" component={UserRequirement} />
              <Route path="/view-invoices" component={Invoices} />
              <Redirect to="/view-registration" />
            </Switch>
            <Footer />
          </Router>
        ) : (
          <AuthRoutes setAuthToken={setAuthToken} />
        )}
      </React.Suspense>
    </div>
  );
}

export default Routes;
