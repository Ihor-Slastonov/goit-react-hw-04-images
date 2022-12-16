import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <SearchBar onSubmit={setSearchValue} />
      <ImageGallery value={searchValue} />

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
};
