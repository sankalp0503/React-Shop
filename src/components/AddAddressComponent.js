import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const AddAddressComponent = () => {
  
  const{ userId} = useParams();
  

const [formValue , setFormValue]= useState({addLine:'' , city:'' , country:'',postalCode:''});
const [formError , setFormError]= useState({});
const [issubmit , setSubmit]= useState(false);

const handleAddLineChange =(e)=>{
  setFormValue({...formValue, addLine: e.target.value});
}
const handleCityChange =(e)=>{
  setFormValue({...formValue, city: e.target.value});
}
const handleCountryChange =(e)=>{
  setFormValue({...formValue, country: e.target.value});
}
const handlePostalCodeChange =(e)=>{
  setFormValue({...formValue, postalCode: e.target.value});
}
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validationform(formValue));
    setSubmit(true);
    
    
  };

  const validationform =(value)=>{
    const errors={};
    const postalCodePattern=/^$|[0-9]{6}/

    if(!value.addLine){
      errors.addLine="Please Enter  Address";
    }
    if(!value.city){
      errors.city="Please Enter  City Name";
    }
    if(!value.country){
      errors.country="Please Enter  Country";
    }
    if(!value.postalCode){
      errors.postalCode="Please Enter PostalCode";
    } else if(!postalCodePattern.test(value.postalCode)){
      errors.postalCode="Enter Valid PostalCode"
    }
    return errors;
  }

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/address/"+userId;
  }

  useEffect( (value)=> {
    if(Object.keys(formError).length===0 && issubmit)
    {
      const address ={addLine:formValue.addLine,
                       city:formValue.city,
                      country:formValue.country,
                      postalCode:formValue.postalCode};
      console.log(address)
      UserService.createAddress(userId , address)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/address/"+userId;
        
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
  },[formError,formValue,issubmit])

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center"> Add Address </h2>
            <div className=" card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Add Line : </label>
                  <input
                    type="text"
                    placeholder="Add Line"
                    name="addLine"
                    className="form-control"
                    value={formValue.addLine}
                    onChange={ handleAddLineChange }
                  ></input>
                  <span className="text-danger">{formError.addLine}</span>
                </div>
      
                <div className="form-group mb-2">
                  <label className="form-label"> City : </label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="form-control"
                    value={formValue.city}
                    onChange={ handleCityChange }
                  ></input>
                  <span className="text-danger">{formError.city}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Country : </label>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    className="form-control"
                    value={formValue.country}
                    onChange={ handleCountryChange }
                  ></input>
                  <span className="text-danger">{formError.country}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Postal Code : </label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    name="postalCode"
                    className="form-control"
                    value={formValue.postalCode}
                    onChange={ handlePostalCodeChange }
                  ></input>
                  <span className="text-danger">{formError.postalCode}</span>
                </div>
                

                <button
                  className="btn btn-success"
                  name="button"
                >
                  Submit
                </button>
                <button 
                className="btn btn-danger"
                onClick={(e) =>cancel(e)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressComponent;
