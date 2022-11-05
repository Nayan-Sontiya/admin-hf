import React, { useState, useEffect } from "react";
import {
  closeModalProfile,
  displayModal,
  GetRequest,
  PostRequest,
} from "../ApiHandler/ApiHandler";
import Heading from "../Common/Heading";
import Modal from "../Common/Modal";
import SideNav from "../Common/SideNav";
import "../../assets/App css/Home.css"
function ContactDetails() {
  let [data, setData] = useState("");
  let [contact, setContact] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  useEffect(() => {
    GetContactDetails();
  }, []);
  useEffect(() => {
    if (data !=="") {
      setAddress(data.address);
      setEmail(data.email);
      setContact(data.contact);
    }
  }, [data]);
  const GetContactDetails = async () => {
    let resp = await GetRequest("getHospitalityContact");
    if (resp.status === 200) {
      setData(resp.data);
    } else {
      setData();
    }
  };
  const AddContactDetails = async () => {
    let item = {
      contact: contact,
      email: email,
      address: address,
    };
    let resp = await PostRequest("addHospitalityContact", item);
    if (resp.status === 200) {
      setData(resp.data);
      closeModalProfile("updateContactDetailsModal");
      closeModalProfile("addContactDetailsModal");
    } else {
      setData([]);
      closeModalProfile("updateContactDetailsModal");
      closeModalProfile("addContactDetailsModal");
    }
  };
  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading
            headingText="Contact Details"
            buttonComponent={
              data  !== "" ? (
                <button
                  onClick={() => displayModal("updateContactDetailsModal")}
                  className=" btn btn-grad "
                >
                  Update Contact
                </button>
              ) : (
                <button
                  onClick={() => displayModal("addContactDetailsModal")}
                  className="btn btn-grad"
                >
                  Add Contact
                </button>
              )
            }
          />
          <div className="row flex-row">
            <div className="col-xl-12">
              <div className="widget has-shadow" id="manageRestaurant">
                <div className="widget-body positionRelative p-0">
                  <div className="row col-12 p-0 m-0 text-dark pt-2 pb-2">
                    <div className="form-group col-6 mt-3 mb-3">
                      <label className="">Contact</label>
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        value={data !=="" ? data.contact : ""}
                      />{" "}
                    </div>
                    <div className="form-group col-6 mt-3 mb-3">
                      <label className="">Email</label>
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        value={data !==""  ? data.email : ""}

                        // value={data[0].email}
                      />{" "}
                    </div>
                    <div className="form-group col-12 mt-3 mb-3">
                      <label className="">Address</label>
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        value={data !==""  ? data.address : ""}

                        // value={data[0].address}
                      />{" "}
                    </div>
                  </div>

                  <Modal
                    modalId="addContactDetailsModal"
                    ModalHeading="Add Contact Details"
                    ModalBody={
                      <div className="col-10 text-dark pt-2 pb-2">
                        <div className="form-group mt-3 mb-3">
                          <label className="">Contact</label>
                          <input
                            type="text"
                            placeholder="Enter your contact number"
                            maxLength="14"
                            className="form-control"
                            onChange={(e) => setContact(e.target.value)}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ))
                            }
                          />{" "}
                        </div>
                        <div className="form-group mt-3 mb-3">
                          <label className="">Email</label>
                          <input
                            type="text"
                            placeholder="Enter your email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                          />{" "}
                        </div>
                        <div className="form-group mt-3 mb-3">
                          <label className="">Address</label>
                          <input
                            type="text"
                            placeholder="Enter your address"
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                          />{" "}
                        </div>
                      </div>
                    }
                    SubmitButton={AddContactDetails}
                    ModalType=""
                  />

                  <Modal
                    modalId="updateContactDetailsModal"
                    ModalHeading="Add Contact Details"
                    ModalBody={
                      <div className="col-10 text-dark pt-2 pb-2">
                        <div className="form-group mt-3 mb-3">
                          <label className="">Contact</label>
                          <input
                            type="text"
                            placeholder="Enter your contact number"
                            maxLength="14"
                            className="form-control"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            onInput={(e) =>
                              (e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ))
                            }
                          />{" "}
                        </div>
                        <div className="form-group mt-3 mb-3">
                          <label className="">Email</label>
                          <input
                            type="text"
                            placeholder="Enter your email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />{" "}
                        </div>
                        <div className="form-group mt-3 mb-3">
                          <label className="">Address</label>
                          <input
                            type="text"
                            placeholder="Enter your address"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />{" "}
                        </div>
                      </div>
                    }
                    SubmitButton={AddContactDetails}
                    ModalType=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
