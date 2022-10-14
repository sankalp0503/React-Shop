import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const ListAllProductsComponent = () => {
  
  
  const { categoryId } = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getAllProducts().then((response) =>{
      setProducts(response.data)
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
        <h2 className="text-center"> Product List </h2>
       
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

export default ListAllProductsComponent