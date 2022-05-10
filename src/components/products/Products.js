import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiFillCloseCircle } from 'react-icons/ai';

import Spinner from '../layouts/Spinner';
import ProductItem from './ProductItem';
import { getAllProducts } from '../../actions/product';

const Products = ({ getAllProducts, product: { products, loading } }) => {
  const [filter, setFilter] = useState('id');

  useEffect(() => {
    getAllProducts(filter);
  }, [getAllProducts, filter]);

  return (
    <Fragment>
      <div className='product'>
        <h1 className='medium text-dark text-up'>Products</h1>
        {filter === 'price' ? (
          <button
            type='button'
            className='btn btn-primary btn-rounded'
            onClick={(e) => setFilter('id')}
          >
            Sort by Price &nbsp;
            <AiFillCloseCircle />
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-light btn-rounded'
            onClick={(e) => {
              setFilter('price');
              getAllProducts('price');
            }}
          >
            Sort by Price
          </button>
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='products'>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} margin={2} />
          ))}
        </div>
      )}
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
