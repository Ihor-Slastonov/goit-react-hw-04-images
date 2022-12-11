import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

import { fetchImages } from 'services/imageApi';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    images: null,
    isLoading: false,
    loadMore: false,
    pageNumber: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      try {
        this.setState({
          isLoading: true,
          images: null,
          loadMore: false,
          pageNumber: 1,
        });
        await this.fetchGallery();
      } catch (error) {
        console.log(error);
      }
    }
  }

  fetchGallery = async () => {
    try {
      const searchValue = this.props.value;
      const page = 1;

      const images = await fetchImages(page, searchValue);
      if (images.hits.length === 0) {
        return toast.error(
          "Sorry, images not found😥... But you can try: 'Jam🍯'"
        );
      }
      if (images.hits.length > 0 && images.totalHits <= 12) {
        this.setState({
          images: images.hits,
        });
        return toast("Oh, but that's all?! But you can try: 'Dog🐶'");
      }
      if (images.hits.length > 0 && images.totalHits > 12) {
        this.setState(prevState => ({
          images: images.hits,
          loadMore: true,
          pageNumber: prevState.pageNumber + 1,
        }));
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    try {
      const searchValue = this.props.value;
      const page = this.state.pageNumber;
      this.setState({ isLoading: true });

      const images = await fetchImages(page, searchValue);
      if (images.hits.length === 0) {
        return toast.error('Please try something else');
      }
      if (images.hits.length < 12) {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loadMore: false,
          pageNumber: 1,
        }));
        toast("Oh, but that's all?! But you can try: 'Dog🐶'");
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        pageNumber: prevState.pageNumber + 1,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, loadMore } = this.state;

    return (
      <>
        <Gallery className="gallery">
          {images &&
            images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  url={image.webformatURL}
                  tag={image.tags}
                  largeImageUrl={image.largeImageURL}
                />
              );
            })}
        </Gallery>
        {isLoading && <Loader />}
        {loadMore && <Button onClick={this.onLoadMore} />}
      </>
    );
  }
}
