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

// export class ImageGalleryItem extends Component {
//   static propTypes = {
    // url: PropTypes.string.isRequired,
    // tag: PropTypes.string.isRequired,
    // largeImageUrl: PropTypes.string.isRequired,
//   };
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   render() {
//     const { url, tag, largeImageUrl } = this.props;
//     return (
//       <>
//         <GalleryItem>
//           <ItemImage src={url} alt={tag} onClick={this.toggleModal} />
//         </GalleryItem>
//         {this.state.showModal && (
//           <Modal
//             largeImageUrl={largeImageUrl}
//             tag={tag}
//             toggleModal={this.toggleModal}
//           />
//         )}
//       </>
//     );
//   }
// }
