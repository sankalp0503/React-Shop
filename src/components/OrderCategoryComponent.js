import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import {  useParams } from "react-router-dom";



const OrderCategoryComponent = () => {

  const [ categories, setCategories] = useState([])
  const{ userId } = useParams();

  useEffect( ()  => {
    UserService.getAllCategory().then((response) =>{
      setCategories(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
  

  const products =(categoryName ,categoryId) => {
    window.location.href = "/order-product/"+userId+'/'+categoryName+'/'+categoryId;
  }

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/users";
  }

  
    return (
      <div className = "container">
        <h2 className="text-center"> Categories List </h2>
        <button className ="btn btn-info" onClick ={ (e) => back(e) } style = {{marginLeft: "10px"}} > Back</button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {  categories.map(
                     category =>
                 <tr key = {category.id}>
                    <td>{category.id}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.description}</td>
                    
                    <td>
                     
                      <button className = "btn btn-danger" onClick={() =>products(category.categoryName ,category.id)}  style = {{marginLeft: "10px"}}> Products </button>
                      
                    </td>
                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
    );
  
}

export default OrderCategoryComponent;
