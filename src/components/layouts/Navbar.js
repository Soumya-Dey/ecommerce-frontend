import React, { useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MdShoppingCart, MdLibraryAdd } from 'react-icons/md';

const Navbar = ({ cart: { products: cartItems, loading } }) => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [params]);

  const links = (
    <ul>
      <li>
        <Link to='/'>Products</Link>
      </li>
      <li>
        <Link to='/add-product'>
          <MdLibraryAdd /> Add a product
        </Link>
      </li>
      <li>
        <Link to='/cart'>
          <MdShoppingCart /> Cart [{!loading ? cartItems.length : 0}]
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>eCommerce</h1>
      <Fragment>{links}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {})(Navbar);
