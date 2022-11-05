import React, { useState, useEffect } from 'react';
import SideNav from "../Common/SideNav";
import Heading from '../Common/Heading';
import DataTableComponent from "../Common/DataTableComponent";
import Loader from '../Common/Loader';
import Modal from '../Common/Modal';
import {
    GetRequest,
    displayModal,
    PutRequest,
    dateFormator,
    closeModalProfile,
    DeleteRequest
} from "../ApiHandler/ApiHandler";
import swal from 'sweetalert';
const AddOccupation = () => {
    let [data, setData] = useState([]);
    let [type, setType] = useState('');
    let [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        setLoading(true);
        let res = await GetRequest("getOccupations/all");

        if (res.status === 200 ) {
            setData(res.data);
        } else {
            alert(res.message)
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
            selector: "type",
            sortable: true,
            cell: (row) => (row["type"] === "" ? "NA" : row["type"]),
        },
        {
            name: "Date",
            selector: "createdAt",
            sortable: true,
            cell: (row) => (row["createdAt"] === "" ? "NA" : dateFormator(row["createdAt"])),
        },
        // {
        //     name: "Action",
        //     selector: "",
        //     sortable: true,
        //     cell: (row) => (
        //         <div>
        //             <span className="mr-3" onClick={() => setUpdateData(row)}>
        //                 <i className="la la-edit edit m-0 editBtn viewButton"></i>
        //             </span>

        //             <span onClick={() => deleteAsk(row._id)}>
        //                 <i className="la la-close delete m-0 deleteBtn viewButton"></i>
        //             </span>
        //         </div>
        //     ),
        // },
    ]

    function setUpdateData(details) {
        displayModal("occupationUpdate");
        setType(details.type)
        setId(details._id)
    }

    async function updateOccupation() {
        let item = { type }
        let resp = await PutRequest(
            "updateOccupation/" + id, item);
        if (resp.status === 200) {
            swal({
                title: 'Success',
                text: 'Occupation Updated Successfully!',
                icon: 'success',
                buttons: 'Ok',
            })
            let updated_arr = data.filter((e) => e._id !== id);
            updated_arr.push(resp.data);
            setData(updated_arr);
            closeModalProfile('occupationUpdate')
        } else {
            swal({
                title: 'Error',
                text: resp.message,
                icon: 'error',
                buttons: 'Ok',
            })
        }

    }
    function deleteAsk(subsId){
        swal({
            title: 'Warning',
            text: 'Are You Sure You Want To Delete This Record',
            icon: 'warning',
            buttons: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                DeleteOccupation(subsId)
            }
        })
    }
    async function DeleteOccupation(subsId) {
        let resp = await DeleteRequest("deleteOccupation/" + subsId);
        if (resp.status ===  200) {
            swal({
                title: 'Success',
                text: 'Occupation Deleted Successfully!',
                icon: 'success',
                buttons: 'Ok',
            })
    
            let updated_arr = data.filter((e) => e._id !== subsId);
            setData(updated_arr);
            closeModalProfile('occupationUpdate')
        } else {
            swal({
                title: 'Error',
                text: resp.message,
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
                    <Heading headingText="View Occupation" buttonComponent='' />
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
                                        modalId="occupationUpdate"
                                        ModalHeading="View Occupation"
                                        ModalBody={
                                            <div className="col-10 text-dark pt-2 pb-2">
                                                <div className="form-group mt-3 mb-3">
                                                    <label className="">Occupation</label>
                                                    <input
                                                        value={type}
                                                        type="text"
                                                        placeholder='Enter Occupation'
                                                        className="form-control"
                                                        onChange={(e) => setType(e.target.value)}
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

export default AddOccupation;