import React from 'react';
import PropTypes from 'prop-types';
import c from './Searchbar.module.css';
import { Link } from 'react-router-dom';

const Searchbar = ({ newValue }) => {
  const onSubmitForm = e => {
    e.preventDefault();
    const searchInputValue = e.target.input.value.trim().toLowerCase();
    if (!searchInputValue) return;
    newValue(searchInputValue);
    e.target.reset();
  };

  return (
    <header className={c.Searchbar}>
      <button
        style={{
          marginRight: '10px',
        }}
      >
        <Link to="/ghr-03">Home</Link>
      </button>
      <form className={c.SearchForm} onSubmit={onSubmitForm}>
        <button type="submit" className={c['SearchForm-button']}>
          <span className={c['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={c['SearchForm-input']}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  newValue: PropTypes.func,
};

export default Searchbar;
