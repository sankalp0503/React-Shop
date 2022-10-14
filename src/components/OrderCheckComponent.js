import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const OrderCheckComponent = () => {
   
  
  const { userId ,orderId } = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getOrderListByOrderId(orderId).then((response) =>{
        console.log(response.data)
      setProducts(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
  


   const proceed =(e) => {
    e.preventDefault();
    window.location.href = "/order-accepted";
  }

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/order-list/"+userId;
  }


    return (
        <div>
          
      <div className = "container">
        <h2 className="text-center">  Ordered Product List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>proceed(e)} > Proceed  </button>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Category Name</th>
                <th> Quantity</th>
                <th>Price</th>
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
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.categoryName}</td>
                    <td>{product.reqQuantity}</td>
                    <td>{product.totalPrice}</td>
                    <td>{product.created}</td>
                    <td>{product.modified}</td>
                    <th></th>
                    <th></th>
                    

                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    )
}

export default OrderCheckComponent