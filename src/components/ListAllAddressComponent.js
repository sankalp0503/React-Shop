import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import ReactPaginate from "react-paginate";

const ListAllAddressComponent = () => {
  const [addresses, setAddresses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [cursor, setCursor] = useState("");
  const [ keyword , setKeyword ] = useState("")
  const [ previous , setPrevious ] = useState();

  useEffect(() => {
    UserService.getCursorPaginatedAllAddresses(cursor).then((response) => {
        setAddresses(response.data.list);
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
    window.location.href = "/all-address";
  };

  const filterAddresses=(e) => {
    e.preventDefault();
    window.location.href ="/filterAddresses/"+keyword;
  }

  const handlePageClick = (data) =>{
    UserService.getCursorPaginatedAllAddresses(cursor).then((response) =>{
      setAddresses(response.data.list)
      setPrevious(cursor);
      setCursor(response.data.cursor)
      
    }).catch(error =>{
      console.log(error);
    })
   };

  return (
    <div>
      <div className="container">
        <h2 className="text-center"> Address List </h2>
        <br/><br/>
        <div align="center">
          <form >
            Filter: 
            <input type="text" placeholder='Search' name="keyword"  value={keyword} onChange={(e) => setKeyword(e.target.value)} required/>
            &nbsp;
            <button className="btn btn-success" onClick={(e) =>filterAddresses(e)} > Submit</button>
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
                <th>Address Line</th>
                <th>City</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Created Date</th>
                <th>Updated Date</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td>{address.addLine}</td>
                  <td>{address.city}</td>
                  <td>{address.country}</td>
                  <td>{address.postalCode}</td>
                  <td>{address.created}</td>
                  <td>{address.modified}</td>
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

export default ListAllAddressComponent;
