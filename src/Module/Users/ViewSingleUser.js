import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import { GetRequest } from "./../ApiHandler/ApiHandler";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Common/Loader";
const ViewSingleUser = () => {
  let urlData = useLocation();
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlData.state !== undefined) {
      fetchPosts(urlData.state.id);
      localStorage.setItem("singleUserId", JSON.stringify(urlData.state));
    } else {
      fetchPosts(JSON.parse(localStorage.getItem("singleUserId")).id);
    }
  }, [urlData]);

  async function fetchPosts(userId) {
    setLoading(true);
    let res = await GetRequest("getUserDetailById/" + userId);
    if (res.status === 200) {
      setData(res.data[0]);
    } else {
      setData([]);
    }
    setLoading(false);
  }

  const {
    name,
    city,
    contactno1,
    contactno2,
    country,
    email,
    zipcode,
    state,
    package_purchase_limit,
    outlet_name,
    resumes,
  } = data || {};
  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="View User Detail" buttonComponent="" />
          <div className="row flex-row">
            <div className="col-xl-12">
              <div className="widget has-shadow" id="manageRestaurant">
                <div className="widget-body positionRelative p-0">
                  <div style={{ minHeight: "300px" }}>
                    <h5 className="pl-4 pt-4">View User Detail</h5>
                    <hr />
                    {loading ? (
                      <div className="loader">
                        <Loader size={40} className="loader" color="#5d5386" />
                      </div>
                    ) : (
                      <div style={{ display: "none" }}></div>
                    )}
                    {data._id !== undefined ? (
                      <div className="row d-flex justify-content-center m-0">
                        <div className="col-12 col-md-6">
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Name of user:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {name !== "" ? name : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Contact no 1:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {contactno1 ? contactno1 : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Contact no 2:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {contactno2 ? contactno2 : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Country:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {country ? country : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              State:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {state ? state : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Resume Views:
                            </label>
                            <div className="col-sm-7">
                              {resumes?.length
                                ? 
                                resumes.map((resume, index) => (
                                    <p className="form-control text-capitalize border-0 bg-white">
                                      <Link
                                        to={{
                                          pathname:
                                            "/view-individual-registration",
                                          state: {
                                            id: resume?.candidateId,
                                          },
                                        }}
                                        className="mr-3"
                                      >
                                        {" "}
                                        {index + 1}.{" "}
                                        {resume?.candidateName ?? "NA"}
                                      </Link>
                                    </p>
                                  ))
                                : "NA"}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Email:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {email ? email : "NA"}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              City:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {city ? city : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              zipcode:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {zipcode ? zipcode : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Outlet Name:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {outlet_name ? outlet_name : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Package Purchase Limit:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {" "}
                                {package_purchase_limit
                                  ? package_purchase_limit
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleUser;
