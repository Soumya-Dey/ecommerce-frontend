import { ADD_TO_CART, DELETE_FROM_CART, CART_ERROR } from '../actions/types';

const initialState = {
  products: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
  loading: !localStorage.getItem('cart'),
  error: {},
};

let products;
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      products = [...state.products, action.payload];
      localStorage.setItem('cart', JSON.stringify(products));
      return {
        ...state,
        products,
        loading: false,
      };
    case DELETE_FROM_CART:
      products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem('cart', JSON.stringify(products));
      return {
        ...state,
        products,
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
