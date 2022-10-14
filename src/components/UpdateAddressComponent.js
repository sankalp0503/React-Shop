import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const UpdateAddressComponent = () => {
  const [addLine, setAddLine] = useState(" ");
  const [city, setCity] = useState(" ");
  const [country, setCountry] = useState(" ");
  const [postalCode, setPostalCode] = useState(" ");
  const{ userId,addressId} = useParams();
  
  console.log("u",userId)
  console.log("a",addressId)
  

  
  const UpdateAddress = (e) => {
    e.preventDefault();
    const address = { addLine, city, country, postalCode };
     UserService.updateAddress(userId , addressId ,address).then((response) => {

      window.location.href = "/address/"+userId;
      
     }).catch((error) => {
        console.log(error);
     })
    
  };

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/address/"+userId;
  }


  useEffect(() => {
    UserService.getAddressByAddressId(addressId)
      .then((response) => {
        console.log(response)
        setAddLine(response.data.addLine);
        setCity(response.data.city);
        setCountry(response.data.country);
        setPostalCode(response.data.postalCode);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

 

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center"> Update Address </h2>
            <div className=" card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Add Line : </label>
                  <input
                    type="text"
                    placeholder="Add Line"
                    name="addLine"
                    className="form-control"
                    value={addLine}
                    onChange={(e) => setAddLine(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> City : </label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Country : </label>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Postal Code : </label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    name="postalCode"
                    className="form-control"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => UpdateAddress(e)}
                >
                  Save
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

export default UpdateAddressComponent;
