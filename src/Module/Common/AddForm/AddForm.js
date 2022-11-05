import React from 'react';

const AddForm = ({Label , setFormValue , placeholder , submitButton , type}) => {
    return (
        <div>
            <h5 className='pl-4 pt-4'>Add {Label} Form</h5>
            <hr />
            <div className='row d-flex justify-content-center mt-4 mb-5'>
                <div className='col-6'>
                    <div className="form-group row mt-4">
                        <label className="col-form-label text-dark"><h5>{Label}</h5></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control"
                                onChange={(e) => setFormValue(e.target.value)} 
                                placeholder={placeholder} value={type} />
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <div className='col-12 text-center '>  <button className='btn btn-grad' onClick={()=> submitButton()}  >Add</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddForm;