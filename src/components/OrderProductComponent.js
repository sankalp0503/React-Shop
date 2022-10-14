import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const OrderProductComponent = () => {
  
  
  const { userId ,categoryName,categoryId } = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getProductByCategoryId(categoryId).then((response) =>{
      setProducts(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
  


   const addProduct =(productId) => {
    window.location.href = "/place-product/"+userId+'/'+categoryName+'/'+categoryId+'/'+productId;
  }

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/order-category/"+userId;
  }


    return (
        <div>
          
      <div className = "container">
        <br /><br />
        <h2 className="text-center" > {categoryName}</h2>
        <button className ="btn btn-info" onClick ={ (e) => back(e) } style = {{marginLeft: "10px"}} > Back</button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Description</th>
                <th>Available Quantity</th>
                <th>Price</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {  products.map(
                     product =>
                 <tr key = {product.id}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    
                    <td>
                      <button className ="btn btn-info" onClick ={ () => addProduct(product.id)} > Add</button>
                      
                    </td>

                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    )
}

export default OrderProductComponent