import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListUserComponent from "./components/ListUserComponent";
import AddUserComponent from "./components/AddUserComponent";
import ListAddressComponent from "./components/ListAddressComponent";
import AddAddressComponent from "./components/AddAddressComponent";
import UpdateUserComponent from "./components/UpdateUserComponent";
import UpdateAddressComponent from "./components/UpdateAddressComponent";
import ListCategoryComponent from "./components/ListCategoryComponent";
import AddCategoryComponent from "./components/AddCategoryComponent";
import UpdateCategoryComponent from "./components/UpdateCategoryComponent";
import ListProductComponent from "./components/ListProductComponent";
import AddProductComponent from "./components/AddProductComponent";
import UpdateProductComponent from "./components/UpdateProductComponent";
import HomePage from "./components/HomePage";
import OrderCategoryComponent from "./components/OrderCategoryComponent";
import OrderProductComponent from "./components/OrderProductComponent";
import PlaceProductComponent from "./components/PlaceProductComponent";
import ListCartComponent from "./components/ListCartComponent";
import OrderListComponent from "./components/OrderListComponent";
import OrderHistoryComponent from "./components/OrderHistoryComponent";
import OrderCheckComponent from "./components/OrderCheckComponent";
import OrderAccepted from "./components/OrderAccepted";
import ListAllAddressComponent from "./components/ListAllAddressComponent";
import ListAllProductsComponent from "./components/ListAllProductsComponent";
import ListAllCartProductsComponent from "./components/ListAllCartProductsComponent";
import DefaultAddressComponent from "./components/DefaultAddressComponent";



function App() {
 
  return (
 
<div className = 'App-container'>
<Router>
  <HeaderComponent />
  <br /><br />
  <div >
    <Switch>
       <Route exact path ="/" component={HomePage} ></Route> 
       <Route exact path ="/home" component={HomePage} ></Route> 
      <Route path ="/users" component={ListUserComponent}></Route>
      <Route path ="/add-user" component={AddUserComponent}></Route>
      <Route path ="/edit-user/:userId" component={UpdateUserComponent}></Route>
      <Route path ="/address/:userId" component={ListAddressComponent}></Route>
      <Route path ="/default-address/:userId" component={DefaultAddressComponent}></Route>
      <Route path ="/add-address/:userId" component={AddAddressComponent}></Route>
      <Route path ="/edit-address/:userId/:addressId" component={UpdateAddressComponent}></Route>
      <Route path ="/category" component={ListCategoryComponent}></Route>
      <Route path ="/add-category" component={AddCategoryComponent}></Route>
      <Route path ="/edit-category/:categoryId" component={UpdateCategoryComponent}></Route>
      <Route path ="/product/:categoryId" component={ListProductComponent}></Route>
      <Route path ="/add-product/:categoryId" component={AddProductComponent}></Route>
      <Route path ="/edit-product/:categoryId/:productId" component={UpdateProductComponent}></Route>
      <Route path ="/order-category/:userId" component={OrderCategoryComponent}></Route>
      <Route path ="/order-product/:userId/:categoryName/:categoryId" component={OrderProductComponent}></Route>
      <Route path ="/place-product/:userId/:categoryName/:categoryId/:productId" component={PlaceProductComponent}></Route>
      <Route path ="/cart/:userId" component={ListCartComponent}></Route>
      <Route path ="/order-list/:userId" component={OrderListComponent}></Route>
      <Route path ="/order-history/:userId" component={OrderHistoryComponent}></Route>
      <Route path ="/order-check/:userId/:orderId" component={OrderCheckComponent}></Route>
      <Route path ="/order-accepted" component={OrderAccepted}></Route>
      <Route path ="/all-address" component={ListAllAddressComponent}></Route>
      <Route path ="/all-products" component={ListAllProductsComponent}></Route>
      <Route path ="/all-cartProducts" component={ListAllCartProductsComponent}></Route>

    </Switch>
  </div>
  <FooterComponent />
</Router>
</div>
    
  );
}

export default App;




