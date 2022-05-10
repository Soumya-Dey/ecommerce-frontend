import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdEdit,
  MdDeleteForever,
  MdAddShoppingCart,
  MdDeleteSweep,
  MdStar,
  MdStarHalf,
  MdStarOutline,
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
  const filledStar = Math.floor(+rating);
  const halfFilledStar = +rating === Math.floor(+rating) ? 0 : 1;

  return (
    <div className='product bg-white p-2 my-2'>
      <div className='product-info'>
        <Link to={`/products/${id}`}>
          <img src={image} />
        </Link>

        <div className='product-inner'>
          <Link to={`/products/${id}`} className='product-text text-dark small'>
            {title}
          </Link>
          <p className='product-text x-small mb'>{description}</p>
          <p className='product-text large text-danger m-0'>
            <span className='small'>₹</span> {price}
          </p>
          <p className='product-text mt-05'>
            <p className='text-primary small m-icon-custom'>
              {new Array(filledStar).fill(0).map((_) => (
                <MdStar />
              ))}
              {halfFilledStar > 0 && <MdStarHalf />}
              {new Array(5 - (filledStar + halfFilledStar)).fill(0).map((_) => (
                <MdStarOutline />
              ))}
            </p>
            {rating}
          </p>
        </div>
      </div>

      <div className='product-action'>
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
        <button
          type='button'
          className='btn btn-light'
          // onClick={(e) => {
          //   deleteProduct(id);
          //   deleteFromCart(id);
          // }}
        >
          <MdEdit /> Edit Product
        </button>
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
      </div>
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
