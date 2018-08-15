import React, { Component } from 'react';

import API from '../../Api';
import InterventionList from '../../Components/InterventionList';
import Navbar from '../../Components/Navbar';

class HomePage extends Component {
  state = {
    openInterventions: []
  };

  async componentDidMount() {
    const response = await API.get('search/open-interventions');

    this.setState({ openInterventions: [ ...this.state.openInterventions, ...response.data ] });
  }

  handleInterventionReceived = (intervention) => {
    this.setState({ openInterventions: [ ...this.state.openInterventions, intervention ] });
  };

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h3 className="center"> LISTA INTERVENCIJA </h3>
          <InterventionList
            handleInterventionReceived={this.handleInterventionReceived}
            openInterventions={this.state.openInterventions} />
        </div>
      </div>
    );
  }
}

export default HomePage;
