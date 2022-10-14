
import React, { useState, useEffect } from 'react'
import {  useParams } from "react-router-dom";
import UserService from "../services/UserService";
import ReactPaginate from "react-paginate";

const ListAddressComponent = () => {
  
  
  const { userId } = useParams();
  const [ addresses, setAddresses] = useState([])
 // const [ currentPage, setCurrentPage] = useState(0);
  const [ totalPages, setTotalPages] = useState(1)
  const [ cursor , setCursor] = useState("");

 // let pageSize =2;


  useEffect( ()  => {
    UserService.getCursorPaginatedUsersById(userId,cursor).then((response) =>{
      setAddresses(response.data.list)
      setTotalPages(response.data.totalPages)
      setCursor(response.data.cursor)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  

  // needs to be modified
  const deleteAddress = (addressId) =>{
    UserService.deleteAddress(addressId).then((response) =>{
      UserService.getAddressByUserId(userId).then((response) =>{
        setAddresses(response.data)
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })

    }).catch(error =>{
      console.log(error);
    })
   }


   const addAddress =(e) => {
    e.preventDefault();
    window.location.href = "/add-address/"+userId;
  }

  const updateAddress =(addressId) => {
    window.location.href = "/edit-address/"+userId+'/'+addressId;
  }

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/users";
  }

  const defaultAddress =(e) => {
    e.preventDefault();
    window.location.href ="/default-address/"+userId;
  }

  const setDefault =(addressId)=> {
    UserService.setDefaultAddress(addressId).then((response) =>{
      UserService.getAddressByUserId(userId).then((response) =>{
        setAddresses(response.data)
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })

    }).catch(error =>{
      console.log(error);
    })
    
    window.location.href ="/default-address/"+userId;

  }

  const handlePageClick = (data) =>{

    //let currentPage = (data.selected )
    //console.log(currentPage)
    UserService.getCursorPaginatedUsersById(userId,cursor).then((response) =>{
      setAddresses(response.data.list)
      
      
    }).catch(error =>{
      console.log(error);
    })
   };


    return (
      <div className = "container">
        <h2 className="text-center"> Address List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>addAddress(e)} > Add Address </button>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
        <button className = "btn btn-primary mb-2" onClick={(e) =>defaultAddress(e)} style = {{marginLeft: "10px"}}> Default Address </button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Address Id</th>
                <th>Address Line</th>
                <th>City</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {  addresses.map(
                     address =>
                 <tr key = {address.id}>
                    <td>{address.id}</td>
                    <td>{address.addLine}</td>
                    <td>{address.city}</td>
                    <td>{address.country}</td>
                    <td>{address.postalCode}</td>
                    <td>
                      <button className ="btn btn-info" onClick ={ () => updateAddress(address.id)} > Update</button>
                      <button className = "btn btn-danger" onClick ={ () => deleteAddress(address.id)}  style = {{marginLeft: "10px"}}> Delete </button>
                      <button className = "btn btn-danger" onClick ={ () => setDefault(address.id)}  style = {{marginLeft: "10px"}}> Set Default </button>
                    </td>

                 </tr> 
                  )}
            </tbody>
          </table>
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
        
    )
}

export default ListAddressComponent