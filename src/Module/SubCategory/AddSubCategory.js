import React, { useState , useEffect} from 'react';
import SideNav from "../Common/SideNav";
import Heading from '../Common/Heading';
import { PostRequest , GetRequest} from './../ApiHandler/ApiHandler';
import swal from 'sweetalert';

const AddSubCategory = () => {
    let [categoryId, setCategoryId] = useState('');
    let [subcategory, setSubcategory] = useState('');
let [categoryData , setCategoryData] = useState([]);

useEffect(()=>{
    getCategoryList()
},[])

async function getCategoryList() {
    let res = await GetRequest("getCategory/all");
    if (res.status === 200) {
        setCategoryData(res.data);
    } else {
        setCategoryData([]);
    }
}
    async function addSubCategory() {
        if (categoryId !== '' && subcategory !=='') {
            let item = { categoryId, subcategory }
            let resp = await PostRequest("addSubCategory", item);
            if (resp.status === 200) {
                swal({
                    title: 'Success',
                    text: 'Sub Category added successfully!',
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
            setSubcategory('');
        } else {
            swal({
                title: 'Error',
                text: 'Both field are compulsory!',
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
                    <Heading headingText="Add Sub Category" buttonComponent='' />
                    <div className="row flex-row">
                        <div className="col-xl-12">
                            <div className="widget has-shadow" id="manageRestaurant">
                                <div className="widget-body positionRelative p-0">
                                    <div>
                                        <h5 className='pl-4 pt-4'>Add Sub category Form</h5>
                                        <hr />
                                        <div className='row d-flex justify-content-center mt-4 mb-5'>
                                            <div className='col-7'>
                                            <div className="form-group row mt-4">
                                                    <label className="col-sm-3 col-form-label text-dark text-md-right"><h6>Category</h6></label>
                                                    <div className="col-sm-7">
                                                       <select className="form-control" onChange={(e)=> setCategoryId(e.target.value)}>
                                                           <option disabled selected>Select Category</option>
                                                           {
                                                            categoryData.length !== 0
                                                            ?
                                                            categoryData.map((categoryVal , i)=>{
                                                                return <option value={categoryVal._id}>{categoryVal.category}</option>
                                                            })
                                                            
                                                            :
                                                            <option>No Category Added </option>
                                                           }
                                                       </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row mt-4">
                                                     <label className="col-sm-3 col-form-label text-dark text-md-right"><h6>Sub category</h6></label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control"
                                                            onChange={(e) => setSubcategory(e.target.value)}
                                                            placeholder='Sub category' value={subcategory} />
                                                    </div>
                                                </div>
                                                <div className="form-group row mt-4">
                                                    <div className='col-12 text-center '>  <button className='btn btn-grad' onClick={() => addSubCategory()}  >Add</button></div>
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

export default AddSubCategory;