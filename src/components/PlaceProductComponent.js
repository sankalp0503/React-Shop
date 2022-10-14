import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const PlaceProductComponent = () => {
  // const [reqQuantity, setReqQuantity] = useState("");
  const {userId ,categoryName,categoryId , productId}= useParams();
  
  // console.log("u",userId)
  // console.log("a",categoryId)
  // console.log("p",productId)


const [formValue , setFormValue]= useState({reqQuantity:'' });
const [formError , setFormError]= useState({});
const [issubmit , setSubmit]= useState(false);

const handleReqQuantityChange =(e)=>{
  setFormValue({...formValue, reqQuantity: e.target.value});
}

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validationform(formValue));
    setSubmit(true);
    
    
  };

  const validationform =(value)=>{
    const errors={};
  

    if(!value.reqQuantity){
      errors.reqQuantity="Please Enter Required Quantity";
    }
    
    
    return errors;
  }
  // const addIntoCart = (e) => {
  //   e.preventDefault();
  //   const prod = { reqQuantity };
  //   UserService.addIntoCart(userId,productId,prod)
  //     .then((response) => {
  //       console.log(response.data);
  //       window.location.href = "/order-category"+'/'+userId;
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
    
  // };

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/order-product/"+userId+'/'+categoryName+'/'+categoryId;
  }

  useEffect( (value)=> {
    if(Object.keys(formError).length===0 && issubmit)
    {
      const prod ={reqQuantity:formValue.reqQuantity  };
    UserService.addIntoCart(userId,productId,prod)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/order-category"+'/'+userId;
        
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
          <h2 className="text-center"> Add Into Cart </h2>
            <div className=" card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Required Quantity : </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    placeholder="Required Quantity"
                    name="reqQuantity"
                    className="form-control"
                    value={formValue.reqQuantity}
                    onChange={handleReqQuantityChange}
                  ></input>
                  <span className="text-danger">{formError.reqQuantity}</span>
                </div>
                

                <button
                  className="btn btn-success"
                  name="button"
                >
                  Submit
                </button>
                <button 
                className="btn btn-danger"
                onClick={(e) =>cancel(e)}
                style = {{marginLeft: "10px"}}
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

export default PlaceProductComponent;
