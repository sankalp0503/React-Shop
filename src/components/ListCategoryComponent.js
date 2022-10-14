import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";



const ListCategoryComponent = () => {

  const [ categories, setCategories] = useState([])
  
  useEffect( ()  => {
    UserService.getAllCategory().then((response) =>{
      setCategories(response.data)
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })
  },  [])
  
   const deleteCategory = (categoryId) =>{
    UserService.deleteCategory(categoryId).then((response) =>{
      UserService.getAllCategory().then((response) =>{
        setCategories(response.data)
        console.log(response.data);
      }).catch(error =>{
        console.log(error);
      })

    }).catch(error =>{
      console.log(error);
    })
   }


   const addCategory =(e) => {
    e.preventDefault();
    window.location.href = "/add-category";
  }

  const updateCategory =(categoryId) => {
    window.location.href = "/edit-category/"+categoryId;
  }

  const products =(categoryId) => {
    window.location.href = "/product/"+categoryId;
  }

  const back =(e) => {
    e.preventDefault();
    window.location.href = "/home";
  }

  
    return (
      <div className = "container">
        <h2 className="text-center"> Categories List </h2>
        
        <button className = "btn btn-primary mb-2" onClick={(e) =>addCategory(e)}> Add Category </button>
        <button className = "btn btn-primary mb-2" onClick={(e) =>back(e)} style = {{marginLeft: "10px"}}> Back </button>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {  categories.map(
                     category =>
                 <tr key = {category.id}>
                    <td>{category.id}</td>
                    <td>{category.categoryName}</td>
                    <td>{category.description}</td>
                    <td>{category.created_date}</td>
                    <td>{category.modified_date}</td>

                    
                    <td>
                      <button className ="btn btn-info" onClick ={ () => updateCategory(category.id)} > Update</button>
                      <button className = "btn btn-danger" onClick={() =>products(category.id)}  style = {{marginLeft: "10px"}}> Products </button>
                      <button className = "btn btn-danger" onClick ={ () => deleteCategory(category.id)}  style = {{marginLeft: "10px"}}> Delete </button>
                    </td>
                 </tr> 
                  )}
            </tbody>
          </table>
        </div>
      </div>
    );
  
}

export default ListCategoryComponent;
