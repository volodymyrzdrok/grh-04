import { useCallback, useState } from 'react';
export const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState(state => !state), []);

  return [state, toggle];
};
// export const useToggle = (initialState = false) => {
//   // const [isOpen, setIsOpen] = useState(initialState);
//   const [state, setState] = useState(initialState);
//   const open = () => setState(true);
//   const close = () => setState(false);
//   const toggle = () => setState(isOpen => !isOpen);

//   return { state: [state], open, close, toggle };
// };
