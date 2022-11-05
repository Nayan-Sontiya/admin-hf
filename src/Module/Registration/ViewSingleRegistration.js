import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import {
  GetRequest,
  multipleMediaIdentifier,
  awsurl,
} from "./../ApiHandler/ApiHandler";
import { useLocation } from "react-router-dom";
import Loader from "../Common/Loader";
const Registration = () => {
  let urlData = useLocation();
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const experienceFormator = (experienceUnsorted) => {
    let formatedDate = experienceUnsorted.map((exp) => {
      let year = exp.expStartDate.split("-")[1];
      let month = exp.expStartDate.split("-")[0];
      let properDateFormate = year + "-" + month + "-01";
      exp.formatedStartDate = new Date(properDateFormate);
      return exp;
    });
    let formated = formatedDate.sort(
      (a, b) => b.formatedStartDate - a.formatedStartDate
    );
    return formated;
  };
  useEffect(() => {
    if (urlData.state !== undefined) {
      fetchPosts(urlData.state.id);
      localStorage.setItem("singleRegId", JSON.stringify(urlData.state));
    } else {
      fetchPosts(JSON.parse(localStorage.getItem("singleRegId")).id);
    }
  }, [urlData]);

  async function fetchPosts(id) {
    setLoading(true);
    let res = await GetRequest("getCandidateInfo/" + id);
    console.log(res);
    if (res.status === 200) {
      setData(res.data);
    } else {
      setData([]);
    }
    setLoading(false);
  }
  const convertArrayToString = (locationArr) => {
    let locationString = locationArr.toString();
    return locationString;
  };

  function getWords(monthCount) {
    function getPlural(number, word) {
      return (number === 1 && word.one) || word.other;
    }
    var months = { one: "month", other: "months" },
      years = { one: "year", other: "years" },
      m = monthCount % 12,
      y = Math.floor(monthCount / 12),
      result = [];
    y && result.push(y + " " + getPlural(y, years));
    m && result.push(m + " " + getPlural(m, months));
    return result.join(" , ");
  }

  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading
            headingText="View Candidate Registration"
            buttonComponent=""
          />
          <div className="row flex-row">
            <div className="col-xl-12">
              <div className="widget has-shadow" id="manageRestaurant">
                <div className="widget-body positionRelative p-0">
                  <div style={{ minHeight: "300px" }}>
                    <h5 className="pl-4 pt-4">View Candidate Registration </h5>
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
                              Name of candidate:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.name_of_candidate !== ""
                                  ? data.name_of_candidate
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Employment Type:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.type_of_employement !== ""
                                  ? data.type_of_employement
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Category:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.category.length > 0
                                  ? data.category.toString()
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Sub Category:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.sub_category.length > 0
                                  ? data.sub_category.toString()
                                  : "NA"}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Aadhar Card No:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.aadhar_card_no !== ""
                                  ? data.aadhar_card_no
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              PAN No:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.pan_card_no !== ""
                                  ? data.pan_card_no
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Relative Phone No:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.relative_contact_no !== ""
                                  ? data.relative_contact_no
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Email:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.email_address !== ""
                                  ? data.email_address
                                  : "NA"}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              DOB:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {" "}
                                {data.dob !== "" ? data.dob : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Age:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.age}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Father Name:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.father_name}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Gender :
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.gender !== "" ? data.gender : ""}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Languages :
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.languages !== "" ? data.languages : ""}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Candidate Photograph:
                            </label>
                            <div className="col-sm-7">
                              {data.photo_of_candidate !== "" ? (
                                <>
                                  {multipleMediaIdentifier(
                                    data.photo_of_candidate
                                  ).map((candidate, i) => {
                                    return (
                                      <img
                                        key={i}
                                        alt=""
                                        src={awsurl + candidate.media}
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    );
                                  })}
                                </>
                              ) : (
                                <p className="form-control text-capitalize border-0 bg-white">
                                  NA
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Candidate Video:
                            </label>
                            <div className="col-sm-7">
                              {data.video_of_candidate !== "" ? (
                                <>
                                  {multipleMediaIdentifier(
                                    data.video_of_candidate
                                  ).map((candidate, i) => {
                                    return (
                                      <video
                                        key={i}
                                        alt=""
                                        autoPlay
                                        src={awsurl + candidate.media}
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    );
                                  })}
                                </>
                              ) : (
                                <p className="form-control text-capitalize border-0 bg-white">
                                  NA
                                </p>
                              )}
                            </div>
                          </div>
                          {data.dish !== "" ? (
                            <div className="form-group row mt-4">
                              <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                                Dish Photographs:
                              </label>
                              <div className="col-sm-7">
                                {multipleMediaIdentifier(data.dish).map(
                                  (certificate, i) => {
                                    return (
                                      <img
                                        key={i}
                                        alt=""
                                        src={awsurl + certificate.media}
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Objective :
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.objective !== "" ? data.objective : "NA"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Contact no 1:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.contactno1}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Contact no 2:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.contactno2 !== ""
                                  ? data.contactno2
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Passport No:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.passportNo !== ""
                                  ? data.passportNo
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Identification:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.identification !== ""
                                  ? data.identification
                                  : "NA"}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Education:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.education}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Hobby and interest:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.hobbies_and_interest !== ""
                                  ? data.hobbies_and_interest
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Religion:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.religion}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Marital Status:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.marital_status}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Preferable Work Locations:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {convertArrayToString(data.location_of_work)}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Salary Expectation:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {"₹ " + data.salary_expectation + "/month"}
                              </p>
                            </div>
                          </div>

                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Permanent Address:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.permanent_address}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Experience:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {" "}
                                {data.experience_in_month !== undefined
                                  ? getWords(data.experience_in_month)
                                  : "0" + " months"}
                              </p>
                            </div>
                          </div>
                          {data.type_of_employement === "Chef" ? (
                            <div className="form-group row mt-4">
                              <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                                Chef Type:
                              </label>
                              <div className="col-sm-7">
                                <p className="form-control text-capitalize border-0 bg-white">
                                  {data.chef_type !== ""
                                    ? data.chef_type
                                    : "NA"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Experience Certificates:
                            </label>
                            <div className="col-sm-7">
                              {data.work_experience[0].work_certificate !==
                              "" ? (
                                multipleMediaIdentifier(
                                  data.work_experience[0].work_certificate
                                ).map((certificate, i) => {
                                  return (
                                    <img
                                      key={i}
                                      alt=""
                                      src={awsurl + certificate.media}
                                      style={{
                                        height: "50px",
                                        width: "50px",
                                        marginLeft: "10px",
                                      }}
                                    />
                                  );
                                })
                              ) : (
                                <p className="form-control text-capitalize border-0 bg-white">
                                  NA
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Additional Education:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.additionalEducation !== ""
                                  ? data.additionalEducation
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Candidate Rating:
                            </label>
                            <div className="col-sm-7">
                              <p className="form-control text-capitalize border-0 bg-white">
                                {data.candidate_rating !== ""
                                  ? data.candidate_rating
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                          <div className="form-group row mt-4">
                            <label className="col-sm-5 col-form-label text-dark text-md-right font-weight-bold">
                              Experience Details:
                            </label>
                            <div className="col-12">
                              {data.experiences.length > 0
                                ? experienceFormator(data.experiences).map(
                                    (value, i) => {
                                      return (
                                        <div
                                          className="position-relative row p-0 mt-2 m-0 expDetailsBox"
                                          key={i}
                                        >
                                          <div className="col-12 pt-1 ">
                                            <div className="row p-0 m-0">
                                              <label className="expDetailsText">
                                                Outlet Name :
                                              </label>
                                              <p className="pl-2 expDetailsText">
                                                {value.expOutletName}
                                              </p>
                                            </div>
                                            <div className="row p-0 m-0">
                                              <label className="expDetailsText">
                                                Designation :
                                              </label>
                                              <p className="pl-2 expDetailsText">
                                                {value.expDesignation}
                                              </p>
                                            </div>
                                            <div className="row p-0 m-0">
                                              <label className="expDetailsText">
                                                Place :
                                              </label>
                                              <p className="pl-2 expDetailsText">
                                                {value.expPlace}
                                              </p>
                                            </div>
                                            <div className="row p-0 m-0">
                                              <label className="expDetailsText">
                                                City :
                                              </label>
                                              <p className="pl-2 expDetailsText">
                                                {value.expCity}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-12 col-sm-6 mt-1">
                                            <div className="row p-0 m-0">
                                              <label className="expDetailsText">
                                                Start date :
                                              </label>
                                              <p className="pl-2 expDetailsText">
                                                {value.expStartDate}
                                              </p>
                                            </div>
                                            <div className="row p-0 m-0">
                                              <label className="expDetailsText">
                                                End date :
                                              </label>
                                              <p className="pl-2 expDetailsText">
                                                {value.expEndDate}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                                : ""}
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

export default Registration;
