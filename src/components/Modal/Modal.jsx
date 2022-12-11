import { Overlay, ModalBox } from './Modal.styled';

export const Modal = ({ tag, largeUrl }) => {
  return (
    <Overlay>
      <ModalBox>
        <img src={largeUrl} alt={tag} />
      </ModalBox>
    </Overlay>
  );
};
