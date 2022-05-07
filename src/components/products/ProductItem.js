import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteProduct } from '../../actions/product';

const ProductItem = ({
  product: { id, title, description, price, rating, image },
  deleteProduct,
  margin,
}) => {
  return (
    <div className={`post bg-white p-custom-2 my-${margin}`}>
      <p className='post-text'>{title}</p>
      <p className='post-text'>{description}</p>
      <p className='post-text'>{price}</p>
      <p className='post-text'>{rating}</p>
      <Link to={`/posts/${id}`} className='btn btn-dark mr'>
        Edit Product
      </Link>
      <button
        type='button'
        className='btn btn-danger'
        onClick={(e) => deleteProduct(id)}
      >
        Delete Product
      </button>
      <button
        type='button'
        className='btn btn-primary'
        // onClick={(e) => deleteProduct(id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  margin: PropTypes.number,
};

export default connect(null, {
  deleteProduct,
})(ProductItem);
