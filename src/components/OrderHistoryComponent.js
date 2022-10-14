import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const OrderHistoryComponent = () => {
  
  
  const { userId } = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getOrderHistory(userId).then((response) =>{
      setProducts(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
  


  const back =(e) => {
    window.location.href = "/users/";
  }


    return (
        <div>
          
      <div className = "container">
        <h2 className="text-center"> Orders History </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} > Back </button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Order Id</th>
                 <th>Created Date</th>
                <th>Updated Date</th>
                
              </tr>
            </thead>
            <tbody>
              {  products.map(
                     product =>
                 <tr key = {product.id}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.reqQuantity}</td>
                    <td>{product.totalPrice}</td>
                    <td>{product.orderId}</td>
                    <td>{product.created}</td>
                    <td>{product.modified}</td>


                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    )
}

export default OrderHistoryComponent