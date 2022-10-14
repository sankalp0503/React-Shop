import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const ListCartComponent = () => {
  
  
  const { userId } = useParams();
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getIntoCart(userId).then((response) => {
      console.log(response.data)
      setProducts(response.data)
      console.log(response.data);
  }).catch(error =>{
      console.log(error);
    })
  },  [])
// UserService.getProductsFromCartProductByUserId(userId).then((response) =>{
//   setProducts(response.data)
//   console.log(response.data);
// })

   const placeOrder =(e) => {
    e.preventDefault();
    UserService.placeOrder(userId).then((response) =>{
        UserService.getIntoCart(userId).then((response) => {
          setProducts(response.data)
          console.log(response.data);
        }).catch(error =>{
      console.log(error);
    })
        window.location.href = "/cart/"+userId;
    }).catch((error) => {
        console.log(error);
     })
   
  }
  

  const remove = (cartProductId) =>{
    UserService.deleteProductsFromCartProductByCartProductId(cartProductId).then((response) =>{
      UserService.getProductsFromCartProductByUserId(userId).then((response) =>{
        setProducts(response.data)
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })

    }).catch(error =>{
      console.log(error);
    })
   }

  const removeAll =(userId) => {
    UserService.deleteAllProductsFromCartProductByUserId(userId).then((response) =>{
        UserService.getProductsFromCartProductByUserId(userId).then((response) =>{
            setProducts(response.data)
            console.log(response.data);
          }).catch(error =>{
            console.log(error);
          })
    
        }).catch(error =>{
          console.log(error);
        })
       }  

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/users";
  }


    return (
        <div>
          
      <div className = "container">
        <h2 className="text-center"> Cart List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>placeOrder(e)} > Place Order </button>
        <button className = "btn btn-primary mb-2" onClick={() =>removeAll(userId)} style = {{marginLeft: "10px"}}> Remove All </button>
        <button className = "btn btn-danger" onClick ={ (e) => back(e)}  style = {{marginLeft: "10px"}}> Back</button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Cart Product Id</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Demanded Quantity</th>
                <th>Total Price</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {  products.map(
                     product =>
                 <tr key = {product.cartProductId}>
                    <td>{product.cartProductId}</td>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.reqQuantity}</td>
                    <td>{product.price}</td>
                    <td>{product.created}</td>
                    <td>{product.modified}</td>
                    
                    <td>
                      <button className ="btn btn-info" onClick ={ () => remove(product.cartProductId)} > Remove</button>
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

export default ListCartComponent