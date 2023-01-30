import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import c from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { scrollSmoth } from 'utils/scrollSmoth';
import { per_page } from 'AppImageFinder/api/api-service';

const ImageGallery = ({ list, takeLargeImgUrl }) => {
  const listRef = useRef();

  useEffect(() => {
    const itemsLength = listRef.current.children.length;

    if (itemsLength > per_page) {
      scrollSmoth(listRef.current);
    }
  }, [list]);

  return (
    <ul className={c.ImageGallery} ref={listRef}>
      {list.map(el => (
        <ImageGalleryItem
          key={el.id}
          webformatURL={el.webformatURL}
          largeImageURL={el.largeImageURL}
          tags={el.tags}
          takeLargeImgUrl={takeLargeImgUrl}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  list: PropTypes.array,
  takeLargeImgUrl: PropTypes.func,
};

export default ImageGallery;

// const scrollSmoth = domEL => {
//   const { height: cardHeight } =
//     domEL.firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// };

// export default class ImageGallery extends Component {
//   static propTypes = { list: PropTypes.array, takeLargeImgUrl: PropTypes.func };
//   listRef = createRef();

// getSnapshotBeforeUpdate(prevProps, prevState) {
//   if (prevProps.list.length < this.props.list.length) {
//     const list = this.listRef.current;
//     return list.scrollHeight - list.scrollTop;
//   }

//   return null;
// }

// componentDidUpdate(prevProps, prevState, snapshot) {
//   if (snapshot) {
//     window.scrollTo({ top: snapshot, behavior: 'smooth' });
//   }
// }

//   render() {
//     return (
// <ul className={c.ImageGallery} ref={this.listRef}>
//   {this.props.list.map(el => (
//     <ImageGalleryItem
//       key={el.id}
//       webformatURL={el.webformatURL}
//       largeImageURL={el.largeImageURL}
//       tags={el.tags}
//       takeLargeImgUrl={this.props.takeLargeImgUrl}
//     />
//   ))}
// </ul>
//     );
//   }
// }
