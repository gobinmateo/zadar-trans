import React, { Component } from 'react';
import * as M from 'materialize-css';

import '../../css/intervention.css';

type State = {
  sessionNumber: String,
  registrationPlate: String,
  firstRegistrationDate: String,
  carModel: String,
  carManufacturer: String,
}

class VehicleInformation extends Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      sessionNumber: '',
      registrationPlate: '',
      firstRegistrationDate: '',
      carModel: '',
      carManufacturer: '',
    }
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.datepicker');
      const options = {};
      const instances = M.Datepicker.init(elems, options);
    });
  }

  handleSessionNumberChange = (e) => {
    this.setState({ sessionNumber: e.target.value });
  };

  handleRegistrationPlateChange = (e) => {
    this.setState({ registrationPlate: e.target.value });
  };

  handleFirstRegistrationDateChange = () => {
    // this.setState({ registrationPlate: e.target.value });
  };

  handleCarModelChange = (e) => {
    this.setState({ registrationPlate: e.target.value });
  };

  handleCarManufacturerChange = (e) => {
    this.setState({ registrationPlate: e.target.value });
  };

  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l6 offset-l2 offset-m2 custom--margin">
          <form action="">
            <div className="input-field">
              <input id="sessionNumber"
                     type="text"
                     className="validate"
                     onChange={this.handleSessionNumberChange}
                     required/>
              <label htmlFor="sessionNumber">
                Session number
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="registrationPlate"
                     type="text"
                     className="validate"
                     onChange={this.handleRegistrationPlateChange}
                     required/>
              <label htmlFor="registrationPlate">
                Registration plate
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="carModel"
                     type="text"
                     className="validate"
                     onChange={this.handleCarModelChange}
                     required/>
              <label htmlFor="carModel">
                Car model
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="carManufacturer"
                     type="text"
                     className="validate"
                     onChange={this.handleCarManufacturerChange}
                     required/>
              <label htmlFor="carManufacturer">
                Car manufacturer
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input type="text"
                     className="datepicker validate"
                     id="firstRegistrationDate"
                     required/>
                <label htmlFor="firstRegistrationDate">
                First registration date
                </label>
                <span className="helper-text"
                    data-error="Required"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default VehicleInformation;
