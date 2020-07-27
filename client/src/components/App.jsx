import React from 'react';
import axios from 'axios';
import Home from './Home.jsx';
import Events from './Events.jsx';
import EventDetails from './EventDetails.jsx';
import AdoptionFeed from './AdoptionFeed.jsx';
import searchIds from '../searchIds.js';
import Toolbar from './Toolbar.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'events',
      events: [],
      isLoaded: false,
      selectedEvent: {},
      filteredEvents: [],
    };
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
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

  filterByCategory(category) {
    const events = [...this.state.events];
    const search = searchIds(category);
    const filteredEvents = events.filter((event) => event.category.some((category) => search.includes(category.id)));
    this.setState({ filteredEvents, view: 'events' });
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
    if (view === 'events' && this.state.filteredEvents.length === 0) {
      const { events } = this.state;
      return (
        <div>
          <Toolbar
            onClick={this.changeView}
          />
          <Events
            events={events}
            onClick={this.handleSelectEvent}
            filterByCategory={this.filterByCategory}
          />
        </div>
      );
    }
    if (view === 'events' && this.state.filteredEvents.length > 0) {
      const { filteredEvents } = this.state;
      return (
        <div>
          <Toolbar
            onClick={this.changeView}
          />
          <Events
            events={filteredEvents}
            onClick={this.handleSelectEvent}
            filterByCategory={this.filterByCategory}
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
