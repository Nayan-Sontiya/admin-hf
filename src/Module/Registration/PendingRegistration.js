import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
import {
    PutRequest,
    GetRequest,
} from "../ApiHandler/ApiHandler";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function PendingRegistration() {
    let [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      fetchPosts();
    }, []);
  
    async function fetchPosts() {
      setLoading(true);
      let res = await GetRequest("getPendingCandidate");
      console.log(res);
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
        name: "City",
        selector: "location_of_work",
        sortable: true,
        cell: (row) =>
          row["location_of_work"] === "" ? "NA" : row["location_of_work"].toString(),
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
          cell: (row) => (
            <button className="btn btn-grad" onClick={()=>ActivateRegistration(row["_id"])}>Active</button>
        )
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
          </>
        ),
      },
    ];

    const ActivateRegistration = async(id) => {
        let res = await PutRequest("activateCandidateAccount/" + id)
        if (res.status === 200) {
            swal({
                title: "Success",
                text: res.message,
                icon: "success",
              }).then(function (isConfirm) {
                if (isConfirm) {
                    fetchPosts();
                }
              });
        } else {
            swal("Error", res.message, "error")
        }
    }

    return (
        <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="Pending Registration" buttonComponent="" />
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
          
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default PendingRegistration
