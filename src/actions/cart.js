import { setAlert } from './alert';
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CART_ERROR,
  UPDATE_CART,
} from './types';

// for adding a new product to cart
export const addToCart = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    // send the new product to reducer
    dispatch({
      type: ADD_TO_CART,
      payload: formData,
    });

    // show an alert
    dispatch(setAlert('Product added to cart', 'success'));
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: CART_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for adding a new product to cart
export const editCart = (formData) => async (dispatch) => {
  try {
    // send the new product to reducer
    dispatch({
      type: UPDATE_CART,
      payload: formData,
    });
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: CART_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for deleting a product from cart
export const deleteFromCart = (productId) => async (dispatch) => {
  try {
    // send the new product to reducer
    dispatch({
      type: DELETE_FROM_CART,
      payload: productId,
    });

    // show an alert
    dispatch(setAlert('Product removed from cart', 'dark'));
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: CART_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
