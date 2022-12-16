import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

import { fetchImages } from 'services/imageApi';

import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({ value }) => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const images = await fetchImages(1, value);
        if (images.hits.length === 0) {
          return toast.error(
            "Sorry, images not found😥... But you can try: 'Jam🍯'"
          );
        }
        if (images.hits.length > 0 && images.totalHits <= 12) {
          setImages(images.hits);
          return toast("Oh, but that's all?! But you can try: 'Dog🐶'");
        }
        if (images.hits.length > 0 && images.totalHits > 12) {
          setImages(images.hits);
          setLoadMore(true);
          setPageNumber(prevState => prevState + 1);
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (value === '') {
      return;
    }
    setIsLoading(true);
    setImages(null);
    setLoadMore(false);
    setPageNumber(1);
    fetchGallery();
  }, [value]);

  const onLoadMore = async () => {
    try {
      const searchValue = value;
      const page = pageNumber;
      setIsLoading(true);

      const images = await fetchImages(page, searchValue);
      if (images.hits.length === 0) {
        return toast.error('Please try something else');
      }
      if (images.hits.length < 12) {
        setImages(prevState => [...prevState, ...images.hits]);
        setLoadMore(false);
        setPageNumber(1);
        toast("Oh, but that's all?! But you can try: 'Dog🐶'");
        return;
      }
      setImages(prevState => [...prevState.images, ...images.hits]);
      setPageNumber(prevState => prevState + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {loadMore && <Button onClick={onLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
