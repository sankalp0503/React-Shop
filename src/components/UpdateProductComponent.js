import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const UpdateProductComponent = () => {
    const [productName, setProductName] = useState(" ");
    const [brand, setBrand] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [quantity, setQuanity] = useState(" ");
    const [price, setPrice] = useState(" ");
  const{ categoryId,productId} = useParams();
  
  console.log("u",categoryId)
  console.log("a",productId)

  
  const UpdateProduct = (e) => {
  e.preventDefault();
    const product = { productName, brand, description, quantity , price };
     UserService.updateProduct(categoryId , productId ,product).then((response) => {

      window.location.href = "/product/"+categoryId;
      
     }).catch((error) => {
        console.log(error);
     })
    
  };

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/product/"+categoryId;
  }

 
  useEffect(() => {
    UserService.getProductByProductId(productId)
      .then((response) => {
        setProductName(response.data[0].productName);
        setBrand(response.data[0].brand);
        setDescription(response.data[0].description);
        setQuanity(response.data[0].quantity);
        setPrice(response.data[0].price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

 

  return (
    <div>
      <br></br>
      
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center"> Update Product </h2>
            <div className=" card-body">
              <form>
              <div className="form-group mb-2">
                  <label className="form-label"> Product Name : </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    className="form-control"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Brand : </label>
                  <input
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    className="form-control"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Description : </label>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Quantity : </label>
                  <input
                    type="text"
                    placeholder="Quantity"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuanity(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Price : </label>
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => UpdateProduct(e)}
                >
                  Save
                </button>
                <button 
                className="btn btn-danger"
                onClick={(e) =>cancel(e)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductComponent;
