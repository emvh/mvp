import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import SearchBar from './SearchBar.jsx';
import EventCard from './EventCard.jsx';
import axios from 'axios';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios({
      method: 'get',
      url: '/api/events',
    })
      .then((response) => {
        const events = response.data;
        // console.log('events', events);
        this.setState({
          events,
          isLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({ isLoaded: true });
        console.log(error);
      });
  }

  render() {
    const { events, isLoaded } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    // const event = events.map((event) => <div>{event}</div>);
    console.log(events);

    return (
      <div>
        <div>
        search bar
        <SearchBar />
        </div>

        <div>
        categories
        </div>

        <div>
          <div class="row row-cols-1 row-cols-md-3">
            {events.map((event) => (
            <EventCard
            title={event.title}
            city={event.city}
            date={event.start_time}
            image={event.image}
          />
          ))}

            {/* <div class="col mb-4">
              <div class="card h-100">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a short card.</p>
                </div>
              </div>
            </div> */}

            {/* <div class="col mb-4">
              <div class="card h-100">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                </div>
              </div>
            </div> */}

            {/* <div class="col mb-4">
              <div class="card h-100">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
            </div> */}

          </div>

        </div>
      </div>
    )
  }
}

export default Events;
