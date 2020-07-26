import React from 'react';
import Events from './Events.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'events',
    }
  }

  renderView() {
    const { view } = this.state;
    if (view === 'home') {
      return (
        <div>

          <span><button>Create an Event</button></span>
          <span><button>Find an Event</button></span>

        </div>
      )
    }
    if (view === 'adoption') {
      console.log('adoption feed');
      return <div>adoption</div>
    }
    if (view === 'events') {
      console.log('events');
      return (
      <div>
        eventsview
        <Events />
      </div>
      )
    }
  }

  render() {
    return (
      <div>

        <div className='nav'>
          <span className='section'
            onClick={() => this.changeView('feed')}>
            Find Love
          </span>
          <span
            onClick={() => this.changeView('events')}>
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