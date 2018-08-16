import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

import * as M from 'materialize-css';
import '../../../css/intervention.css';

type State = {
  receiveTime: String,
  arrivalTime: String,
  departureTime: String
}

const partners = [
  'driver1', 'driver2', 'driver3'
];

const models = [
  'insurance1', 'insurance2', 'insurance3'
];

const interventionStatuses = [
  'DODIJELJENA', 'OBAVLJENA', 'ZAPRIMLJENA'
];

class InterventionInfo extends Component<State> {
  constructor(props) {
    super(props);

    this.state = {
      receiveTime: '',
      arrivalTime: '',
      departureTime: '',
      partner: '',
      model: '',
      interventionStatus: ''
    }
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.timepicker');
      const options = {};
      const instances = M.Timepicker.init(elems, options);
    });
  }

  handlePartnerChange = (event) => {
    const { value } = event;

    this.setState({ partner: value});
  };

  handleModelChange = (event) => {
    const { value } = event;

    this.setState({ model: value});
  };

  handleInterventionStatusChange = (event) => {
    const { value } = event;

    this.setState({ interventionStatus: value});
  }


  handleReceiveTimeChange = (e) => {
    //
  };

  handleArrivalTimeChange = (e) => {
    //
  };

  handleDepartureTimeChange = () => {
    //
  };

  render() {
    const { model, partner, interventionStatus } = this.state;

    return (
      <div className="row">
        {/*<div className="col s10 m8 l6 offset-l4 offset-m3 custom--margin">*/}
        <div className="col s12 m8 l6 offset-l2 offset-m2 custom--margin">
          <form action="">

            <div className="input-field">
              <input id="receiveTime"
                     type="text"
                     className="timepicker"
                     required/>
              <label htmlFor="receiveTime">
                Vrijeme zaprimanja
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="arrivalTime"
                     type="text"
                     className="timepicker"
                     required/>
              <label htmlFor="arrivalTime">
                Vrijeme dolaska na lokaciju
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="departureTime"
                     type="text"
                     className="timepicker validate"
                     required/>
              <label htmlFor="departureTime">
                Vrijeme završetka usluge
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>
            <Dropdown
              onChange={this.handleInterventionStatusChange}
              value={interventionStatus}
              options={interventionStatuses}
              placeholder="Status intervencije"/>
            <Dropdown
              onChange={this.handlePartnerChange}
              value={partner}
              options={partners}
              placeholder="Partner"/>
            <Dropdown
              onChange={this.handleModelChange}
                value={model}
                options={models}
                placeholder="Model"/>
          </form>
        </div>
      </div>
    )
  }
};

export default InterventionInfo;
