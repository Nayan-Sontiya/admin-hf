import React, { useState, useEffect } from 'react';
import SideNav from "../Common/SideNav";
import Heading from '../Common/Heading';
import DataTableComponent from "../Common/DataTableComponent";
import Loader from '../Common/Loader';
import Modal from '../Common/Modal';
import {
    GetRequest,
    displayModal,
    closeModalProfile,
    PutRequest,
} from "../ApiHandler/ApiHandler";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
const ManagePackage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [no_of_resumes, setNo_of_resumes] = useState('');
    const [validity, setValidity] = useState('');
    const [packageId, setPackageId] =useState("")
    let history = useHistory();

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        setLoading(true);
        let res = await GetRequest("getPackages");
        console.log(res)
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
            name: "Package Name",
            selector: "name",
            sortable: true,
            cell: (row) => (row["name"] === "" ? "NA" : row["name"]),
        },
        {
            name: "No of Resumes",
            selector: "no_of_resumes",
            sortable: true,
            cell: (row) => (row["no_of_resumes"] === "" ? "NA" : (row["no_of_resumes"])),
        },
        {
            name: "Package Price",
            selector: "price",
            sortable: true,
            cell: (row) => (row["price"] === "" ? "NA" : '₹' + row["price"]),
        },
        {
            name: "Validity",
            selector: "validity",
            sortable: true,
            cell: (row) => (row["validity"] === "" ? "NA" : (row["validity"])),
        },
        {
            name: "Action",
            selector: "",
            sortable: true,
            cell: (row) => (

                <i className="la la-edit edit m-0 editBtn viewButton"
                    onClick={() => openUpdateModal(row)}
                ></i>

            ),
        },

    ]
    const openUpdateModal = (details) => {
        displayModal("updatePackage")
        setName(details.name);
        setPrice(details.price);
        setNo_of_resumes(details.no_of_resumes);
        setValidity(details.validity);
        setPackageId(details._id);
    }
    const updatePlan = async () => {
        if (name !== '' && price !== '' && no_of_resumes !== '' && validity !== '') {
            let item = { name, price, no_of_resumes, validity }
            let resp = await PutRequest("editPackage/"+packageId, item);
            if (resp.status === 200) {
                swal({
                    title: 'Success',
                    text: 'Package updated successfully!',
                    icon: 'success',
                    buttons: 'Ok',
                })
                closeModalProfile("updatePackage")
                history.push('/view-package');
            } else {
                swal({
                    title: 'Error',
                    text: 'Something went wrong!',
                    icon: 'error',
                    button: 'Ok',
                })
                closeModalProfile("updatePackage")

            }

        } else {
            swal({
                title: 'Error',
                text: 'All field are compulsory!',
                icon: 'error',
                buttons: 'Ok',
            })
        }
    }

    return (
        <div className="page-content d-flex align-items-stretch">
            <div className="default-sidebar">
                <SideNav />
            </div>
            <div className="content-inner">
                <div className="container-fluid bgBlue">
                    <Heading headingText="View Packages" buttonComponent='' />
                    <div className="row flex-row">
                        <div className="col-xl-12">
                            <div className="widget has-shadow" id="manageRestaurant">
                                <div className="widget-body positionRelative p-0">
                                    {loading ? (
                                        <div className="loader">
                                            <Loader
                                                size={40}
                                                className="loader"
                                                color="#5d5386"
                                            />
                                        </div>
                                    ) : (
                                            <div style={{ display: "none" }}></div>
                                        )}

                                    <DataTableComponent columns={columns} data={data} />
                                    <Modal
                                        modalId="updatePackage"
                                        ModalHeading="Update Package Details"
                                        ModalBody={
                                            <div className="col-10 text-dark pt-2 pb-2">
                                                <div className="form-group mt-3 mb-3">
                                                    <label className="">Package Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder=''
                                                        className="form-control"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />{" "}
                                                </div>
                                                <div className="form-group mt-3 mb-3">
                                                    <label className="">Number of Resume</label>
                                                    <input
                                                        type="text"
                                                        placeholder=''
                                                        className="form-control"
                                                        value={no_of_resumes}
                                                        onChange={(e) => setNo_of_resumes(e.target.value)}
                                                    />{" "}
                                                </div>
                                                <div className="form-group mt-3 mb-3">
                                                    <label className="">Package Price</label>
                                                    <input
                                                        type="text"
                                                        placeholder=''
                                                        className="form-control"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />{" "}
                                                </div>
                                                <div className="form-group mt-3 mb-3">
                                                    <label className="">Validity</label>
                                                    <input
                                                        type="text"
                                                        placeholder=''
                                                        className="form-control"
                                                        value={validity}
                                                        onChange={(e) => setValidity(e.target.value)}
                                                    />{" "}
                                                </div>
                                            </div>
                                        }
                                        ModalType="update"
                                        SubmitButton={updatePlan}
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

export default ManagePackage;