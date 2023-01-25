import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-loader-spinner';
import c from './Loader.module.css';

const Loader = ({ colorLoader = '#3f51b5' }) => {
  return (
    <div className={c.Loader}>
      <Grid
        height="80"
        width="80"
        color={colorLoader}
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

Loader.propTypes = {
  colorLoader: PropTypes.string,
};

export default Loader;
