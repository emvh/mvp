import React from 'react';

class EventForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: '',
      venue: '',
      venue_address: '',
      city: '',
      state_abbr: '',
      zip_code: '',
      country: '',
      longitude: '',
      latitude: '',
      url: '',
      start_time: '',
      stop_time: '',
      description: '',
      category: '',
      image: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addEvent } = this.props;
    console.log('handleSubmit');
    const newEvent = this.state;
    console.log(newEvent);
    addEvent(newEvent);
  }

  render() {
    return (
      <div>
        <h2>Basic Info</h2>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label>Event Title </label>
            <input
              type="text"
              name="title"
              onChange={this.handleChange} >
            </input>

            <label>Event Date </label>
            <input
              type="text"
              name="start_time"
              onChange={this.handleChange} >
            </input>

            <label>Event End Date  </label>
            <input
              type="text"
              name="end_time"
              onChange={this.handleChange} >
            </input>
          </div>

          <div>
            <label>Venue Name </label>
            <input type="text" name="venue" onChange={this.handleChange}></input>
            <label>Address </label>
            <input type="text" name="venue_address" onChange={this.handleChange}></input>
            <label>City </label>
            <input type="text" name="city" onChange={this.handleChange}></input>
            <label>State </label>
            <input type="text" inamed="state_abbr" onChange={this.handleChange}></input>
            <label>Zip Code </label>
            <input type="text" name="zip_code" onChange={this.handleChange}></input>
            <label>Country </label>
            <input type="text" name="zip_code" onChange={this.handleChange}></input>
          </div>

          <div>
            <label>Type of Event</label>
            <select onChange={this.handleChange} id="shirt">
              <option value="social">Social</option>
              <option value="class">Class</option>
              <option value="adoption">Adoption</option>
              <option value="fitness">Fitness</option>
            </select>
            <label>Description </label>
              <textarea type="text" id="description" onChange={this.handleChange}></textarea>
          </div>

          <div>
            <div class="form-group files">
                <label>Upload Your File </label>
            <input type="file" name="file" onChange={this.handleChange}/>
            </div>
          </div>

        </form>

        <button type="submit">Create Event</button>
      </div>
    );
  }
}

export default EventForm;
