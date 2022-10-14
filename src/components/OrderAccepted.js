import React from "react";
import UserService from "../services/UserService";



const OrderAccepted = () => {
    const back =(e) => {
        e.preventDefault();
        window.location.href = "/users";
      }
  
    return (
      <div className = "HomePage-container">
 <br/> <br />
        <br/> <br />
        <h2 className="text-center "> Your Order Is Accepted !!! </h2>
        <br/> <br />
        <br/> <br />
        <br/> <br />
        <h2 className="text-center "> ....... ThankYou ...... </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
      </div>
    );
  
}

export default OrderAccepted;
