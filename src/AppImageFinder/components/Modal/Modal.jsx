import React, { Component } from 'react';
import PropTypes from 'prop-types';
import c from './Modal.module.css';
import { createPortal } from 'react-dom';
import Loader from '../Loader/Loader';

const modalRoot = document.querySelector('#modalRoot');

export default class Modal extends Component {
  static propTypes = {
    largeImg: PropTypes.string,
    imgDescription: PropTypes.string,
    closeModal: PropTypes.func,
  };
  state = {
    loading: false,
  };

  timerId = null;

  componentDidMount() {
    this.setState({ loading: true });
    window.addEventListener('keydown', this.closeModalOnEscape);

    this.timerId = setTimeout(() => {
      this.setState({ loading: false });
    }, 270);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalOnEscape);
    clearTimeout(this.timerId);
  }

  closeModalOnEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeModalOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { loading } = this.state;
    const { largeImg, imgDescription } = this.props;

    return createPortal(
      <div className={c.Overlay} onClick={this.closeModalOnBackdrop}>
        <div className={c.Modal}>
          {loading ? (
            <Loader colorLoader="#fff" />
          ) : (
            <img src={largeImg} alt={imgDescription} />
          )}
        </div>
      </div>,
      modalRoot
    );
  }
}
