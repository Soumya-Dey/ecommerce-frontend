import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MdDeleteSweep } from 'react-icons/md';

import { deleteFromCart } from '../../actions/cart';

const CartItem = ({
  product: { id, title, description, price, rating, image },
  deleteFromCart,
  margin,
}) => {
  return (
    <div className={`product bg-white p-custom-2 my-${margin}`}>
      <p className='product-text'>{title}</p>
      <p className='product-text'>{description}</p>
      <p className='product-text'>{price}</p>
      <p className='product-text'>{rating}</p>
      <button
        type='button'
        className='btn btn-danger'
        onClick={(e) => deleteFromCart(id)}
      >
        <MdDeleteSweep /> Delete from Cart
      </button>
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  margin: PropTypes.number,
};

export default connect(null, {
  deleteFromCart,
})(CartItem);
