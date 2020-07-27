import React from 'react';
import axios from 'axios';
import Home from './Home.jsx';
import Events from './Events.jsx';
import EventDetails from './EventDetails.jsx';
import AdoptionFeed from './AdoptionFeed.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'adoption',
      events: [],
      isLoaded: false,
      selectedEvent: {},
    };
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
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

  changeView(view) {
    this.setState({
      view,
    });
    this.getData();
  }

  handleSelectEvent(id) {
    const { events } = { ...this.state };
    const selectedEvent = events.filter((event) => event.id === id)[0];
    this.setState({
      view: 'selected event',
      selectedEvent: { ...selectedEvent },
    });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'home') {
      return (
        <Home
          onClick={this.changeView}
        />
      );
    }
    if (view === 'adoption') {
      return (<div><AdoptionFeed /></div>);
    }
    if (view === 'events') {
      const { events } = this.state;
      return (
        <div>
          <Events
            events={events}
            onClick={this.handleSelectEvent}
          />
        </div>
      );
    }
    const { selectedEvent } = this.state;
    return (
      <EventDetails
        event={selectedEvent}
      />
    );
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className="main">
        {this.renderView()}
      </div>
    );
  }
}

export default App;
