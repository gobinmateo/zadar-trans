import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import InterventionSummary from '../InterventionSummary';
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
             <InterventionSummary key={index} {...intervention}/>
            )}
        </div>
      </div>
    );
  }
}

export default InterventionList;
