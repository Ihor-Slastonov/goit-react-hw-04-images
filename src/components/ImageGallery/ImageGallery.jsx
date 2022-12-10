import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

import { fetchImages } from 'services/imageApi';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

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
        this.setState({ isLoading: true });
        const images = await fetchImages(
          this.state.pageNumber,
          this.props.value
        );

        if (images.hits.length === 0) {
          return toast.error(
            "Sorry, images not found😥... But you can try: 'Jam'"
          );
        }
        this.setState({ images: images.hits });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, isLoading } = this.state;

    return (
      <>
        <Gallery className="gallery">
          {images &&
            images.map(image => {
              return (
                <ImageGalleryItem key={image.id} url={image.webformatURL} />
              );
            })}
        </Gallery>
        {isLoading && <Loader />}
      </>
    );
  }
}
