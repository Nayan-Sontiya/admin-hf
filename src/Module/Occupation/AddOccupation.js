import React from 'react';
import SideNav from "../Common/SideNav";
import Heading from '../Common/Heading';
import AddForm from '../Common/AddForm/AddForm';
import { PostRequest } from './../ApiHandler/ApiHandler';
import { useState } from 'react';
import swal from 'sweetalert';
const AddOccupation = () => {
    let [type, setType] = useState('');

    async function addCategory() {
        if (type !== '') {
            let item = { type }
            let resp = await PostRequest("addOccupation", item);
            if (resp.status === 200) {
                swal({
                    title: 'Success',
                    text: 'Occupation added successfully!',
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
            setType('')
        } else {
            swal({
                title: 'Error',
                text: 'Occupation field can not be empty!',
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
                    <Heading headingText="Add Occupation" buttonComponent='' />
                    <div className="row flex-row">
                        <div className="col-xl-12">
                            <div className="widget has-shadow" id="manageRestaurant">
                                <div className="widget-body positionRelative p-0">
                                    <AddForm Label='Occupation' type={type} setFormValue={setType} placeholder='Enter Occupation' submitButton={addCategory} />
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