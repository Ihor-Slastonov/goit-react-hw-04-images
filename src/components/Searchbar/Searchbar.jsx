import PropTypes from 'prop-types';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';

import { Header, SearchForm, SearchBtn, SearchInput } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const onInputChange = e => {
    setSearchValue(e.currentTarget.value);
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      return toast.error('Ooops! It cannot be empty field');
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchBtn type="submit">
          <BsSearch size={22} />
        </SearchBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
          value={searchValue}
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes ={
  onSubmit: PropTypes.string.isRequired,
}
