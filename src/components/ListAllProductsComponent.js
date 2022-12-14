import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import ReactPaginate from "react-paginate";

const ListAllProductsComponent = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [cursor, setCursor] = useState("");
  const [ keyword , setKeyword ] = useState("")
  const [ field , setField ] = useState("")


  useEffect(() => {
    UserService.getCursorPaginatedAllProducts(cursor).then((response) => {
        setProducts(response.data.list);
        setTotalPages(response.data.totalPages)
        setCursor(response.data.cursor)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const back = (e) => {
    e.preventDefault();
    window.location.href = "/home";
  };

  const cancel=(e) => {
    e.preventDefault();
    window.location.href = "/all-products";
  };

  const filterProducts=(e) => {
    e.preventDefault();
    window.location.href ="/filterProducts/"+keyword;
  }

  const sortProducts=(e) => {
    e.preventDefault();
    window.location.href ="/sortProducts/"+field;
  }

  const handlePageClick = (data) =>{
    UserService.getCursorPaginatedAllProducts(cursor).then((response) =>{
      setProducts(response.data.list)
      setCursor(response.data.cursor)
      
    }).catch(error =>{
      console.log(error);
    })
   };

  return (
    <div>
      <div className="container">
        <h2 className="text-center"> Product List </h2>
        <br/><br/>
        <div align="center">
          <form >
            Filter: 
            <input type="text"className="form-group mb-2" placeholder='Search' name="keyword"  value={keyword} onChange={(e) => setKeyword(e.target.value)} required/>
            &nbsp;
            <button className="btn btn-success" onClick={(e) =>filterProducts(e)} > Submit</button>
            &nbsp;
            <button className="btn btn-danger" onClick={(e) =>cancel(e)} >Cancel</button>
            &nbsp;
            &nbsp;
          
            
            SortBy: 
            <select   name="field"  value={field} onChange={(e) => setField(e.target.value)} >
              <option defaultValue="Sort">Sort</option>
              <option>productName</option>
              <option>brand</option>
              <option>description</option>
              <option>quantity</option>
              <option>price</option>
            </select> 
            &nbsp;
            <button className="btn btn-success" onClick={(e) =>sortProducts(e)} > Submit</button>
            &nbsp;
            <button className="btn btn-danger" onClick={(e) =>cancel(e)} >Cancel</button>
        </form>
        </div>
        
        <button
          className="btn btn-primary mb-2"
          onClick={(e) => back(e)}
          style={{ marginLeft: "10px" }}
        >
          {" "}
          Back{" "}
        </button>
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.productName}</td>
                  <td>{product.brand}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.created}</td>
                  <td>{product.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
       previousLabel ={'Previous'}
       nextLabel ={'Next'}
       breakLabel ={'...'}
       pageCount ={totalPages}
       marginPagesDisplayed ={2}
       pageRangeDisplayed ={2}
       onPageChange = {handlePageClick}
       containerClassName = {'pagination justify-content-center'}
       pageClassName ={'page-item'}
       pageLinkClassName = {'page-link'}
       previousClassName ={'page-item'}
       previousLinkClassName ={'page-link'}
       nextClassName ={'page-item'}
       nextLinkClassName ={'page-link'}
       breakClassName ={'page-item'}
       breakLinkClassName ={'page-link'}
       activeClassName ={'active'}
      
       />
    </div>
  );
};

export default ListAllProductsComponent;
