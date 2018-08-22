import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

import '../../css/intervention.css';

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
          </form>
        </div>
      </div>
    )
  }
};

export default Payment;
