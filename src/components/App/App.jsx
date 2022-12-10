import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchValue: '',
  };

  onSearchSubmit = searchValue => {
    this.setState({
      searchValue,
    });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageGallery value={this.state.searchValue} />

        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </>
    );
  }
}
