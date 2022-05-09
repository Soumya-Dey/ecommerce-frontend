import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdEdit,
  MdDeleteForever,
  MdAddShoppingCart,
  MdDeleteSweep,
} from 'react-icons/md';

import { deleteProduct } from '../../actions/product';
import { addToCart, deleteFromCart } from '../../actions/cart';

const ProductItem = ({
  product: { id, title, description, price, rating, image },
  cart: { products: cartItems, loading },
  deleteProduct,
  addToCart,
  deleteFromCart,
  margin,
}) => {
  return (
    <div className={`post bg-white p-custom-2 my-${margin}`}>
      <p className='post-text'>{title}</p>
      <p className='post-text'>{description}</p>
      <p className='post-text'>{price}</p>
      <p className='post-text'>{rating}</p>
      <Link to={`/products/${id}`} className='btn btn-dark mr'>
        <MdEdit /> Edit Product
      </Link>
      <button
        type='button'
        className='btn btn-danger'
        onClick={(e) => {
          deleteProduct(id);
          deleteFromCart(id);
        }}
      >
        <MdDeleteForever /> Delete Product
      </button>
      {!loading ? (
        cartItems.filter((product) => product.id === id).length ? (
          <button
            type='button'
            className='btn btn-dark'
            onClick={(e) => deleteFromCart(id)}
          >
            <MdDeleteSweep /> Delete from Cart
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-primary'
            onClick={(e) =>
              addToCart({ id, title, description, price, rating, image })
            }
          >
            <MdAddShoppingCart /> Add to Cart
          </button>
        )
      ) : (
        ''
      )}
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  margin: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  deleteProduct,
  addToCart,
  deleteFromCart,
})(ProductItem);
