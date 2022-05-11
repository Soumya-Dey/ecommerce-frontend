import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { addProduct } from '../../actions/product';

const initialData = {
  title: '',
  description: '',
  price: '',
  rating: '',
};

const AddProduct = ({ addProduct }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);
  const { title, description, price, rating } = formData;

  // for title -> {prevData, title: value}
  const onChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.name === 'price' || event.target.name === 'rating'
          ? +event.target.value
          : event.target.value,
    });

  const onSubmit = (event) => {
    event.preventDefault();

    addProduct(formData);
    setFormData(initialData);

    navigate('/');
  };

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        <MdKeyboardArrowLeft /> Back
      </Link>
      <div className='product-form'>
        <div className='bg-primary p-custom-3 say-div'>
          <h3>Add a Product</h3>
        </div>
        <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
          <label htmlFor='title'>Product Name</label>
          <input
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            placeholder='Product Name'
            required
          ></input>

          <label htmlFor='description'>Product Description</label>
          <textarea
            id='description'
            name='description'
            cols='30'
            rows='5'
            value={description}
            onChange={(e) => onChange(e)}
            placeholder='Product description'
            required
          ></textarea>

          <label htmlFor='price'>Product Price</label>
          <input
            id='price'
            type='number'
            name='price'
            value={price}
            onChange={(e) => onChange(e)}
            placeholder='Product Price'
            required
          ></input>

          <label htmlFor='price'>Product Rating</label>
          <input
            id='rating'
            type='number'
            name='rating'
            value={rating}
            onChange={(e) => onChange(e)}
            placeholder='Product Rating'
            required
          ></input>

          <input
            type='submit'
            className='btn btn-dark my-1'
            value='Add Product'
          />
        </form>
      </div>
    </Fragment>
  );
};

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(null, { addProduct })(AddProduct);
