import axios from "axios";

const USER_API_BASE_URL = " http://localhost:8080/api/users";
const ADDRESS_API_BASE_URL = "http://localhost:8080/api/address";
const CATEGORY_API_BASE_URL = "http://localhost:8080/api/category";
const PRODUCT_API_BASE_URL = " http://localhost:8080/api/product";
const PROD_INTO_CART_API_BASE_URL = "http://localhost:8080/api/product/addIntoCart";
const CART_API_BASE_URL ="http://localhost:8080/api/product";
const ORDER_API_BASE_URL="http://localhost:8080/api/order";

class UserService {

  getAllUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  getPaginatedUsers(currentPage , pageSize) {
    return axios.get(USER_API_BASE_URL+'/page/'+currentPage+'/'+pageSize);
  }

  getCursorPaginatedUsersById(userId,cursor){
    return axios.get(ADDRESS_API_BASE_URL+'/cursorPaginateUserAddress/'+userId+'?cursor='+cursor);
  }




  createUser(user){
    return axios.post(USER_API_BASE_URL , user);
  }

  getUserById(userId){
    return axios.get(USER_API_BASE_URL +'/'+ userId);
  }

  updateUser(userId , user){
    return axios.put(USER_API_BASE_URL+'/'+userId , user);
  }

  deleteUser(userId){
    return axios.delete(USER_API_BASE_URL+'/'+userId);
  }

  createAddress(userId , address){
    return axios.post(ADDRESS_API_BASE_URL+'/'+userId,address);
  }

  getAllAddress(){
    return axios.get(ADDRESS_API_BASE_URL+'/all');
  }

  getDefaultAddress(userId){
    return axios.get(ADDRESS_API_BASE_URL+'/defaultAddressByUserId/all/'+userId);
  }

  setDefaultAddress(addressId){
    return axios.put(ADDRESS_API_BASE_URL+'/setDefault/'+addressId);
  }

  removeDefaultAddress(addressId){
     return axios.put(ADDRESS_API_BASE_URL+'/removeDefault/'+addressId)
  }

  getAddressByUserId(userId){
    return axios.get(ADDRESS_API_BASE_URL+'/addressByUserId/'+userId);
  }

  getAddressByAddressId(addressId){
    return axios.get(ADDRESS_API_BASE_URL+'/addressByAddressId/'+addressId);
  }

  updateAddress(userId , addressId , address){
    return axios.put(ADDRESS_API_BASE_URL+'/'+userId+'/'+addressId , address);
  }

  deleteAddress(addressId){
    return axios.delete(ADDRESS_API_BASE_URL+'/'+addressId);

  }

  getAllCategory(){
    return axios.get(CATEGORY_API_BASE_URL);
  }

  createCategory(category){
    return axios.post(CATEGORY_API_BASE_URL , category);
  }

  getCategoryById(categoryId){
    return axios.get(CATEGORY_API_BASE_URL+'/'+categoryId);
  }

  updateCategory(categoryId , category){
    return axios.put(CATEGORY_API_BASE_URL+'/'+categoryId , category);
  }

  deleteCategory(categoryId){
    return axios.delete(CATEGORY_API_BASE_URL+'/'+categoryId);
  }

  createProduct(categoryId , product){
    return axios.post(PRODUCT_API_BASE_URL+'/'+categoryId , product);
  }

  getAllProducts(){
    return axios.get(PRODUCT_API_BASE_URL+'/all');
  }

  getAllCartProducts(){
    return axios.get(PRODUCT_API_BASE_URL+'/getAllProductsInCartProductWithId');
  }

  getProductByProductId(productId){
    return axios.get(PRODUCT_API_BASE_URL+'/productByProductId/'+productId);
  }

  getProductByCategoryId(categoryId){
    return axios.get(PRODUCT_API_BASE_URL+'/withIdProductByCategoryId/'+categoryId);
  }

  updateProduct(categoryId , productId , product){
    return axios.put(PRODUCT_API_BASE_URL+'/'+categoryId+'/'+productId , product);
  }

  deleteProduct(productId){
    return axios.delete(PRODUCT_API_BASE_URL+'/'+productId);

  }

  addIntoCart(userId, productId , prod){
    return axios.post(PROD_INTO_CART_API_BASE_URL+'/'+userId+'/'+productId , prod);
  }

  getProductsFromCartProductByUserId(userId){
    return axios.get(CART_API_BASE_URL+'/productsWithIdInCartProductByUserId/'+userId);
  }
 
  deleteProductsFromCartProductByCartProductId(cartProductId){
    return axios.delete(CART_API_BASE_URL+'/cartProductsByCartProductId/'+cartProductId);
  } 

  deleteAllProductsFromCartProductByUserId(userId){
    return axios.delete(CART_API_BASE_URL+'/cartProductsByUserId/'+userId);
  }

  placeOrder(userId){
    return axios.put(ORDER_API_BASE_URL+'/saveAndSubmitAndCreateOrderWithUserId/'+userId);
  }

  getIntoCart(userId){
    return axios.get(PRODUCT_API_BASE_URL+'/productsWithIdInCartProductByUserIdWith NullOrderId/'+userId);
  }

  getAllOrdersByUserId(userId){
    return axios.get(ORDER_API_BASE_URL+'/allOrdersInOrdersByUserId/'+userId);
  }

  getOrderHistory(userId){
    return axios.get(ORDER_API_BASE_URL+'/orderDetails/'+userId);
  }

  getOrderListByOrderId(orderId){
    return axios.get(ORDER_API_BASE_URL+'/orderProductDetails/'+orderId);
  }

  cancelOrder(orderId){
    return axios.delete(ORDER_API_BASE_URL+'/cancelAllProductsByOrderId/'+orderId);
  }

}
export default new UserService();
