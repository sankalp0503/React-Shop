import React, { useState, useEffect } from "react";
import {  useHistory, useParams } from "react-router-dom";
import UserService from "../services/UserService";

const UpdateUserComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { userId } = useParams();


  
  const UpdateUser = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, phoneNo, email };
    
    
     UserService.updateUser(userId ,user).then((response) => {
      history.push('/users')
      window.location.href = "/users";
      
     }).catch((error) => {
        console.log(error);
     })
    
  };

  const cancel =(e) => {
    e.preventDefault();
    history.push('/users')
    window.location.href = "/users";
  }


  useEffect(() => {
    UserService.getUserById(userId)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNo(response.data.phoneNo);
        setEmail(response.data.email);
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
          <h2 className="text-center"> Update User </h2>
            <div className=" card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> First Name : </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Last Name : </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Phone No : </label>
                  <input
                    type="text"
                    placeholder="Phone No"
                    name="phoneNo"
                    className="form-control"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Email : </label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => UpdateUser(e)}
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

export default UpdateUserComponent;
