import React from 'react';
import axios from 'axios';
import Events from './Events.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'events',
      events: [],
      isLoaded: false,
    };
    this.renderView = this.renderView.bind(this);
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

  renderView() {
    const { view } = this.state;
    if (view === 'home') {
      return (
        <div>
          <span>
            <button>Create an Event</button>
          </span>
          <span>
            <button>Find an Event</button>
          </span>
        </div>
      );
    }
    if (view === 'adoption') {
      return (<div>adoption</div>);
    }
    if (view === 'events') {
      const { events } = this.state;
      return (
        <div>
          <Events
            events={events}
          />
        </div>
      );
    }
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>

        <div className="nav">
          <span
            className="section"
            onClick={ () => this.changeView('feed') }
          >
            Find Love
          </span>
          <span
            onClick={ () => this.changeView('events') }
          >
            Find Pawties
          </span>
        </div>

        <div className="main">
          {this.renderView()}
        </div>

      </div>
    );
  }
}

export default App;
