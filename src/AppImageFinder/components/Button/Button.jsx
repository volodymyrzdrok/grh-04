import React from 'react';
import PropTypes from 'prop-types';
import c from './Button.module.css';

const Button = ({ changePage }) => {
  return (
    <footer className={c.footer}>
      <button onClick={changePage} className={c.Button}>
        Load more
      </button>
    </footer>
  );
};

Button.propTypes = {
  changePage: PropTypes.func,
};

export default Button;
