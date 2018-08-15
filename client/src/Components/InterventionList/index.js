import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Store from '../../Store/Store';
import socket from '../../Socket';
import API from '../../Api';

type State = {
  newIntervention: boolean,
  interventions: Array
}

@inject('Store')
@observer
class InterventionList extends Component<State> {

  componentDidMount() {
    socket.on('INTERVENTION_CREATED', (intervention) => {
      this.props.handleInterventionReceived(intervention);
    });
  }

  componentWillUnmount() {
    socket.removeListener('INTERVENTION_CREATED');
  }

  render() {
    const { openInterventions } = this.props;

    return (
      <div>
        <div className="row">
          {openInterventions && openInterventions.length > 0 &&
            openInterventions.map((intervention, index) =>
              <div key={index} className="col s6 m4 l4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{ intervention._id }</span>
                    <p> { intervention.victimName } </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default InterventionList;
