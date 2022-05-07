import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layouts/Spinner';
import ProductItem from './ProductItem';
import { getAllProducts } from '../../actions/product';

const Products = ({ getAllProducts, product: { products, loading } }) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Products</h1>
      <div className='posts'>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} margin={2} />
        ))}
      </div>
    </Fragment>
  );
};

Products.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getAllProducts })(Products);
