import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';

import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    largeUrl: PropTypes.string.isRequired,
  };
  state = {
    isOpen: false
  }

  toggleModal = ()=>{
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { url, tag, largeUrl } = this.props;
    return (
      <>
        <GalleryItem>
          <ItemImage src={url} alt={tag} onClick={this.toggleModal} />
        </GalleryItem>
        {this.state.isOpen && <Modal largeUrl={largeUrl} tag={tag} />}
      </>
    );
  }
}
