import React, { useState, useEffect } from 'react'
import UserService from "../services/UserService";

const ListAllAddressComponent = () => {
  
  
  const [ addresses, setAddresses] = useState([])


  useEffect( ()  => {
    UserService.getAllAddress().then((response) =>{
      setAddresses(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
  


  

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/home";
  }


    return (
        <div>
          
      <div className = "container">
        <h2 className="text-center"> Address List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                
                <th>Address Line</th>
                <th>City</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                
              </tr>
            </thead>
            <tbody>
              {  addresses.map(
                     address =>
                 <tr key = {address.id}>
                
                    <td>{address.addLine}</td>
                    <td>{address.city}</td>
                    <td>{address.country}</td>
                    <td>{address.postalCode}</td>
                    <td>{address.created}</td>
                    <td>{address.modified}</td>
                    

                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    )
}

export default ListAllAddressComponent