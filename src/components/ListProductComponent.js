import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const ListProductComponent = () => {
  
  
  const { categoryId } = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getProductByCategoryId(categoryId).then((response) =>{
      setProducts(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
  const deleteProduct = (productId) =>{
    UserService.deleteProduct(productId).then((response) =>{
      UserService.getProductByCategoryId(categoryId).then((response) =>{
        setProducts(response.data)
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })

    }).catch(error =>{
      console.log(error);
    })
   }


   const addProduct =(e) => {
    e.preventDefault();
    window.location.href = "/add-product/"+categoryId;
  }

  const updateProduct =(productId) => {
    window.location.href = "/edit-product/"+categoryId+'/'+productId;
  }

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/category";
  }


    return (
        <div>
          
      <div className = "container">
        <h2 className="text-center"> Product List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>addProduct(e)} > Add Product </button>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
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
                <th>Created Date</th>
                <th>Updated Date</th>
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
                    <td>{product.created_date}</td>
                    <td>{product.modified_date}</td>
                    
                    <td>
                      <button className ="btn btn-info" onClick ={ () => updateProduct(product.id)} > Update</button>
                      <button className = "btn btn-danger" onClick ={ () => deleteProduct(product.id)}  style = {{marginLeft: "10px"}}> Delete </button>
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

export default ListProductComponent