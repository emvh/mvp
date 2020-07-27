import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import SearchBar from './SearchBar.jsx';
import EventCard from './EventCard.jsx';

class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events } = this.props;

    const sortedEvents = events.sort((event1, event2) => {
      const dateA = new Date(event1.createdAt);
      const dateB = new Date(event2.createdAt);
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    });

    const recentEvents = sortedEvents.slice(0, 6);

    return (
      <div>
        <div>
          <SearchBar />
        </div>

        <div>
          categories placeholder
        </div>

        <div>
          <div class="row row-cols-1 row-cols-md-3">
            {recentEvents.map((event) => (
              <EventCard
                title={event.title}
                city={event.city}
                date={event.start_time}
                image={event.image}
                description={event.description}
              />
            ))}
          </div>

        </div>
      </div>
    );
  }
}

export default Events;
