import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import {  useParams } from "react-router-dom";


const OrderListComponent = () => {

  const [ users, setUsers] = useState([])
  const{ userId} = useParams();
  
  useEffect( ()  => {
    UserService.getAllOrdersByUserId(userId).then((response) =>{
      setUsers(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
   const cancel = (orderId) =>{
    UserService.cancelOrder(orderId).then((response) =>{
        console.log(response.data);
        UserService.getAllOrdersByUserId(userId).then((response) =>{
            setUsers(response.data)
            console.log(response.data);
          }).catch(error =>{
            console.log(error);
          })
          })
   }



  const check =(orderId) => { 
    console.log("sddfds",orderId);
    window.location.href = "/order-check/"+userId+'/'+orderId;
   }

   const back =(e) => {
    e.preventDefault();
    window.location.href ="/users";
   }

  
    return (
      <div className = "container">
        <h2 className="text-center"> Orders List </h2>
        <button className = "btn btn-danger" onClick ={ (e) => back(e)}  style = {{marginLeft: "10px"}}> Back</button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User Email</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {  users.map(
                     user =>
                 <tr key = {user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.created}</td>
                    <td>{user.modified}</td>
                    <td>
                     
                      <button className = "btn btn-danger" onClick={() =>check(user.id)}  style = {{marginLeft: "10px"}}> Check Order </button>
                      <button className = "btn btn-danger" onClick={() =>cancel(user.id)}  style = {{marginLeft: "10px"}}> Cancel Order</button>
                      
                    </td>
                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
    );
  
}

export default OrderListComponent;
