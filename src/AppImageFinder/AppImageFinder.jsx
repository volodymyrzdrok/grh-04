import React, { useState, useEffect, useCallback } from 'react';
import apiService, { per_page } from './api/api-service';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import c from './AppImageFinder.module.css';
import { useToggle } from 'hooks/useToggle';

const AppImageFinder = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [imgDesc, setImgDesc] = useState('');
  const [page, setPage] = useState(1);
  const [totalItemsBd, setTotalItemsbd] = useState(null);
  const [loader, setLoader] = useToggle();
  const [showModal, setShowModal] = useToggle();

  const getImageFromApi = useCallback(
    async (newValue, newPage) => {
      setLoader(true);
      try {
        const result = await apiService(newValue, newPage);
        setImages(prevImages => [...prevImages, ...result.hits]);
        setTotalItemsbd(result.totalHits);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    },
    [setLoader]
  );

  useEffect(() => {
    if (searchValue) {
      getImageFromApi(searchValue, 1);
      window.scrollTo({ top: 10, behavior: 'smooth' });
    }
  }, [searchValue, getImageFromApi]);

  useEffect(() => {
    if (page > 1) {
      getImageFromApi(searchValue, page);
    }
  }, [page, searchValue, getImageFromApi]);

  const changeSearchValue = newValue => {
    setSearchValue(newValue);
    setImages([]);
    setPage(1);
  };

  const getLargeImgForModal = (imgUrl, textImgUrl) => {
    setLargeImgUrl(imgUrl);
    setImgDesc(textImgUrl);
    setShowModal();
  };
  const changePage = () => {
    setPage(page + 1);
  };

  const totalLoadedItems = () => {
    return per_page * page < totalItemsBd && totalItemsBd !== 0;
  };

  return (
    <div className={c.App}>
      <Searchbar newValue={changeSearchValue} />
      <main>
        {images.length > 0 && (
          <ImageGallery list={images} takeLargeImgUrl={getLargeImgForModal} />
        )}
        {loader && <Loader />}
      </main>
      {totalLoadedItems() && <Button changePage={changePage} />}

      {showModal && (
        <Modal
          loading={loader}
          largeImg={largeImgUrl}
          imgDescription={imgDesc}
          closeModal={setShowModal}
        />
      )}
    </div>
  );
};

export default AppImageFinder;

//
//
// class f extends Component {
//   // state = {
//   //   searchValue: '',
//   //   images: [],
//   //   largeImgUrl: '',
//   //   imgDesc: '',
//   //   showModal: false,
//   //   loader: false,
//   //   page: 1,
//   //   totalItemsBd: 0,
//   // };

// componentDidUpdate(prevProps, prevState) {
//   const newValue = state.searchValue;
//   const prevValue = prevState.searchValue;
//   const newPage = state.page;
//   const prevPage = prevState.page;

//   if (newValue !== prevValue) {
//     setState({ images: [], page: 1 });
//     getImageFromApi(newValue, 1);
//     window.scrollTo({ top: 10, behavior: 'smooth' });
//   }
//   if (newPage > prevPage) {
//     getImageFromApi(newValue, newPage);
//   }
// }

//   // getImageFromApi = async (newValue, newPage) => {
//   //   setState({ loader: true });
//   //   try {
//   //     const result = await apiService(newValue, newPage);
//   //     setState(prevState => ({
//   //       images: [...prevState.images, ...result.hits],
//   //       totalItemsBd: result.totalHits,
//   //     }));
//   //   } catch (error) {
//   //     console.error(error);
//   //   } finally {
//   //     setState({ loader: false });
//   //   }
//   // };

//   // changeSearchValue = newValue => {
//   //   setState({ searchValue: newValue });
//   // };

//   // toogleModal = () => {
//   //   setState(prevState => ({ showModal: !prevState.showModal }));
//   // };

//   // getLargeImgForModal = (imgUrl, textImgUrl) => {
//   //   setState({ largeImgUrl: imgUrl, imgDesc: textImgUrl });
//   //   toogleModal();
//   // };
//   // changePage = () => {
//   //   setState(prevState => ({ page: prevState.page + 1 }));
//   // };

//   // totalLoadedItems() {
//   //   const { page, totalItemsBd } = state;
//   //   return per_page * page < totalItemsBd && totalItemsBd !== 0;
//   // }

//   render() {
//     const { showModal, largeImgUrl, imgDesc, images, loader } = state;
//     return (
//       <div className={c.App}>
//         <Searchbar newValue={changeSearchValue} />
//         <main>
//           {images.length > 0 && (
//             <ImageGallery
//               list={images}
//               takeLargeImgUrl={getLargeImgForModal}
//             />
//           )}
//           {loader && <Loader />}
//         </main>
//         {totalLoadedItems() && <Button changePage={changePage} />}

//         {showModal && (
//           <Modal
//             loading={loader}
//             largeImg={largeImgUrl}
//             imgDescription={imgDesc}
//             closeModal={toogleModal}
//           />
//         )}
//       </div>
//     );
//   }
// }

// це гарно працює ! внизу
// useEffect(() => {
//   if (searchValue) {
//     setImages([]);
//     setPage(1);
//     getImageFromApi(searchValue, 1);
//     window.scrollTo({ top: 10, behavior: 'smooth' });
//   }
// }, [searchValue]);

// useEffect(() => {
//   if (page > 1) {
//     getImageFromApi(searchValue, page);
//   }
// }, [page]);
//
