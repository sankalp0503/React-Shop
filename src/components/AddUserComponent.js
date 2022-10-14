import React, { useState , useEffect} from "react";
import {  useHistory} from "react-router-dom";
import UserService from "../services/UserService";

const AddUserComponent = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phoneNo, setPhoneNo] = useState("");
  // const [email, setEmail] = useState("");
  // const history = useHistory();


  const [formValue , setFormValue]= useState({firstName:'' , lastName:'' , phoneNo:'',email:''});
  const [formError , setFormError]= useState({});
  const [issubmit , setSubmit]= useState(false);
  
  const handleFirstNameChange =(e)=>{
    setFormValue({...formValue, firstName: e.target.value});
  }
  const handleLastNameChange =(e)=>{
    setFormValue({...formValue, lastName: e.target.value});
  }
  const handlePhoneNoChange =(e)=>{
    setFormValue({...formValue, phoneNo: e.target.value});
  }
  const handleEmailChange =(e)=>{
    setFormValue({...formValue, email: e.target.value});
  }
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormError(validationform(formValue));
      setSubmit(true);
      
    };
  
    const validationform =(value)=>{
      const errors={};
      const emailPattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      const phonePattern=/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
  
      if(!value.firstName){
        errors.firstName="Please Enter FirstName";
      }
      if(!value.lastName){
        errors.lastName="Please Enter LastName";
      }
      if(!value.phoneNo){
        errors.phoneNo="Please Enter PhoneNo";
      }else if(!phonePattern.test(value.phoneNo))
      {
        errors.phoneNo="Enter Valid 10-digit PhoneNo"
      }
      if(!value.email){
        errors.email="Please Enter Email";
      }else if(!emailPattern.test(value.email))
      {
        errors.email="Enter Valid Email";
      }
      
      return errors;
    }
  
  // const saveUser = (e) => {
  //   e.preventDefault();
  //   const user = { firstName, lastName, phoneNo, email };
  //   UserService.createUser(user)
  //     .then((response) => {
  //       console.log(response.data);
  //       history.push("/users");
  //       window.location.href = "/users";
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
    
  // };

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/users";
  }


  useEffect( (value)=> {
    if(Object.keys(formError).length===0 && issubmit)
    {
      const user ={firstName:formValue.firstName,
                       lastName:formValue.lastName,
                       phoneNo:formValue.phoneNo,
                       email:formValue.email
                  };
                  
                  UserService.createUser(user)
                  .then((response) => {
                    console.log(response.data);
                    window.location.href = "/users";
                    
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
          <h2 className="text-center"> Add User </h2>
            <div className=" card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> First Name : </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={formValue.firstName}
                    onChange={handleFirstNameChange}
                  ></input>
                  <span className="text-danger">{formError.firstName}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Last Name : </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={formValue.lastName}
                    onChange={handleLastNameChange}
                  ></input>
                  <span className="text-danger">{formError.lastName}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Phone No : </label>
                  <input
                    type="text"
                    placeholder="Phone No"
                    name="phoneNo"
                    className="form-control"
                    value={formValue.phoneNo}
                    onChange={handlePhoneNoChange}
                  ></input>
                   <span className="text-danger">{formError.phoneNo}</span>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Email : </label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    value={formValue.email}
                    onChange={handleEmailChange}
                  ></input>
                  <span className="text-danger">{formError.email}</span>
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

export default AddUserComponent;
