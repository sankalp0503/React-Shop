import React, { useState, useEffect } from "react";
import {  useHistory, useParams } from "react-router-dom";
import UserService from "../services/UserService";

const UpdateCategoryComponent = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
 
  const history = useHistory();
  const { categoryId } = useParams();


  
  const UpdateCategory = (e) => {
    e.preventDefault();
    const category = { categoryName ,description  };
    
     UserService.updateCategory(categoryId , category).then((response) => {
      history.push('/category')
      window.location.href = "/category";
      
     }).catch((error) => {
        console.log(error);
     })
    
  };

  const cancel =(e) => {
    e.preventDefault();
    history.push('/category')
    window.location.href = "/category";
  }


  useEffect(() => {
    UserService.getCategoryById(categoryId)
      .then((response) => {
        setCategoryName(response.data.categoryName);
        setDescription(response.data.description);
        
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
          <h2 className="text-center"> Update Category</h2>
            <div className=" card-body">
              <form>
              <div className="form-group mb-2">
                  <label className="form-label"> Category Name : </label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    name="categoryName"
                    className="form-control"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Description : </label>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>
                

                <button
                  className="btn btn-success"
                  onClick={(e) => UpdateCategory(e)}
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

export default UpdateCategoryComponent;
