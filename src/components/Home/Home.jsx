import React from 'react';

import c from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <div className={c.container}>
      <button>
        <Link to="/phonebook">Phonebook</Link>
      </button>
      <button>
        <Link to="/imagefinder">ImageFinder</Link>
      </button>
    </div>
  );
};

export default Home;
