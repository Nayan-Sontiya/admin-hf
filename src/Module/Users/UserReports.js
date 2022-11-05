import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
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

const UserReports = () => {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [complainId, setComplainId] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    let res = await GetRequest("getComplain/all");
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
      name: "User name",
      selector: "userName",
      sortable: true,
      cell: (row) => (row["userName"] === "" ? "NA" : row["userName"]),
    },
    {
      name: "Candidate name",
      selector: "candidateName",
      sortable: true,
      cell: (row) =>
        row["candidateName"] === "" ? "NA" : row["candidateName"],
    },
    {
      name: "Report Detail",
      selector: "reportdetail",
      sortable: true,
      cell: (row) => (row["reportdetail"] === "" ? "NA" : row["reportdetail"]),
    },
    {
      name: "Report Status",
      selector: "reportstatus",
      sortable: true,
      cell: (row) =>
        row["reportstatus"] === "" ? "NA" : row["reportstatus"].toUpperCase(),
    },
    {
      name: "",
      selector: "",
      cell: (row) => (
        <>
          {row["reportstatus"] === "pending" && (
            <button
              onClick={() => {
                setComplainId(row["_id"]) ||
                  setCurrentStatus("rejected") ||
                  displayModal("complainModal");
              }}
              className=" btn btn-grad "
            >
              Reject
            </button>
          )}
        </>
      ),
    },
    {
      name: "",
      selector: "",
      cell: (row) => (
        <>
          {row["reportstatus"] === "pending" && (
            <button
              onClick={() => {
                setComplainId(row["_id"]) ||
                  setCurrentStatus("accepted") ||
                  displayModal("complainModal");
              }}
              className=" btn btn-grad "
            >
              Accept
            </button>
          )}
        </>
      ),
    },
  ];

  async function UpdateReportStatus(status) {
    setModalLoading(true);
    let resp = await PutRequest(`updateComplain/${complainId}`, {
      reportstatus: status,
    });
    if (resp.status === 200) {
      setModalLoading(false);
      swal({
        title: "Success",
        text: resp?.message,
        icon: "success",
        button: "Ok",
      }).then(() => {
        fetchPosts();
      });
      closeModalProfile("complainModal");
    } else {
      setModalLoading(false);
      swal({
        title: "Error",
        text: resp?.message,
        icon: "error",
        button: "Ok",
      });
      closeModalProfile("complainModal");
    }
  }

  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="User Reports" buttonComponent="" />
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
                    SubmitButton={() => UpdateReportStatus("reject")}
                    ModalType="delete"
                  />
                </div>
              </div>
            </div>
          </div>
          <Modal
            modalId="complainModal"
            ModalHeading="Search Candidates"
            ModalBody={
              <div className="col-9 text-dark pt-2 pb-2">
                <div className="mb-1 my-2">
                  <h5 className="page-header-title py-4">
                    {currentStatus === "accepted"
                      ? `Are you sure you want to accept current report?`
                      : `Are you sure you want to reject current report?`}
                  </h5>
                </div>
              </div>
            }
            SubmitButton={
              currentStatus === "accepted"
                ? () => UpdateReportStatus("accepted")
                : () => UpdateReportStatus("rejected")
            }
            ModalType="delete"
            ModalLoading={modalLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default UserReports;
