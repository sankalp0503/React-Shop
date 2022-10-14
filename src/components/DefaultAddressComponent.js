import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const DefaultAddressComponent = () => {
  const { userId } = useParams();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    UserService.getDefaultAddress(userId)
      .then((response) => {
        setAddresses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const back = (e) => {
    e.preventDefault();
    window.location.href = "/address/" + userId;
  };

  const remove = (addressId) => {
    UserService.removeDefaultAddress(addressId).then((response) =>{
        UserService.getDefaultAddress(userId)
        .then((response) => {
          setAddresses(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  
      }).catch(error =>{
        console.log(error);
      })
    
    window.location.href = "/default-address/"+userId;
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-center"> Default Address </h2>

        <button
          className="btn btn-primary mb-2"
          onClick={(e) => back(e)}
          style={{ marginLeft: "10px" }}
        >
          {" "}
          Back{" "}
        </button>

        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Address Id</th>
                <th>Address Line</th>
                <th>City</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td>{address.id}</td>
                  <td>{address.addLine}</td>
                  <td>{address.city}</td>
                  <td>{address.country}</td>
                  <td>{address.postalCode}</td>
                  <td>
                  <button className = "btn btn-danger" onClick ={ () => remove(address.id)}  style = {{marginLeft: "10px"}}> Remove Default </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DefaultAddressComponent;
