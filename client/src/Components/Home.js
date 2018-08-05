import React, { Component } from 'react';
import InterventionList from '../Components/Intervention/InterventionList';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="center"> LISTA INTERVENCIJA </h3>
        <InterventionList />
      </div>
    )
  }
}
