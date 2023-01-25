import React from 'react';
import PropTypes from 'prop-types';
import c from './Filter.module.css';

const Filter = ({ changeFilterValue }) => {
  return (
    <label htmlFor="" className={c.label}>
      Find contact by name
      <input
        onInput={changeFilterValue}
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </label>
  );
};

Filter.propTypes = {
  changeFilterValue: PropTypes.func,
};

export default Filter;
