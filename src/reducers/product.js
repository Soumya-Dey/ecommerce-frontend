import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_ERROR,
} from '../actions/types';

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };
    case UPDATE_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        product: action.payload,
        products: [
          ...state.products.filter(
            (product) => product.id !== action.payload.id
          ),
          action.payload,
        ],
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
