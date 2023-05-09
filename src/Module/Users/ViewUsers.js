import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
import {
  GetRequest,
  displayModal,
  DeleteRequest,
  closeModalProfile,
  multipleMediaIdentifier,
  awsurl,
  PostRequest,
} from "../ApiHandler/ApiHandler";
import { Link } from "react-router-dom";
import Modal from "../Common/Modal";
import swal from "sweetalert";
const ViewUsers = () => {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [name_of_candidate, set_name_of_candidate] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);
  const [searchable, setSearchable] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    let res = await GetRequest("getUserDetails/");
    if (res.status === 200) {
      setData(res.data);
    } else {
      setData([]);
    }
    setLoading(false);
  }
  const columns = [
    {
      name: "Sr. No.",
      selector: "",
      sortable: true,
      maxWidth: "100px",
      cell: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => (row["name"] === "" ? "NA" : row["name"]),
    },
    {
      name: "Outlet name",
      selector: "outlet_name",
      sortable: true,
      cell: (row) => (row["outlet_name"] === "" ? "NA" : row["outlet_name"]),
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
      cell: (row) => (!row["city"] ? "NA" : row["city"]),
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => (!row["email"] ? "NA" : row["email"]),
    },
    {
      name: "Contact No 1",
      selector: "contactno1",
      sortable: true,
      cell: (row) =>
        !row["contactno1"] ? "NA" : row["contactno1"]?.toString(),
    },
    {
      name: "Action",
      selector: "",
      sortable: true,
      cell: (row) => (
        <>
          <i
            className="la la-send edit mr-3 editBtn viewButton cursor-pointer"
            onClick={() =>
              displayModal("UserSearchPopup") ||
              setUserEmail(row["email"]) ||
              setUserName(row["name"]) ||
              set_name_of_candidate("")
            }
          ></i>
          <Link
            to={{
              pathname: "/view-single-user",
              state: {
                id: row._id,
              },
            }}
            className="mr-3"
          >
            <i className="la la-eye edit m-0 editBtn viewButton"></i>
          </Link>
          <i
            className="la la-close edit  m-0 editBtn viewButton"
            onClick={() =>
              displayModal("UserDeletePopup") || setUserId(row["_id"])
            }
          ></i>
        </>
      ),
    },
  ];

  async function DeleteUsers() {
    let resp = await DeleteRequest("deleteUserById/" + userId);
    if (resp.status === 200) {
      alert("User deleted successfully");
      fetchPosts();
      closeModalProfile("UserDeletePopup");
    } else {
      alert(resp.message);
      closeModalProfile("UserDeletePopup");
    }
  }

  useEffect(() => {
    if (name_of_candidate !== "" && searchable) {
      getCandidateByKeyWord(name_of_candidate);
    }
  }, [name_of_candidate]);

  async function getCandidateByKeyWord(searchKey) {
    if (!searchKey && searchable) {
      setSuggestionData([]);
      return;
    }
    let res = await GetRequest(
      `getCandidatesDetailsByKeyword?search=${searchKey}`
    );
    if (res.length) {
      setSuggestionData(res);
    } else {
      setSuggestionData([]);
    }
  }
  async function sendMailtoUser(userEmail, candidateId) {
    let resp = await PostRequest(`sendRequirementMail/${userEmail}`, {
      candidateId,
      userName,
    });

    if (resp?.status === 200) {
      swal({
        title: "Success",
        text: resp?.message,
        icon: "success",
        button: "Ok",
      });
      closeModalProfile("UserSearchPopup");
    } else {
      swal({
        title: "Error",
        text: resp?.message,
        icon: "error",
        button: "Ok",
      });
    }
  }
  const SelectUser = (candidate) => {
    set_name_of_candidate(candidate?.name_of_candidate);
    setSelectedCandidate(candidate);
    setSuggestionData([]);
    setSearchable(false);
  };

  async function SearchUsers() {
    sendMailtoUser(userEmail, selectedCandidate?._id);
  }

  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="View Users" buttonComponent="" />
          <div className="row flex-row">
            <div className="col-xl-12">
              <div className="widget has-shadow" id="manageRestaurant">
                <div className="widget-body positionRelative p-0">
                  {loading ? (
                    <div className="loader">
                      <Loader size={40} className="loader" color="#5d5386" />
                    </div>
                  ) : (
                    <div style={{ display: "none" }}></div>
                  )}
                  <DataTableComponent columns={columns} data={data} />
                  <Modal
                    modalId="UserDeletePopup"
                    ModalHeading="Delete User"
                    ModalBody={
                      <div className="col-9 text-dark pt-2 pb-2">
                        <div className="mb-1 mt-2">
                          <h5 className="page-header-title pt-4">
                            Are you sure you want to delete this user details?
                          </h5>
                        </div>
                      </div>
                    }
                    SubmitButton={DeleteUsers}
                    ModalType="delete"
                  />
                  <Modal
                    modalId="UserSearchPopup"
                    ModalHeading="Search Candidates"
                    ModalBody={
                      <div className="col-9 text-dark pt-2 pb-2">
                        <div className="mb-1 mt-2">
                          <div className="form-group row mt-4">
                            <label className="col-sm-4 col-form-label text-dark text-md-center">
                              Search Candidate *
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                className="form-control"
                                style={{ textTransform: "uppercase" }}
                                id="name"
                                onChange={(e) => {
                                  set_name_of_candidate(e.target.value);
                                  setSearchable(true);
                                }}
                                value={name_of_candidate}
                                placeholder="Name"
                              />
                              <div className="suggestion-box">
                                {suggestionData &&
                                  name_of_candidate &&
                                  suggestionData.map((suggestion, i) => (
                                    <div
                                      className="suggestion"
                                      onClick={() => SelectUser(suggestion)}
                                      key={i}
                                    >
                                      <label className="col-8 col-form-label text-dark text-md-right font-weight-bold">
                                        {suggestion.name_of_candidate}
                                      </label>
                                      <div className="col-4">
                                        {suggestion.photo_of_candidate !==
                                        "" ? (
                                          <>
                                            {multipleMediaIdentifier(
                                              suggestion.photo_of_candidate
                                            ).map((candidate, i) => {
                                              if (i === 0) {
                                                return (
                                                  <img
                                                    key={i}
                                                    alt=""
                                                    src={
                                                      awsurl + candidate.media
                                                    }
                                                    style={{
                                                      height: "50px",
                                                      width: "50px",
                                                      marginLeft: "10px",
                                                    }}
                                                  />
                                                );
                                              }
                                            })}
                                          </>
                                        ) : (
                                          <p className="form-control text-capitalize border-0 bg-white">
                                            NA
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    SubmitButton={searchable ? "" : SearchUsers}
                    ModalType="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
