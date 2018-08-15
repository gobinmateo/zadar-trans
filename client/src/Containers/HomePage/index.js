import React, { Component } from 'react';

import InterventionList from '../../Components/InterventionList';
import Navbar from '../../Components/Navbar';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h3 className="center"> LISTA INTERVENCIJA </h3>
          <InterventionList />
        </div>
      </div>
    )
  }
}

export default HomePage;
