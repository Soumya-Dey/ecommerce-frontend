import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  // links to show when user is not logged in
  const links = (
    <ul>
      <li>
        <Link to='/'>Products</Link>
      </li>
      <li>
        <Link to='/add-product'>Add a product</Link>
      </li>
      <li>
        <Link to='/cart'>Cart</Link>
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

Navbar.propTypes = {};

// const mapStateToProps = (state) => ({
//     cart: state.cart,
// });

export default connect(null, {})(Navbar);
