import React from 'react';
import axios from 'axios';
import Events from './Events.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'home',
      events: [],
      isLoaded: false,
    };
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
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
    console.log('view:', view);
    this.setState({
      view,
    });
    this.getData();
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

        {/* <div className="nav">
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
        </div> */}

        <div className="main">
          {this.renderView()}
        </div>

      </div>
    );
  }
}

export default App;
