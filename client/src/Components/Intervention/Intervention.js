import React, { Component } from 'react';

class Intervention extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      phoneNumber: '',
      insurancePolicyNumber: '',
    }
  }

  render() {
    return (
      <div>
        NEW INTERVENTION
      </div>
    );
  }
}

export default Intervention;
