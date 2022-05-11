import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  MdKeyboardArrowLeft,
  MdAddShoppingCart,
  MdDeleteSweep,
  MdStar,
  MdStarHalf,
  MdStarOutline,
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

  const filledStar = product ? Math.floor(+product.rating) : 0;
  const halfFilledStar = product
    ? +product.rating === Math.floor(+product.rating)
      ? 0
      : 1
    : 0;

  return loading || product === null ? (
    <Spinner />
  ) : (
    <div>
      <Link to='/' className='back text-dark'>
        <MdKeyboardArrowLeft /> Back to Products
      </Link>
      <div className='product product-details my-2'>
        <img src={product.image} alt={product.title} />
        <div className='product-inner'>
          <p className='product-text text-dark large mt-05'>{product.title}</p>
          <p className='product-text large text-danger m-0'>
            <span className='small'>₹</span> {product.price}
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
            {product.rating}
          </p>
          <p className='product-text'>{product.description}</p>
          {!cartLoading ? (
            cartItems.filter((p) => p.id === product.id).length ? (
              <button
                type='button'
                className='btn btn-dark mt-2'
                onClick={(e) => deleteFromCart(product.id)}
              >
                <MdDeleteSweep /> Delete from Cart
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-primary mt-2'
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
        </div>
      </div>
    </div>
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
