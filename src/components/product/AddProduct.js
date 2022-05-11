import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

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
    <div>
      <h1 className='medium text-dark text-up'>Add Product</h1>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <div>
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
        </div>

        <div>
          <label htmlFor='description'>Product Description</label>
          <textarea
            id='description'
            name='description'
            cols='30'
            rows='4'
            value={description}
            onChange={(e) => onChange(e)}
            placeholder='Product description'
            required
          ></textarea>
        </div>

        <div className='inner-form'>
          <div>
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
          </div>

          <div>
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
          </div>
        </div>

        <div className='inner-form form-action'>
          <input
            type='submit'
            className='btn btn-primary'
            value='Add Product'
          />
          <Link to='/' className='btn btn-light'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(null, { addProduct })(AddProduct);
