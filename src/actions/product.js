import axios from 'axios';

import { API_URL } from '../env';
import { setAlert } from './alert';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_ERROR,
} from './types';

// for getting all products
export const getAllProducts = () => async (dispatch) => {
  try {
    // get all products
    const res = await axios.get(`${API_URL}/products`);

    setTimeout(() => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    }, 500);
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for getting a product by product id
export const getProduct = (productId) => async (dispatch) => {
  try {
    // get the product by id
    const res = await axios.get(`${API_URL}/products/${productId}`);

    setTimeout(() => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    }, 500);
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for adding a new product
export const addProduct = (formData) => async (dispatch) => {
  try {
    // add the product
    const res = await axios.post(`${API_URL}/products`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    // send the new product to reducer
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });

    // show an alert
    dispatch(setAlert('Product created successfully', 'success'));
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for editing a new product
export const editProduct = (productId, formData) => async (dispatch) => {
  try {
    // add the product
    const res = await axios.patch(
      `${API_URL}/products/${productId}`,
      formData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // send the new product to reducer
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });

    // show an alert
    dispatch(setAlert('Product updated successfully', 'success'));
  } catch (error) {
    // send the error data to reducer
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// for removing a product
export const deleteProduct = (productId) => async (dispatch) => {
  if (window.confirm('Are you sure you want to remove this product?')) {
    try {
      // remove the product
      await axios.delete(`${API_URL}/products/${productId}`);

      // send the deleted product id to reducer
      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });

      // show an alert
      dispatch(setAlert('Product removed successfully', 'dark'));
    } catch (error) {
      // send the error data to reducer
      dispatch({
        type: PRODUCTS_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
