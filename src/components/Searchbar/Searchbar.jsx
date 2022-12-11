import PropTypes from 'prop-types';

import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';

import { Header, SearchForm, SearchBtn, SearchInput } from './Searchbar.styled';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  onInputChange = e => {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  };

  onSubmit = e => {
    const { searchValue } = this.state;

    e.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Ooops! It cannot be empty field');
      return;
    }

    this.props.onSubmit(searchValue.trim());
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchBtn type="submit">
            <BsSearch size={22} />
          </SearchBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.searchValue}
          />
        </SearchForm>
      </Header>
    );
  }
}
