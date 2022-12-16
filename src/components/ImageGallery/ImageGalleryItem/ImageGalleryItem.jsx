import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, tag, largeImageUrl }) => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal)
  }

  return (
    <>
      <GalleryItem>
        <ItemImage src={url} alt={tag} onClick={toggleModal} />
      </GalleryItem>
      {showModal && (
        <Modal
          largeImageUrl={largeImageUrl}
          tag={tag}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
