import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';

import { socket } from '../../index';
import API from '../../Api';
import 'react-dropdown/style.css'
import Store from '../../stores/Store';
import '../../css/intervention.css';
import VehicleInformation from './VehicleInformation';

type State = {
  name: String,
  surname: String,
  phoneNumber: String,
  insurancePolicyNumber: String
}

let id = 185;

const partners = [
  'driver1', 'driver2', 'driver3'
];

const models = [
  'insurance1', 'insurance2', 'insurance3'
];

@inject('Store')
@observer
class UserInformation extends Component<State> {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      phoneNumber: '',
      insurancePolicyNumber: '',
      partner: '',
      model: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSurnameChange = (e) => {
    this.setState({ surname: e.target.value })
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value })
  };

  handleInsurancePolicyNumberChange = (e) => {
    this.setState({ insurancePolicyNumber: e.target.value })
  };

  handlePartnerChange = (event) => {
    const { value } = event;
    this.setState({ partner: value});
  };

  handleModelChange = (event) => {
    const { value } = event;
    this.setState({ model: value});
  };

  handleFinishClick = async () => {
    const { Store, history } = this.props;
    const { name, surname, phoneNumber, insurancePolicyNumber } = this.state;
    const victimName = `${name} ${surname}`;
    const newIntervention = true;

    // add intervention to database
    await API.post('/interventions', { id, victimName, phoneNumber, insurancePolicyNumber });
    // add intervention to global store
    Store.addIntervention(this.state);
    // send notification to other users
    socket.emit('INTERVENTION_NOTIFICATION', {
      newIntervention
    });
    socket.emit('SEND_INTERVENTION', {
      id
    });
    id += 1;
    // switch to front page
    history.push('/');
  };

  render() {
    const { model, partner } = this.state;
    return (
      <div className="row">
        <div className="col s10 m8 l6 offset-l4 offset-m3 custom--margin">
          <form action="">
            <div className="input-field">
              <input id="name"
                     type="text"
                     className="validate"
                     onChange={this.handleNameChange}
                     required/>
              <label htmlFor="name">
                Name
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="surname"
                     type="text"
                     className="validate"
                     onChange={this.handleSurnameChange}
                     required/>
              <label htmlFor="surname">
                Surname
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="phoneNumber"
                     type="text"
                     className="validate"
                     onChange={this.handlePhoneNumberChange}
                     required/>
              <label htmlFor="phoneNumber">
                Phone number
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="insurancePolicyNumber"
                     type="text"
                     className="validate"
                     onChange={this.handleInsurancePolicyNumberChange}
                     required/>
              <label htmlFor="insurancePolicyNumber">
                Insurance policy number
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <Dropdown onChange={this.handlePartnerChange} value={partner} options={partners} placeholder="Select an option"/>
            <Dropdown onChange={this.handleModelChange} value={model} options={models} placeholder="Select an option"/>

            <div className="input-field right">
              <a onClick={this.handleFinishClick} className="btn blue-grey darken-3">Finish</a>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default withRouter(UserInformation);