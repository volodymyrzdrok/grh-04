import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import c from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  static propTypes = { list: PropTypes.array, takeLargeImgUrl: PropTypes.func };
  listRef = createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      window.scrollTo({ top: snapshot, behavior: 'smooth' });
    }
  }

  render() {
    return (
      <ul className={c.ImageGallery} ref={this.listRef}>
        {this.props.list.map(el => (
          <ImageGalleryItem
            key={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            tags={el.tags}
            takeLargeImgUrl={this.props.takeLargeImgUrl}
          />
        ))}
      </ul>
    );
  }
}
