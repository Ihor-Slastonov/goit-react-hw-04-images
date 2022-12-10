
import PropTypes from 'prop-types';

import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({url}) => {
    return (
      <GalleryItem>
        <ItemImage src={url} alt="" />
      </GalleryItem>
    );
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
}