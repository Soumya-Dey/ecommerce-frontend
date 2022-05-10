import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  MdKeyboardArrowLeft,
  MdEdit,
  MdDeleteForever,
  MdAddShoppingCart,
  MdDeleteSweep,
} from 'react-icons/md';

import Spinner from '../layouts/Spinner';
import { getProduct, deleteProduct } from '../../actions/product';
import { addToCart, deleteFromCart } from '../../actions/cart';

const Product = ({
  getProduct,
  deleteProduct,
  addToCart,
  deleteFromCart,
  product: { product, loading },
  cart: { products: cartItems, loading: cartLoading },
}) => {
  const { productId } = useParams();
  console.log(productId);
  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  return loading || product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        <MdKeyboardArrowLeft /> Back
      </Link>

      {/* <img width='200px' src={image} /> */}
      <p className='product-text'>{product.title}</p>
      <p className='product-text'>{product.description}</p>
      <p className='product-text'>{product.price}</p>
      <p className='product-text'>{product.rating}</p>

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
          deleteProduct(product.id);
          deleteFromCart(product.id);
        }}
      >
        <MdDeleteForever /> Delete Product
      </button>
      {!cartLoading ? (
        cartItems.filter((p) => p.id === product.id).length ? (
          <button
            type='button'
            className='btn btn-dark'
            onClick={(e) => deleteFromCart(product.id)}
          >
            <MdDeleteSweep /> Delete from Cart
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-primary'
            onClick={(e) =>
              addToCart({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                rating: product.rating,
                image: product.image,
              })
            }
          >
            <MdAddShoppingCart /> Add to Cart
          </button>
        )
      ) : (
        ''
      )}
    </Fragment>
  );
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  getProduct,
  deleteProduct,
  addToCart,
  deleteFromCart,
})(Product);
