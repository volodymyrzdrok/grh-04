import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import defaultContacts from './db/defaultData.json';
import Filter from './components/Filter/Filter';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AppPhonebook extends Component {
  static propTypes = {
    newObj: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  };

  state = {
    contacts: defaultContacts,
    filter: '',
  };

  addNewContact = newObj => {
    const items = this.state.contacts;
    const foundEl = items.find(
      el => el.name.toLowerCase() === newObj.name.toLowerCase()
    );
    if (foundEl) {
      alert(`${foundEl.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newObj],
      }));
    }
  };

  removeOneContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== idContact),
    }));
  };

  changeFilterValue = e => {
    const value = e.target.value.trim().toLowerCase();
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };
  componentDidMount() {
    const parsedPhonebook = JSON.parse(localStorage.getItem('phonebook'));

    if (parsedPhonebook) this.setState({ contacts: parsedPhonebook });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          fontSize: 20,
          backgroundColor: ' #222',
          color: '#fff',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <button>
            <Link
              style={{
                marginTop: '10px',
              }}
              to="/"
            >
              Home
            </Link>
          </button>
          <h2>Phonebook</h2>
          <ContactForm addContact={this.addNewContact} />
          <Filter changeFilterValue={this.changeFilterValue} />
          <h3>Contacts</h3>
          <ContactList
            items={this.filterContacts()}
            removeContact={this.removeOneContact}
          />
        </div>
      </div>
    );
  }
}

export default AppPhonebook;
