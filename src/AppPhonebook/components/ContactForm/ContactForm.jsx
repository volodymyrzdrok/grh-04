import React, { Component } from 'react';
import c from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };
  onSubmitForm = e => {
    e.preventDefault();
    const nameValue = e.target.name.value.trim();
    const numberValue = e.target.number.value.trim();
    const newObj = {
      name: nameValue,
      number: numberValue,
      id: nanoid(),
    };
    this.props.addContact(newObj);
    e.target.reset();
  };

  render() {
    return (
      <form className={c.form} onSubmit={this.onSubmitForm}>
        <label htmlFor="" className={c.label}>
          name
          <input
            className={c.nameInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="" className={c.label}>
          number
          <input
            className={c.numberInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={c.formBtn}>Add contact</button>
      </form>
    );
  }
}
