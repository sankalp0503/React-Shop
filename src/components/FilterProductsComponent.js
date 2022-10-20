import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const FilterProductsComponent = () => {
  
  
  const { keyword} = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getFilterProducts(keyword).then((response) =>{
      setProducts(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/all-products";
  }


    return (
        <div>
          
      <div className = "container">
        <h2 className="text-center"> Filtered Product List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Available Quantity</th>
                <th>Price</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {  products.map(
                     product =>
                 <tr key = {product.id}>
                    <td>{product.productName}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.created_date}</td>
                    <td>{product.modified_date}</td>
                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    )
}

export default FilterProductsComponent