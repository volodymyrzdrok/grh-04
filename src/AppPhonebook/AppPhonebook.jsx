import React, { useState, useMemo } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import defaultContacts from './db/defaultData.json';
import Filter from './components/Filter/Filter';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'hooks/useLocalStorage';

const AppPhonebook = props => {
  const [contacts, setContacts] = useLocalStorage('phonebook', defaultContacts);
  const [filter, setFilter] = useState('');

  const addNewContact = newObj => {
    const foundEl = contacts.find(
      el => el.name.toLowerCase() === newObj.name.toLowerCase()
    );
    if (foundEl) {
      alert(`${foundEl.name} is already in contacts`);
    } else {
      setContacts(prevContacts => [...prevContacts, newObj]);
    }
  };

  const removeOneContact = idContact => {
    const newArr = contacts.filter(el => el.id !== idContact);
    setContacts(newArr);
  };

  const changeFilterValue = e => {
    const value = e.target.value.trim().toLowerCase();

    setFilter(value);
  };

  const filterContacts = useMemo(() => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  }, [filter, contacts]);

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
        <button
          style={{
            marginTop: '20px',
          }}
        >
          <Link to="/">Home</Link>
        </button>
        <h2>Phonebook</h2>
        <ContactForm addContact={addNewContact} />
        <Filter changeFilterValue={changeFilterValue} />
        <h3>Contacts</h3>
        <ContactList items={filterContacts} removeContact={removeOneContact} />
      </div>
    </div>
  );
};

AppPhonebook.propTypes = {
  newObj: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};

export default AppPhonebook;

// class AppPhonebook extends Component {
//   static propTypes = {
//     newObj: PropTypes.objectOf(
//       PropTypes.shape({
//         name: PropTypes.string,
//         number: PropTypes.string,
//         id: PropTypes.string,
//       })
//     ),
//   };

//   state = {
//     contacts: defaultContacts,
//     filter: '',
//   };

// addNewContact = newObj => {
//   const items = state.contacts;
//   const foundEl = items.find(
//     el => el.name.toLowerCase() === newObj.name.toLowerCase()
//   );
//   if (foundEl) {
//     alert(`${foundEl.name} is already in contacts`);
//   } else {
//     setState(prevState => ({
//       contacts: [...prevState.contacts, newObj],
//     }));
//   }
// };

// removeOneContact = idContact => {
//   setState(prevState => ({
//     contacts: prevState.contacts.filter(el => el.id !== idContact),
//   }));
// };

// changeFilterValue = e => {
//   const value = e.target.value.trim().toLowerCase();
//   setState({ filter: value });
// };

// filterContacts = () => {
//   const { contacts, filter } = state;
//   return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
// };
// componentDidMount() {
//   const parsedPhonebook = JSON.parse(localStorage.getItem('phonebook'));

//   if (parsedPhonebook) setState({ contacts: parsedPhonebook });
// }
// componentDidUpdate(prevProps, prevState) {
//   if (state.contacts !== prevState.contacts) {
//     localStorage.setItem('phonebook', JSON.stringify(state.contacts));
//   }
// }

//   render() {
//     return (
// <div
//   style={{
//     display: 'flex',
//     justifyContent: 'space-around',
//     fontSize: 20,
//     backgroundColor: ' #222',
//     color: '#fff',
//     minHeight: '100vh',
//   }}
// >
//   <div
//     style={{
//       display: 'flex',
//       flexDirection: 'column',
//     }}
//   >
//     <button
//       style={{
//         marginTop: '20px',
//       }}
//     >
//       <Link to="/">Home</Link>
//     </button>
//     <h2>Phonebook</h2>
//     <ContactForm addContact={addNewContact} />
//     <Filter changeFilterValue={changeFilterValue} />
//     <h3>Contacts</h3>
//     <ContactList
//       items={filterContacts()}
//       removeContact={removeOneContact}
//     />
//   </div>
// </div>
//     );
//   }
// }

// export default AppPhonebook;
