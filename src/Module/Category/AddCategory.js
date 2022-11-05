import React from 'react';
import SideNav from "../Common/SideNav";
import Heading from '../Common/Heading';
import swal from 'sweetalert';
import { PostRequest, GetRequest } from './../ApiHandler/ApiHandler';
import { useState, useEffect } from 'react';
const AddCategory = () => {
    let [category, setCategory] = useState('');
    let [occupationData, setOccupationData] = useState([]);
    let [occupationId, setOccupationId] = useState('');
    useEffect(() => {
        getCategoryList()
    }, [])

    async function getCategoryList() {
        let res = await GetRequest("getOccupations/all");
        if (res.status===200) {
            setOccupationData(res.data);
        } else {
            setOccupationData([]);
        }
    }

    async function addCategory() {
        if (category !== '') {
            let item = { occupationId, category }
            let resp = await PostRequest("addCategory", item);
            if (resp.status === 200) {
                swal({
                    title: 'Success',
                    text: 'Category added successfully!',
                    icon: 'success',
                    button: 'Ok',
                })
            } else {
        
                swal({
                    title: 'Error',
                    text: 'Something went wrong!',
                    icon: 'error',
                    button: 'Ok',
                })
            }
            setCategory('');
        } else {
            swal({
                title: 'Error',
                text: 'Category field can not be empty!',
                icon: 'error',
                button: 'Ok',
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
                    <Heading headingText="Add Category" buttonComponent='' />
                    <div className="row flex-row">
                        <div className="col-xl-12">
                            <div className="widget has-shadow" id="manageRestaurant">
                                <div className="widget-body positionRelative p-0">
                                    <div className='row d-flex justify-content-center mt-4 mb-5'>
                                        <div className='col-7'>
                                            <div className="form-group row mt-4">
                                                 <label className="col-sm-3 col-form-label text-dark text-md-right"><h6>Type Of Employment</h6></label>
                                                <div className="col-sm-7">
                                                    <select className="form-control" onChange={(e) => setOccupationId(e.target.value)}>
                                                        <option disabled selected>Select Type Of Employment</option>
                                                        {
                                                            occupationData.length !== 0
                                                                ?
                                                                occupationData.map((categoryVal, i) => {
                                                                    return <option value={categoryVal._id}>{categoryVal.type}</option>
                                                                })

                                                                :
                                                                <option>No Type Of Employment Added </option>
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row mt-4">
                                                 <label className="col-sm-3 col-form-label text-dark text-md-right"><h6>Category</h6></label>
                                                <div className="col-sm-7">
                                                    <input type="text" className="form-control"
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        placeholder='Category' value={category} />
                                                </div>
                                            </div>
                                            <div className="form-group row mt-4">
                                                <div className='col-12 text-center '>  <button className='btn btn-grad' onClick={() => addCategory()}  >Add</button></div>
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

export default AddCategory;