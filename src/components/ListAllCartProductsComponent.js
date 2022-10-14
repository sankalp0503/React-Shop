import React, { useState, useEffect } from 'react'
import UserService from "../services/UserService";

const ListAllCartProductsComponent = () => {
  
  
 
  const [ products, setProducts] = useState([])


  useEffect( ()  => {
    UserService.getAllCartProducts().then((response) => {
      console.log(response.data)
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
        <h2 className="text-center"> Cart Product List </h2>
        <button className = "btn btn-danger" onClick ={ (e) => back(e)}  style = {{marginLeft: "10px"}}> Back</button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Cart Product Id</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Cart Id</th>
                <th>Demanded Quantity</th>
                <th>Total Price</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                
                
              </tr>
            </thead>
            <tbody>
              {  products.map(
                     product =>
                 <tr key = {product.cartProductId}>
                    <td>{product.cartProductId}</td>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.category}</td>
                    <td>{product.cartId}</td>
                    <td>{product.reqQuantity}</td>
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

export default ListAllCartProductsComponent