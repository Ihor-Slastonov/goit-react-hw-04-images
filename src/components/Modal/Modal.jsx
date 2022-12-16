import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalBox } from './Modal.styled';

export const Modal = ({ tag, largeImageUrl, toggleModal }) => {
  useEffect(() => {
    function onKeyClose(e) {
      if (e.code === 'Escape') {
        toggleModal();
      }
    }
    window.addEventListener('keydown', onKeyClose);
    return () => {
      window.removeEventListener('keydown', onKeyClose);
    };
  }, [toggleModal]);

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
      return toggleModal();
    }
  }

  return (
    <Overlay onClick={onOverlayClick} id="overlay">
      <ModalBox>
        <img src={largeImageUrl} alt={tag} />
      </ModalBox>
    </Overlay>
  );
};

Modal.propTypes = {
  tag: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
