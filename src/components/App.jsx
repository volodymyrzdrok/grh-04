import AppImageFinder from '../AppImageFinder/AppImageFinder';
import AppPhonebook from '../AppPhonebook/AppPhonebook';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imagefinder" element={<AppImageFinder />} />
      <Route path="/phonebook" element={<AppPhonebook />} />
    </Routes>
  );
};
