import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import CartItem from './CartItem';

const Cart = ({ cart: { products, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Your Cart</h1>
      <div className='posts'>
        {products.map((product) => (
          <CartItem key={product.id} product={product} margin={2} />
        ))}
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);