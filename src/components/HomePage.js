import React from "react";
import UserService from "../services/UserService";



const HomePage = () => {

   const addUser =(e) => {
    e.preventDefault();
    window.location.href = "/users";
  }

  
  const addCategories=(e) => {
    e.preventDefault();
    window.location.href = "/category";
  }
  
  const userAddress=(e) => {
    e.preventDefault();
    window.location.href = "/all-address";
  }

  const products=(e) => {
    e.preventDefault();
    window.location.href = "/all-products";
  }

  const cartProducts=(e) => {
    e.preventDefault();
    window.location.href = "/all-cartProducts";
  }
  
    return (
      <div className = "HomePage-container">
        <h2 className="text-left "> Home </h2>
        <br/> <br />
        <h2 className="text-center "> Welcome to E-commerce Shop </h2>
        <br/> <br />
        <br/> <br />
        <button className = "btn btn-primary mb-2" onClick={(e) =>addUser(e)}> Add Users </button>
        <br/> <br />
        <button className = "btn btn-primary mb-2" onClick={(e) =>userAddress(e)}> Users Address </button>
        <br/> <br />
        <button className = "btn btn-primary mb-2" onClick={(e) =>addCategories(e)}> Add Categories & Products </button>
        <br/> <br />
        <button className = "btn btn-primary mb-2" onClick={(e) =>products(e)}> Products</button>
        <br/> <br />
        <button className = "btn btn-primary mb-2" onClick={(e) =>cartProducts(e)}> Cart Products </button>
      </div>
    );
  
}

export default HomePage;
