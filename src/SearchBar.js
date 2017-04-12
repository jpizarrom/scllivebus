
import React, { PropTypes } from 'react';

class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string
  };
  static defaultProps = {
    placeholder: 'placeholder'
  };

  onInputChange(term) {
    this.props.onTermChange(term);
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div className="search">
        <input placeholder={placeholder} onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }
}

export default SearchBar;