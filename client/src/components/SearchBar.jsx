import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getZipCode
} from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import regeneratorRuntime from "regenerator-runtime";
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
      location: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getNearbyZipCodes = this.getNearbyZipCodes.bind(this);
  }

  handleInput(location) {
    // const { value } = event.target;
    // console.log('searchbar text: ', event.target);
    this.setState({ location });
  }

  handleSelect() {
    const { location } = this.state;
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {console.log('Success', latLng)
        return (
          axios(`https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius/ByLatLon?latitude=${latLng.lat}&longitude=${latLng.lng}&minimumradius=0&maximumradius=20&key=${zip_code_key}`, {
            method: 'get',
            mode: 'no-cors',
            crossDomain: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
          })
        );
    })
      .catch(error => console.error('Error', error));
  };

  getNearbyZipCodes() {
    const location = { address: this.state.location };
    const distance = 20;
    console.log(zip_code_key)
    getGeocode(location)
    .then((results) => getZipCode(results[0], false))
    .then((zipCode) => {
      console.log("ZIP Code: ", zipCode);
      return (
        axios({
          method: 'get',
          url: `https://www.zipcodeapi.com/rest/${zip_code_key}/radius.json/94085/${distance}/mile`,
          mode: 'no-cors',
          crossDomain: true,
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          credentials: 'same-origin',
        }));
    })
    .then((response) => console.log(response))
    .catch((error) => {
      console.log("Error:", error);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('state:', this.state)
    this.props.filterMovies(this.state.text);
    this.setState({ text: ''})
  }

  render() {
    return (
      <PlacesAutocomplete
      value={this.state.location}
      onChange={this.handleInput}
      onSelect={() => {this.handleSelect(); this.getNearbyZipCodes()}}
      >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Enter Postal Code ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
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

      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <input
      //       type = "text"
      //       placeholder = "Enter Location..."
      //       value = {this.state.text}
      //       onChange = {this.handleInput}
      //       />
      //     <input type = "submit" value = "go!" />
      //   </form>

      //   <GooglePlacesAutocomplete
      //     onSelect={console.log}
      //   />
      // </div>
    );
  }
}

export default SearchBar;
