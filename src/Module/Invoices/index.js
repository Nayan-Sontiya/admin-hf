import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
import DatePicker from "react-date-picker";
import {
  GetRequest,
  closeModalProfile,
  PutRequest,
} from "../ApiHandler/ApiHandler";
import Modal from "../Common/Modal";
import swal from "sweetalert";

const Invoices = () => {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [complainId, setComplainId] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(startDate, endDate);
  const formatDate = (date, { utc = false } = {}) => {
    if (typeof date === "string") date = new Date(date);
    if (date) {
      const options = {};
      if (utc) options.timeZone = "UTC";
      const formatedDate = new Intl.DateTimeFormat().format(date);
      return formatedDate;
    }
    return "";
  };

  useEffect(() => {
    fetchPosts();
  }, [startDate, endDate]);
  const getFormatedDateForInvoices = (date) => {
    if (!date) {
      return undefined;
    }
    const today = new Date(date);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
  };
  async function fetchPosts() {
    let url = `getallinvoice?`;
    setLoading(true);
    if (startDate) {
      url += `startDate=${getFormatedDateForInvoices(startDate)}`;
    }
    if (endDate) {
      if (!startDate) {
        url += `endDate=${getFormatedDateForInvoices(endDate)}`;
      } else {
        url += `&endDate=${getFormatedDateForInvoices(endDate)}`;
      }
    }
    let res = await GetRequest(url);
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
      minWidth: "80px",
      cell: (row, index) => index + 1,
    },
    {
      name: "User name",
      selector: "userName",
      sortable: true,
      cell: (row) => (row["userName"] === "" ? "NA" : row["userName"]),
    },
    {
      name: "User email",
      selector: "userEmail",
      sortable: true,
      cell: (row) => (row["userEmail"] === "" ? "NA" : row["userEmail"]),
    },
    {
      name: "Invoice number",
      selector: "invoiceId",
      sortable: true,
      cell: (row) => (row["invoiceId"] === "" ? "NA" : row["invoiceId"]),
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
      cell: (row) => (row["date"] === "" ? "NA" : formatDate(row["date"])),
    },
    {
      name: "Plan name",
      selector: "planName",
      sortable: true,
      cell: (row) => (row["planName"] === "" ? "NA" : row["planName"]),
    },
    {
      name: "CGST",
      selector: "CGST",
      sortable: true,
      maxWidth: "100px",
      minWidth: "80px",
      cell: (row) => (row["CGST"] === "" ? "NA" : row["CGST"]),
    },
    {
      name: "SGST",
      selector: "SGST",
      sortable: true,
      maxWidth: "100px",
      minWidth: "80px",
      cell: (row) => (row["SGST"] === "" ? "NA" : row["SGST"]),
    },
    {
      name: "Price",
      selector: "total",
      sortable: true,
      maxWidth: "100px",
      minWidth: "80px",
      cell: (row) => (row["total"] === "" ? "NA" : row["total"]),
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
          <div className="d-flex justify-content-between px-3 mb-2">
            <Heading headingText="Invoices" buttonComponent="" />
            <div className="d-flex align-items-center justify-content-end">
              <div className="mr-2">
                <h5 className="page-header-title mr-2">Start Date</h5>
                <DatePicker onChange={setStartDate} value={startDate} />
              </div>
              <div>
                <h5 className="page-header-title mr-2">End Date</h5>
                <DatePicker onChange={setEndDate} value={endDate} />
              </div>
            </div>
          </div>

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

export default Invoices;
