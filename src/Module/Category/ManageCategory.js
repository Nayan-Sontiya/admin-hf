import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import DataTableComponent from "../Common/DataTableComponent";
import Loader from "../Common/Loader";
import Modal from "../Common/Modal";
import {
  GetRequest,
  displayModal,
  closeModalProfile,
  dateFormator,
  PutRequest,
  DeleteRequest,
} from "../ApiHandler/ApiHandler";
import swal from "sweetalert";
const ManageCategory = () => {
  let [data, setData] = useState([]);
  let [category, setCategory] = useState("");
  let [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    let res = await GetRequest("getCategory/all");

    console.log("rs-cat", res);
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
      name: "Occupation",
      selector: "occupation",
      sortable: true,
      cell: (row) => (row["occupation"] === "" ? "NA" : row["occupation"]),
    },
    {
      name: "Category",
      selector: "category",
      sortable: true,
      cell: (row) => (row["category"] === "" ? "NA" : row["category"]),
    },

    // {
    //   name: "Action",
    //   selector: "",
    //   sortable: true,
    //   cell: (row) => (
    //     <div>
    //       <span className="mr-3" onClick={() => setUpdateData(row)}>
    //         <i className="la la-edit edit m-0 editBtn viewButton"></i>
    //       </span>

    //       <span onClick={() => deleteAsk(row._id)}>
    //         <i className="la la-close delete m-0 deleteBtn viewButton"></i>
    //       </span>
    //     </div>
    //   ),
    // },
  ];
  function deleteAsk(subsId) {
    swal({
      title: "Warning",
      text: "Are You Sure You Want To Delete This Record",
      icon: "warning",
      buttons: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        DeleteOccupation(subsId);
      }
    });
  }
  async function DeleteOccupation(subsId) {
    let resp = await DeleteRequest("deleteCategory/" + subsId);
    console.log("delete", resp);
    if (resp.status === 200) {
      swal({
        title: "Success",
        text: "Category Deleted Successfully!",
        icon: "success",
        buttons: "Ok",
      });
      let updated_arr = data.filter((e) => e._id !== subsId);
      setData(updated_arr);
    } else {
      swal({
        title: "Error",
        text: resp.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  }
  function setUpdateData(details) {
    displayModal("categoryUpdate");
    setCategory(details.category);
    setId(details._id);
  }

  async function updateOccupation() {
    let item = { category };
      let resp = await PutRequest("updateCategory/" + id, item);
      console.log(resp)
    if (resp.status === 200) {
      swal({
        title: "Success",
        text: "Category Updated Successfully!",
        icon: "success",
        buttons: true,
      }).then(function (isConfirm) {
        if (isConfirm) {
          let updated_arr = data.filter((e) => e._id !== id);
          updated_arr.push(resp.data);
          setData(updated_arr);
          closeModalProfile("categoryUpdate");
        }
      });
    } else {
      swal({
        title: "Error",
        text: resp.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  }
  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="View Category" buttonComponent="" />
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
                    modalId="categoryUpdate"
                    ModalHeading="View category"
                    ModalBody={
                      <div className="col-10 text-dark pt-2 pb-2">
                        <div className="form-group mt-3 mb-3">
                          <label className="">Category</label>
                          <input
                            value={category}
                            type="text"
                            placeholder="Enter Occupation"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                          />{" "}
                        </div>
                      </div>
                    }
                    SubmitButton={updateOccupation}
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

export default ManageCategory;
