import React, { useState ,useEffect} from "react";
import UserService from "../services/UserService";

const AddCategoryComponent = () => {
  // const [categoryName, setCategoryName] = useState(" ");
  // const [description, setDescription] = useState(" ");
 

const [formValue , setFormValue]= useState({categoryName:'' , description:'' });
const [formError , setFormError]= useState({});
const [issubmit , setSubmit]= useState(false);

const handleCategoryNameChange =(e)=>{
  setFormValue({...formValue, categoryName: e.target.value});
}
const handleDescriptionChange =(e)=>{
  setFormValue({...formValue, description: e.target.value});
}

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validationform(formValue));
    setSubmit(true);
    
    
  };

  const validationform =(value)=>{
    const errors={};
  

    if(!value.categoryName){
      errors.categoryName="Please Enter CategoryName";
    }
    if(!value.description){
      errors.description="Please Enter  Description for Category";
    }
    
    return errors;
  }
  
  // const saveCategory = (e) => {
  //   e.preventDefault();
  //   const category = { categoryName ,description };
  //   UserService.createCategory(category)
  //     .then((response) => {
  //       console.log(response.data);
  //       window.location.href = "/category";
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
    
  // };

  const cancel =(e) => {
    e.preventDefault();
    window.location.href = "/category/"
  }

  useEffect( (value)=> {
    if(Object.keys(formError).length===0 && issubmit)
    {
      const category ={categoryName:formValue.categoryName,
                       description:formValue.description,
                  };
                  UserService.createCategory(category)
                  .then((response) => {
                    console.log(response.data);
                    window.location.href = "/category";
                    
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
          <h2 className="text-center"> Add Category </h2>
            <div className=" card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Category Name : </label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    name="categoryName"
                    className="form-control"
                    value={formValue.categoryName}
                    onChange={handleCategoryNameChange}
                  ></input>
                  <span className="text-danger">{formError.categoryName}</span>
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
                

                <button
                  className="btn btn-success"
                  name="button"
                >
                  Submit
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

export default AddCategoryComponent;
