import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
import "./index.css";
import {
  GetRequest,
  DeleteRequest,
  closeModalProfile,
  displayModal,
  PostRequest,
  PutRequest,
} from "../ApiHandler/ApiHandler";
import Modal from "../Common/Modal";
import swal from "sweetalert";
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  let [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    let res = await GetRequest("getDashboardData");
    if (res.status === 200) {
      setData(res.data);
    } else {
      setData(null);
    }
    setLoading(false);
  }
  //   console.log("data => ", data);
  const {
    newCandidateCount,
    NewUserCount,
    todayPackageSaleCount,
    MonthPackageSaleCount,
    todayReportCount,
  } = data || {};
  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="Dashboard" buttonComponent="" />
          <div class="container bootstrap snippet">
            <div class="row">
              {loading ? (
                <div className="text-center w-100">
                  <Loader />
                </div>
              ) : (
                <>
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-success border-success">
                      <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 p-3 pb-1">
                          <div class="widget-chart-flex">
                            <div class="widget-numbers">
                              <div class="widget-chart-flex">
                                <div class="fsize-4 mb-2">
                                  {/* <small class="opacity-5">$</small> */}
                                  <span>{NewUserCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h6 class="widget-subheading mb-0 opacity-5">
                            New Users
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-primary border-primary">
                      <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 p-3 pb-1">
                          <div class="widget-chart-flex">
                            <div class="widget-numbers">
                              <div class="widget-chart-flex">
                                <div class="fsize-4 mb-2">
                                  {/* <small class="opacity-5">$</small> */}
                                  <span>{newCandidateCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h6 class="widget-subheading mb-0 opacity-5">
                            New Candidates
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-warning border-warning">
                      <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 p-3 pb-1">
                          <div class="widget-chart-flex">
                            <div class="widget-numbers">
                              <div class="widget-chart-flex">
                                <div class="fsize-4 mb-2">
                                  {/* <small class="opacity-5">$</small> */}
                                  <span>{todayPackageSaleCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h6 class="widget-subheading mb-0 opacity-5">
                            Today's Package Sale Count
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-danger border-danger">
                      <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 p-3 pb-1">
                          <div class="widget-chart-flex">
                            <div class="widget-numbers">
                              <div class="widget-chart-flex">
                                <div class="fsize-4 mb-2">
                                  {/* <small class="opacity-5">$</small> */}
                                  <span>{MonthPackageSaleCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h6 class="widget-subheading mb-0 opacity-5">
                            Monthly's Package Count
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-xl-4">
                    <div class="card mb-3 widget-chart widget-chart2 text-left card-btm-border card-shadow-danger border-info">
                      <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content pt-3 p-3 pb-1">
                          <div class="widget-chart-flex">
                            <div class="widget-numbers">
                              <div class="widget-chart-flex">
                                <div class="fsize-4 mb-2">
                                  {/* <small class="opacity-5">$</small> */}
                                  <span>{todayReportCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h6 class="widget-subheading mb-0 opacity-5">
                            Today's Report Count
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
