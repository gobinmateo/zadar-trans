import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Store from '../Store/Store';
import socket from '../Socket';
import API from '../Api';

type State = {
  newIntervention: boolean,
  interventions: Array
}

@inject('Store')
@observer
class InterventionList extends Component<State> {

  constructor(props) {
    super(props);

    this.state = {
      openInterventions: []
    };
  }

  componentDidMount() {
    socket.on('INTERVENTION_CREATED', (intervention) => {
      this.setState({
        openInterventions: [...this.state.openInterventions, intervention]
      });
    });
  }

  componentWillUnmount() {
    socket.removeListener('INTERVENTION_CREATED');
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.openInterventions[0] && this.state.openInterventions[0].length > 0 &&
            this.state.openInterventions[0].map((intervention, index) =>
              <div key={index} className="col s6 m4 l4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{ intervention.id }</span>
                    <p> { intervention._id } </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default InterventionList;
