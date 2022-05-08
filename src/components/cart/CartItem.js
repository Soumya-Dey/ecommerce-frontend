import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteFromCart } from '../../actions/cart';

const CartItem = ({
  product: { id, title, description, price, rating, image },
  deleteFromCart,
  margin,
}) => {
  return (
    <div className={`post bg-white p-custom-2 my-${margin}`}>
      <p className='post-text'>{title}</p>
      <p className='post-text'>{description}</p>
      <p className='post-text'>{price}</p>
      <p className='post-text'>{rating}</p>
      <button
        type='button'
        className='btn btn-danger'
        onClick={(e) => deleteFromCart(id)}
      >
        Delete from Cart
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
