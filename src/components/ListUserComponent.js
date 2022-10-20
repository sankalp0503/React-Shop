import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import ReactPaginate from "react-paginate";



const ListUserComponent = () => {

  const [ users, setUsers] = useState([])
  const [ currentPage, setCurrentPage] = useState(0);
  const [ totalPages, setTotalPages] = useState(1)

  let pageSize =2;
  
  useEffect( ()  => {
    UserService.getPaginatedUsers(currentPage,pageSize).then((response) =>{
      setUsers(response.data.content)
      setTotalPages(response.data.totalPages)
      // console.log(response.data.totalPages)
      // console.log(currentPage)
      //console.log(response)
      // console.log(totalPages)
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
   const deleteUser = (userId) =>{
    UserService.deleteUser(userId).then((response) =>{
      
      UserService.getPaginatedUsers(currentPage,pageSize).then((response) =>{
        setUsers(response.data.content)
        setTotalPages(response.data.totalPages)
        console.log(currentPage)
      }).catch(error =>{
        console.log(error);
      })

    }).catch(error =>{
      console.log(error);
    })
   }


   const addUser =(e) => {
    e.preventDefault();
    window.location.href = "/add-user";
  }

  const update =(userId) => {
    window.location.href = "/edit-user/"+userId;
  }

  const address =(userId) => {
    window.location.href = "/address/"+userId;
  }

  const listProducts =(userId) => { 
   window.location.href = "/order-category/"+userId;
  }

  const cart =(userId) => { 
    window.location.href = "/cart/"+userId;
   }

   const orders =(userId) => { 
    window.location.href = "/order-list/"+userId;
   }

   const ordersHistory =(userId) => { 
    window.location.href = "/order-history/"+userId;
   }

   const back =(e) => {
    window.location.href ="/home";
   }


   const handlePageClick = (data) =>{

    let cPage = (data.selected )
    setCurrentPage(cPage)
    console.log(cPage)
    UserService.getPaginatedUsers(cPage,pageSize).then((response) =>{
      setUsers(response.data.content)
    }).catch(error =>{
      console.log(error);
    })
   };

  
    return (
      <div className = "container">
        <h2 className="text-center"> Users List </h2>
        <button className = "btn btn-primary mb-2" onClick={(e) =>addUser(e)}> Add User </button>
        <button className = "btn btn-danger" onClick ={ (e) => back(e)}  style = {{marginLeft: "10px"}}> Back</button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>User Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {  users.map(
                     user =>
                 <tr key = {user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phoneNo}</td>
                    <td>{user.email}</td>
                    <td>{user.created}</td>
                    <td>{user.modifed}</td>
                    <td>
                      <button className ="btn btn-info" onClick ={ () => update(user.id)} > Update</button>
                      <button className = "btn btn-danger" onClick={() =>address(user.id)}  style = {{marginLeft: "10px"}}> Address </button>
                      <button className = "btn btn-danger" onClick={() =>listProducts(user.id)}  style = {{marginLeft: "10px"}}> Let's Shop </button>
                      <button className = "btn btn-danger" onClick={() =>cart(user.id)}  style = {{marginLeft: "10px"}}> Cart </button>
                      <button className = "btn btn-danger" onClick={() =>orders(user.id)}  style = {{marginLeft: "10px"}}> Orders </button>
                      <button className = "btn btn-danger" onClick={() =>ordersHistory(user.id)}  style = {{marginLeft: "10px"}}> OrdersHistory</button>
                      <button className = "btn btn-danger" onClick ={ () => deleteUser(user.id)}  style = {{marginLeft: "10px"}}> Delete User</button>
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
    );
  
}

export default ListUserComponent;
