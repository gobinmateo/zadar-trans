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

  data = {
    model: this.props.model,
    partner: this.props.partner,
    interventionStatus: this.props.interventionStatus,
    interventionRecievalDateTime: this.props.interventionRecievalDateTime,
    interventionArrivalDateTime: this.props.interventionArrivalDateTime,
    interventionCompletionDateTime: this.props.interventionCompletionDateTime
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
    console.log('DATA ', this.data)
    //const { model, partner, interventionStatus } = this.state;

    return (
      <div className="row">
        {/*<div className="col s10 m8 l6 offset-l4 offset-m3 custom--margin">*/}
        <div className="col s12 m8 l6 offset-l2 offset-m2 custom--margin">
          <form action="">

            <div className="input-field">
              <input id="interventionRecievalDateTime"
                     type="text"
                     className="timepicker"
                     required
                     value={this.data.interventionRecievalDateTime}/>
              <label htmlFor="interventionRecievalDateTime">
                Vrijeme zaprimanja
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="interventionArrivalDateTime"
                     type="text"
                     className="timepicker"
                     required
                     value={this.data.interventionArrivalDateTime}/>
              <label htmlFor="interventionArrivalDateTime">
                Vrijeme dolaska na lokaciju
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="interventionCompletionDateTime"
                     type="text"
                     className="timepicker validate"
                     required
                     value={this.data.interventionCompletionDateTime}/>
              <label htmlFor="interventionCompletionDateTime">
                Vrijeme završetka usluge
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>
            <Dropdown
              value={this.data.interventionStatus}
              options={interventionStatuses}
              placeholder="Status intervencije"/>
            <Dropdown
              onChange={this.handlePartnerChange}
              options={partners}
              placeholder="Partner"
              value={this.data.partner}/>
            <Dropdown
                options={models}
                placeholder="Model"
                value={this.data.model}/>
          </form>
        </div>
      </div>
    )
  }
};

export default InterventionInfo;
