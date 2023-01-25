import React from 'react';
import PropTypes from 'prop-types';
import c from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  takeLargeImgUrl,
  webformatURL,
  largeImageURL,
  tags,
}) => {
  const getLargeImgUrl = e => {
    const imgEl = e.target;
    if (imgEl === e.currentTarget) {
      takeLargeImgUrl(imgEl.dataset.largeimg, imgEl.getAttribute('alt'));
    }
  };

  return (
    <li className={c.ImageGalleryItem}>
      <img
        onClick={getLargeImgUrl}
        className={c['ImageGalleryItem-image']}
        src={webformatURL}
        data-largeimg={largeImageURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  takeLargeImgUrl: PropTypes.func,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
