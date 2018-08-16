import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

import socket from '../../../Socket';
import API from '../../../Api';

import '../../../css/intervention.css';

const paymentOptions = [
  'cash', 'credit card'
];

type State = {
  paymentType: String,
  signOut: String,
  signOutNote: String,
}

class Payment extends Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: '',
      signOut: '',
      signOutNote: '',
    }
  }

  handleSignOutChange = (e) => {
    this.setState({ signOut: e.target.value });
  };

  handleSignOutNoteChange = (e) => {
    this.setState({ signOutNote: e.target.value });
  };

  handleFinishClick = async () => {
    const { Store, history } = this.props;
    const { name, surname, phoneNumber, insurancePolicyNumber } = this.state;
    const victimName = `${name} ${surname}`;
    const newIntervention = true;
    console.log(Store.intervention)
    // add intervention to database
   // await API.post('/interventions', { victimName, phoneNumber, insurancePolicyNumber });

    // add intervention to global store
    Store.addIntervention(this.state);

    // send notification to other users
    socket.emit('INTERVENTION_NOTIFICATION', {
      newIntervention
    });

    // switch to front page
    history.push('/');
  };

  render() {
    const { paymentType } = this.state;
    return (
      <div className="row">
        <div className="col s12 m8 l6 offset-l2 offset-m2 custom--margin">

          <form action="">

            <Dropdown onChange={this.handlePartnerChange} value={paymentType} options={paymentOptions} placeholder="Select an option"/>

            <div className="input-field">
              <input id="signOut"
                     type="text"
                     className="validate"
                     onChange={this.handleSignOutChange}
                     required/>
              <label htmlFor="signOut">
                Sign out
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field">
              <input id="signOutNote"
                     type="text"
                     className="validate"
                     onChange={this.handleSignOutNoteChange}
                     required/>
              <label htmlFor="signOutNote">
                Sign out note
              </label>
              <span className="helper-text"
                    data-error="Required"/>
            </div>

            <div className="input-field right">
              <a onClick={this.handleFinishClick} className="btn blue-grey darken-3">Spremi</a>
            </div>
          </form>

          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
};

export default Payment;
