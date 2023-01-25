import React, { Component } from 'react';
import apiService, { per_page } from './api/api-service';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import c from './AppImageFinder.module.css';

export default class AppImageFinder extends Component {
  state = {
    searchValue: '',
    images: [],
    largeImgUrl: '',
    imgDesc: '',
    showModal: false,
    loader: false,
    page: 1,
    totalItemsBd: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const newValue = this.state.searchValue;
    const prevValue = prevState.searchValue;
    const newPage = this.state.page;
    const prevPage = prevState.page;

    if (newValue !== prevValue) {
      this.setState({ images: [], page: 1 });
      this.getImageFromApi(newValue, newPage);
      window.scrollTo({ top: 10, behavior: 'smooth' });
    }
    if (newPage > prevPage) {
      this.getImageFromApi(newValue, newPage);
    }
  }

  getImageFromApi = async (newValue, newPage) => {
    this.setState({ loader: true });
    try {
      const result = await apiService(newValue, newPage);
      this.setState({ totalItemsBd: result.totalHits });
      this.setState(prevState => ({
        images: [...prevState.images, ...result.hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  };

  changeSearchValue = newValue => {
    this.setState({ searchValue: newValue });
  };

  toogleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  getLargeImgForModal = (imgUrl, textImgUrl) => {
    this.setState({ largeImgUrl: imgUrl });
    this.setState({ imgDesc: textImgUrl });
    this.toogleModal();
  };
  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  totalLoadedItems() {
    const { page, totalItemsBd } = this.state;
    return per_page * page < totalItemsBd && totalItemsBd !== 0;
  }

  render() {
    const { showModal, largeImgUrl, imgDesc, images, loader } = this.state;
    return (
      <div className={c.App}>
        <Searchbar newValue={this.changeSearchValue} />
        <main>
          {images.length > 0 && (
            <ImageGallery
              list={images}
              takeLargeImgUrl={this.getLargeImgForModal}
            />
          )}
          {loader && <Loader />}
        </main>
        {this.totalLoadedItems() && <Button changePage={this.changePage} />}

        {showModal && (
          <Modal
            loading={loader}
            largeImg={largeImgUrl}
            imgDescription={imgDesc}
            closeModal={this.toogleModal}
          />
        )}
      </div>
    );
  }
}
