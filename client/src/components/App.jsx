import React from 'react';
import axios from 'axios';
import Home from './Home.jsx';
import Events from './Events.jsx';
import EventForm from './EventForm.jsx';
import EventDetails from './EventDetails.jsx';
import AdoptionFeed from './AdoptionFeed.jsx';
import searchIds from '../searchIds.js';
import PrimarySearchAppBar from './Toolbar.jsx';

const blogs = [
  {title: 'How dogs contribute to your health and happiness', description: 'Dogs really are a person\'s best friend — not least because they impact both our physical and our mental health. In this ... ', url: 'https://images.unsplash.com/photo-1551887373-3c5bd224f6e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}, {title: 'Dogs Are Even More Like Us Than We Thought', description: 'It\'s likely no surprise to dog owners, but growing research suggests that man\'s best friend often acts more human than canine. Dogs can read ...', url: 'https://images.unsplash.com/photo-1583511666407-5f06533f2113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80'}, {title: 'Pet therapy: Animals as healers', description: 'Animal-assisted therapy is a growing field that uses dogs or other animals to help people recover from or better cope with health problems, such as heart disease, ...', url: 'https://images.unsplash.com/photo-1562862484-b3c65331adbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1354&q=80'}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      events: [],
      isLoaded: false,
      selectedEvent: {},
      filteredEvents: [],
    };
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterByZipCode = this.filterByZipCode.bind(this);
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
    console.log('view', view);
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

  filterByZipCode(zipCodes) {
    const events = [...this.state.events];
    const search = zipCodes;
    const filteredEvents = events.filter((event) => search.some((zip) => zip.zip_code === event.zip_code));
    this.setState({ filteredEvents, view: 'events' });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'home') {
      return (
        <Home
          onClick={this.changeView}
          blogs={blogs}
        />
      );
    }
    if (view === 'adoption') {
      return (
      <div>
        <PrimarySearchAppBar
          view={this.state.view}
        />
        <AdoptionFeed />
      </div>
      );
    }
    if (view === 'events' && this.state.filteredEvents.length === 0) {
      const { events } = this.state;
      return (
        <div>
          <PrimarySearchAppBar
            onClick={this.changeView}
            filterByZipCode={this.filterByZipCode}
            view={this.state.view}
          />
          <Events
            events={events}
            onClick={this.handleSelectEvent}
            filterByCategory={this.filterByCategory}
            view={this.state.view}
          />
        </div>
      );
    }
    if (view === 'events' && this.state.filteredEvents.length > 0) {
      const { filteredEvents } = this.state;
      return (
        <div>
          <PrimarySearchAppBar
            onClick={this.changeView()}
            filterByZipCode={this.filterByZipCode}
          />
          <Events
            events={filteredEvents}
            onClick={this.handleSelectEvent}
            filterByCategory={this.filterByCategory}
          />
        </div>
      );
    }
    if (view === 'form') {
      return (
        <div>
          <EventForm />
        </div>
      )
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
