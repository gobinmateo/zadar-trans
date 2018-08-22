import React, { Component } from 'react';

import InterventionList from './InterventionList';
import InterventionsData from './util/InterventionsData';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="center"> LISTA INTERVENCIJA </h3>
        <InterventionsData />
      </div>
    )
  }
}
