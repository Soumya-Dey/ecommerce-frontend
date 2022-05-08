import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../layouts/Spinner';
import ProductItem from '../products/ProductItem';
import { getProduct } from '../../actions/product';

const Product = ({ getProduct, product: { product, loading } }) => {
  const { productId } = useParams();
  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  return loading || product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Products
      </Link>
      <ProductItem product={product} margin={1} />
    </Fragment>
  );
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProduct })(Product);
