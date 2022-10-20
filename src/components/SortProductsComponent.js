import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import ReactPaginate from "react-paginate";

const SortProductsComponent = () => {
  const {  field } = useParams();
  const [products, setProducts] = useState([]);
  const [cursor , setCursor] =useState('')
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    UserService.getAllProductsPaginatedAndSorted(cursor, field)
      .then((response) => {
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
    window.location.href = "/all-products";
  };

  const handlePageClick = (data) =>{
    console.log(cursor)
    UserService.getAllProductsPaginatedAndSorted(cursor,field).then((response) =>{
      setProducts(response.data.list)
      setCursor(response.data.cursor)
      
    }).catch(error =>{
      console.log(error);
    })
   };

  return (
    <div>
      <div className="container">
        <h2 className="text-center"> Sorted Product List </h2>
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
                  <td>{product.created_date}</td>
                  <td>{product.modified_date}</td>
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

export default SortProductsComponent;
