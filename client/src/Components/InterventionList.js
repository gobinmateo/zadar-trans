import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Store from '../Store/Store';
import { socket } from '../index';
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
    socket.on('RECEIVE_INTERVENTION', async (id) => {
      console.log('NOVI ID ', id);
      const interventions = await API.get('/interventions');
      await this.setState({
        openInterventions: [...this.state.openInterventions, ...[interventions.data]]
      });
      console.log(this.state.openInterventions[0]);
    });
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
                    <p> { intervention.victimName } </p>
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
