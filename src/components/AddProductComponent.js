import React, { useState , useEffect } from "react";
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";

const AddProductComponent = () => {
  // const [productName, setProductName] = useState(" ");
  // const [brand, setBrand] = useState(" ");
  // const [description, setDescription] = useState(" ");
  // const [quantity, setQuanity] = useState(" ");
  // const [price, setPrice] = useState(" ");
  const{ categoryId} = useParams();
  

  const [formValue , setFormValue]= useState({productName:'' , brand:'' , description:'', quantity:'', price:''});
  const [formError , setFormError]= useState({});
  const [issubmit , setSubmit]= useState(false);
  
  const handleProductNameChange =(e)=>{
    setFormValue({...formValue, productName: e.target.value});
  }
  const handleBrandChange =(e)=>{
    setFormValue({...formValue, brand: e.target.value});
  }
  const handleDescriptionChange =(e)=>{
    setFormValue({...formValue, description: e.target.value});
  }
  const handleQuantityChange =(e)=>{
    setFormValue({...formValue, quantity: e.target.value});
  }
  const handlePriceChange =(e)=>{
    setFormValue({...formValue, price: e.target.value});
  }
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormError(validationform(formValue));
      setSubmit(true);
      
    };
  
    const validationform =(value)=>{
      const errors={};
      
  
      if(!value.productName){
        errors.productName="Please Enter ProductName";
      }
      if(!value.brand){
        errors.brand="Please Enter Brand";
      }
      if(!value.description){
        errors.description="Please Enter Description";
      }
      if(!value.quantity){
        errors.quantity="Please Enter Quantity";
      }
      if(!value.price){
        errors.price="Please Enter Price";
      }
      
      return errors;
    }

  
  // const saveProduct = (e) => {
  //   e.preventDefault();
  //   const product = { productName, brand, description, quantity , price };
  //   UserService.createProduct(categoryId , product)
  //     .then((response) => {
  //       console.log(response.data);
  //       window.location.href = "/product/"+categoryId;
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
    
  // };

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/product/"+categoryId;
  }


  useEffect( (value)=> {
    if(Object.keys(formError).length===0 && issubmit)
    {
      const product ={productName:formValue.productName,
                       brand:formValue.brand,
                       description:formValue.description,
                       quantity:formValue.quantity,
                       price:formValue.price
                  };
                  UserService.createProduct(categoryId , product)
                  .then((response) => {
                    console.log(response.data);
                    window.location.href = "/product/"+categoryId;
                    
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                  
              };
            },[formError,formValue,issubmit])


  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center"> Add Product </h2>
            <div className=" card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Product Name : </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    name="productName"
                    className="form-control"
                    value={formValue.productName}
                    onChange={handleProductNameChange}
                  ></input>
                   <span className="text-danger">{formError.productName}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Brand : </label>
                  <input
                    type="text"
                    placeholder="Brand"
                    name="brand"
                    className="form-control"
                    value={formValue.brand}
                    onChange={handleBrandChange}
                  ></input>
                   <span className="text-danger">{formError.brand}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Description : </label>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    className="form-control"
                    value={formValue.description}
                    onChange={handleDescriptionChange}
                  ></input>
                   <span className="text-danger">{formError.description}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Quantity : </label>
                  <input
                    type="number"
                    min="10"
                    max="2000"
                    placeholder="Quantity"
                    name="quantity"
                    className="form-control"
                    value={formValue.quantity}
                    onChange={handleQuantityChange}
                  ></input>
                   <span className="text-danger">{formError.quantity}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Price : </label>
                  <input
                    type="number"
                    min="1"
                    max="3000"
                    step=".01"
                    placeholder="Price"
                    name="price"
                    className="form-control"
                    value={formValue.price}
                    onChange={handlePriceChange}
                  ></input>
                   <span className="text-danger">{formError.price}</span>
                </div>

                <button
                  className="btn btn-success"
                  name="button"
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

export default AddProductComponent;
