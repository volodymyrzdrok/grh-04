import { memo } from 'react';
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
      takeLargeImgUrl(largeImageURL, tags);
    }
  };

  return (
    <li className={c.ImageGalleryItem}>
      <img
        onClick={getLargeImgUrl}
        className={c['ImageGalleryItem-image']}
        src={webformatURL}
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
