import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getZipCode
} from "use-places-autocomplete";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import axios from 'axios';
import { zip_code_key } from '../../../database/keys.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.getNearbyZipCodes = this.getNearbyZipCodes.bind(this);
  }

  handleChange(location) {
    this.setState({ location });
  }

  handleSelect() {
    const location = {address: this.state.location}
    console.log(location)
    getGeocode(location)
      .then((results) => getZipCode(results[0], false))
      .then((zipCode) => {
        console.log("ZIP Code: ", zipCode);
        const distance = 25;
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = `https://www.zipcodeapi.com/rest/${zip_code_key}/radius.json/${zipCode}/${distance}/mile`;
        return (
          axios({
            method: 'get',
            url: proxyurl + url,
          }));
      })
      .then((response) => {
        this.props.filterByZipCode(response.data.zip_codes);
        })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.location}
        onChange={this.handleChange}
        onSelect={() => this.handleSelect()}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search by zip code ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';

                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                 <span>{suggestion.description}</span>
                </div>
              );
            })}
            </div>
          </div>
      )}
      </PlacesAutocomplete>
    );
  }
}

export default SearchBar;
