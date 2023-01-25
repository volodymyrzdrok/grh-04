import PropTypes from 'prop-types';
import c from './ContactList.module.css';
import React, { Component } from 'react';

class ContactList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    removeContact: PropTypes.func,
  };

  shouldComponentUpdate(prevProps) {
    if (prevProps.items === this.props.items) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <ul className={c.list}>
        {this.props.items.map(({ id, name, number }) => (
          <li className={c.item} key={id}>
            <p>{name}</p>
            <p>{number}</p>
            <button
              className={c.btn}
              onClick={() => this.props.removeContact(id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;
