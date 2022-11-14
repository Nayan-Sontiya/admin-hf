import React, { useState } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import { PostRequest } from "./../ApiHandler/ApiHandler";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const AddPackage = () => {
  let history = useHistory();
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [no_of_resumes, setNo_of_resumes] = useState("");
  let [validity, setValidity] = useState("");
  function isNegativeNumber(str) {
    str = str.trim();
    if (!str) {
      return false;
    }
    str = str.replace(/^0+/, "");
    var n = Number(str);
    return !(n !== Infinity && String(n) === str && n >= 0);
  }
  async function addSubCategory() {
    if (
      isNegativeNumber(price) ||
      isNegativeNumber(validity) ||
      isNegativeNumber(no_of_resumes)
    ) {
      return;
    }
    if (
      name !== "" &&
      price !== "" &&
      no_of_resumes !== "" &&
      validity !== ""
    ) {
      let item = { name, price, no_of_resumes, validity };
      let resp = await PostRequest("addPackage", item);
      if (resp.status === 200) {
        swal({
          title: "Success",
          text: "Package added successfully!",
          icon: "success",
          buttons: "Ok",
        });
        history.push("/view-package");
      } else {
        swal({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
          button: "Ok",
        });
      }
    } else {
      swal({
        title: "Error",
        text: "All field are compulsory!",
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
          <Heading headingText="Add Packages" buttonComponent="" />
          <div className="row flex-row">
            <div className="col-xl-12">
              <div className="widget has-shadow" id="manageRestaurant">
                <div className="widget-body positionRelative p-0">
                  <div>
                    <h5 className="pl-4 pt-4">Add Packages Form</h5>
                    <hr />
                    <div className="row d-flex justify-content-center mt-4 mb-5">
                      <div className="col-7">
                        <div className="form-group row mt-4">
                          <label className="col-sm-3 col-form-label text-dark text-md-right">
                            <h6>Package Name</h6>
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Package Name"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-3 col-form-label text-dark text-md-right">
                            <h6>Number of Resume</h6>
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="number"
                              min="0"
                              className="form-control"
                              onChange={(e) => setNo_of_resumes(e.target.value)}
                              placeholder="Number of Resume"
                            />
                            {isNegativeNumber(no_of_resumes) && (
                              <p className="my-2 text-danger">
                                Only positive numbers allowed
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-3 col-form-label text-dark text-md-right">
                            <h6>Package Price</h6>
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="number"
                              min="0"
                              className="form-control"
                              onChange={(e) => setPrice(e.target.value)}
                              placeholder="Package Price"
                            />
                            {isNegativeNumber(price) && (
                              <p className="my-2 text-danger">
                                Only positive numbers allowed
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-3 col-form-label text-dark text-md-right">
                            <h6>Validity</h6>
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="number"
                              min="0"
                              className="form-control"
                              onChange={(e) => setValidity(e.target.value)}
                              placeholder="Validity"
                            />
                            {isNegativeNumber(validity) && (
                              <p className="my-2 text-danger">
                                Only positive numbers allowed
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <div className="col-12 text-center ">
                            {" "}
                            <button
                              className="btn btn-grad"
                              onClick={addSubCategory}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AddPackage;
