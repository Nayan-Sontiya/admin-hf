import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
import {
  closeModalProfile,
  DeleteRequest,
  displayModal,
  GetRequest,
  PutRequest,
} from "../ApiHandler/ApiHandler";
import { Link } from "react-router-dom";
import Modal from "../Common/Modal";
import swal from "sweetalert";
const ViewRegistration = () => {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [candidateId, setCandidateId] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);
  const updateCandidateStatus = async () => {
    setStatusLoading(true);
    const response = await PutRequest(
      `updatePerformanceCandidate/${candidateId}`,
      {
        performance_status: currentStatus,
      }
    );
    console.log("response", response);
    if (response.status === 200) {
      swal(response?.message, {
        icon: "success",
      }).then(() => {
        fetchPosts();
      });
      closeModalProfile("candidateStatusUpdate");
    } else {
      swal(response?.message, {
        icon: "error",
      });
    }
    setStatusLoading(false);
  };

  async function fetchPosts() {
    setLoading(true);
    let res = await GetRequest("getCandidatesDetails/approved");
    if (res.length !== undefined && res.length > 0) {
      setData(res.reverse());
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
      name: "Name of Candidate",
      selector: "name_of_candidate",
      sortable: true,
      cell: (row) =>
        row["name_of_candidate"] === "" ? "NA" : row["name_of_candidate"],
    },
    {
      name: "Type of Employment",
      selector: "type_of_employement",
      sortable: true,
      cell: (row) =>
        row["type_of_employement"] === "" ? "NA" : row["type_of_employement"],
    },
    {
      name: "Category",
      selector: "category",
      sortable: true,
      cell: (row) =>
        row["category"] === "" ? "NA" : row["category"].toString(),
    },
    {
      name: "City",
      selector: "location_of_work",
      sortable: true,
      cell: (row) =>
        row["location_of_work"] === ""
          ? "NA"
          : row["location_of_work"].toString(),
    },
    {
      name: "Salary",
      selector: "salary_expectation",
      sortable: true,
      cell: (row) =>
        row["salary_expectation"] === ""
          ? "NA"
          : row["salary_expectation"].toString(),
    },
    {
      name: "Passport number",
      selector: "passportNo",
      sortable: true,
      cell: (row) =>
        row["passportNo"] === "" ? "NA" : row["passportNo"].toString(),
    },
    {
      name: "Status",
      selector: "",
      sortable: true,
      cell: (row) => (
        <>
          <div className="mr-3">
            {row["performance_status"] === "active" ? "Active" : "Deactive"}
          </div>
          {row["performance_status"] === "active" ? (
            <i
              className="la la-minus-circle edit  m-0 editBtn viewButton cursor-pointer"
              onClick={() => {
                setCurrentStatus("deactive") ||
                  displayModal("candidateStatusUpdate") ||
                  setCandidateId(row["_id"]);
              }}
            ></i>
          ) : (
            <i
              className="la la-check-circle-o edit  m-0 editBtn viewButton cursor-pointer"
              onClick={() => {
                setCurrentStatus("active") ||
                  displayModal("candidateStatusUpdate") ||
                  setCandidateId(row["_id"]);
              }}
            ></i>
          )}
        </>
      ),
    },
    {
      name: "Action",
      selector: "",
      sortable: true,
      cell: (row) => (
        <>
          <Link
            to={{
              pathname: "/view-individual-registration",
              state: {
                id: row._id,
              },
            }}
            className="mr-3"
          >
            <i className="la la-eye edit m-0 editBtn viewButton"></i>
          </Link>
          <Link
            to={{
              pathname: "/update-individual-registration",
              state: {
                id: row._id,
              },
            }}
            className="mr-3"
          >
            <i className="la la-edit edit m-0 editBtn viewButton"></i>
          </Link>
          <i
            className="la la-close edit  m-0 editBtn viewButton"
            onClick={() =>
              displayModal("candidateDeletePopup") || setCandidateId(row["_id"])
            }
          ></i>
        </>
      ),
    },
  ];
  async function DeleteCandidate() {
    let resp = await DeleteRequest("deleteCandidate/" + candidateId);
    console.log("delete-candidate", resp);
    if (resp.message === "Candidate details deleted successfully") {
      alert(resp.message);
      fetchPosts();
      closeModalProfile("candidateDeletePopup");
    } else {
      alert(resp.message);
      closeModalProfile("candidateDeletePopup");
    }
  }

  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="View Registration" buttonComponent="" />
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
                    modalId="candidateDeletePopup"
                    ModalHeading="Delete Candidate"
                    ModalBody={
                      <div className="col-9 text-dark pt-2 pb-2">
                        <div className="mb-1 mt-2">
                          <h5 className="page-header-title pt-4">
                            Are you sure you want to Delete this candidate
                            details?
                          </h5>
                        </div>
                      </div>
                    }
                    SubmitButton={DeleteCandidate}
                    ModalType="delete"
                  />
                  <Modal
                    modalId="candidateStatusUpdate"
                    ModalHeading="Update Candidate's Status"
                    ModalBody={
                      <div className="col-9 text-dark pt-2 pb-2">
                        <div className="mb-1 mt-2">
                          <h5 className="page-header-title pt-4">
                            {` Are you really want to ${currentStatus} candidate?`}
                          </h5>
                        </div>
                      </div>
                    }
                    SubmitButton={updateCandidateStatus}
                    ModalType="delete"
                    ModalLoading={statusLoading}
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

export default ViewRegistration;
