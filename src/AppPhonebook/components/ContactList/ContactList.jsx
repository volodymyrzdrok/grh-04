import PropTypes from 'prop-types';
import c from './ContactList.module.css';

const ContactList = ({ removeContact, items }) => {
  console.log('1');
  return (
    <ul className={c.list}>
      {items.map(({ id, name, number }) => (
        <li className={c.item} key={id}>
          <p>{name}</p>
          <p>{number}</p>
          <button className={c.btn} onClick={() => removeContact(id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  removeContact: PropTypes.func,
};

export default ContactList;

// class ContactList extends Component {
//   static propTypes = {
//     items: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string,
//         number: PropTypes.string,
//         id: PropTypes.string,
//       })
//     ),
//     removeContact: PropTypes.func,
//   };

//   shouldComponentUpdate(prevProps) {
//     if (prevProps.items === this.props.items) {
//       return false;
//     }
//     return true;
//   }

//   render() {
//     return (
// <ul className={c.list}>
//   {this.props.items.map(({ id, name, number }) => (
//     <li className={c.item} key={id}>
//       <p>{name}</p>
//       <p>{number}</p>
//       <button
//         className={c.btn}
//         onClick={() => this.props.removeContact(id)}
//       >
//         delete
//       </button>
//     </li>
//   ))}
// </ul>
//     );
//   }
// }

// export default ContactList;
