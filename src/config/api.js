//  const BASE_URL = "http://193.203.160.57:8090/api/"
   const BASE_URL = "http://192.168.1.10:8080/api/"

export const LOGIN = BASE_URL + "customer/login"

export const ALL_PRODUCT =  BASE_URL+  "products/active-products-customer"
export const PRODUCT_DETAILS = BASE_URL+"products/"
export const REGISTER_CUSTOMER = BASE_URL+"customer/create"
export const ADD_TO_CART = BASE_URL+"cart/add"
export const GET_CART_BYID = BASE_URL+"cart/"
export const CARD_UPDATE = BASE_URL+"cart/update"
export const DELETE_CARD = BASE_URL+"cart/delete"
export const WISHLIST_CUSTOMER  = BASE_URL+"wishlist/"
export const WISHLIST_ADD  = BASE_URL+"wishlist/toggle"

//Address
export const ADDRESSES = BASE_URL+"addresses"


//Product
export const CREATE_ORDER = BASE_URL+"orders/create"
export const GET_ORDER = BASE_URL+"orders/customer"

//Category
export const GET_CATEGORY = BASE_URL+"categories/getAll"
export const CATEGORY_BY_ID = BASE_URL+"categories/with-products"




export const CART_ADD = BASE_URL+"cart/add"
export const ALL_CUSTOMERS = BASE_URL+"customer/all"
export const CUSTOMER = BASE_URL+"customer/"
export const DELETE_CUSTOMER = BASE_URL+"customer/api/"
export const WISHLIST_REMOVE = BASE_URL+"wishlist/add"
export const WISHLIST_DELETE_ALL = BASE_URL+"wishlist/clear/"
export const CARTITEMS = BASE_URL+"cart/"
export const QUANTITY = BASE_URL+"cart/update-quantity"
export const DELETE_CARTITEMS = BASE_URL+"cart/remove/"
export const PRODUCTBYCATEGORY= BASE_URL+"product/products/"
export const ADMIN_PROFILE = BASE_URL+"admin/"
export const ORDER_PLACED = BASE_URL+"orders/placeOrder"
// export const ALL_CUSTOMERS_ORDERS= BASE_URL+"orders/"
export const ALL_ORDERS= BASE_URL+"orders/all"
export const ALL_ORDERS_CUSTOMER= BASE_URL+"orders/all"
export const ORDER_APPROVE = BASE_URL+"orders/approve/"
export const ORDER_REJECT = BASE_URL+"orders/reject/"
export const SINGLE_ORDERS = BASE_URL+"orders/"



 const BASE2_URL = "http://192.168.1.26:8082"

 export const ADD_ADDRESS = BASE2_URL+"/create/"
  export const GET_ADDRESS = BASE2_URL+"/getByCustomerId/"
  export const UPDATE_ADDRESS = BASE2_URL+"/update/"
    export const DELETE_ADDRESS = BASE2_URL+"/"