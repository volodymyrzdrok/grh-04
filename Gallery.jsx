import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { SearchFormFoImg } from 'components/SearchForm/SearchFormFoImg';
import { createRef } from 'react';

export class Gallery extends Component {
  state = {
    photos: [],
    page: 1,
    query: 'cat',
    // query:'',
  };

  imagesRef = createRef();

  componentDidMount = async () => {
    const { photos } = await ImageService.getImages();
    this.setState({ photos });
  };

  getSnapshotBeforeUpdate(_, prevState) {
    if (prevState.photos.length !== this.state.photos.length) {
      console.log(window.scrollY);
      console.log(this.imagesRef.current?.scrollHeight);
      return (
        this.imagesRef.current?.scrollHeight +
          this.imagesRef.current?.offsetTop ?? null
      );
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchImages();
    }
    if (snapShot) {
      window.scrollTo({ top: snapShot, behavior: 'smooth' });
    }
  }

  fetchImages = async () => {
    const { photos } = await ImageService.getImages(
      this.state.query,
      this.state.page
    );
    this.setState(prev => ({
      photos: prev.page > 1 ? [...prev.photos, ...photos] : photos,
    }));
  };

  handlSearchSubmit = async query => {
    this.setState({ page: 1, query });
  };

  changePagesonClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    return (
      <>
        <SearchFormFoImg onSubmit={this.handlSearchSubmit} />
        <Grid ref={this.imagesRef}>
          {this.state.photos.map(({ id, avg_color, src, alt }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        <Button onClick={this.changePagesonClick}>Load more</Button>

        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
