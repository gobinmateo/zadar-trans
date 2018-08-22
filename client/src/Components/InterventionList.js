import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import _get from 'lodash/get';
import InterventionModal from 'react-modal';

import Store from '../Store/Store';
import { socket } from '../index';
import API from '../Api';

type State = {
  newIntervention: boolean,
  interventions: Array,
}

@inject('Store')
@observer
class InterventionList extends Component<State> {

  constructor(props) {
    super(props);
    this.state = {
      openInterventions: [],
      modalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  componentDidMount() {
    const { handleNewIntervention } = this.props;
    socket.on('RECEIVE_INTERVENTION', async (data) => {
      console.log('NOVI ID ', data.id);
      try {
        API.get(`/interventions/${data.id}`)
          .then((intervention) => {
            let data = _get(intervention, 'data');
            if (!data) {
              data = [];
            }
            handleNewIntervention(intervention);
          });
      } catch(err) {
        console.log(err);
      }
    });
  }

  render() {
    const { interventions, isLoading } = this.props;
    return (
      <div>
        <div className="row">
          {interventions && interventions.length > 0 &&
            interventions.map((intervention, index) =>
              <div key={index} className="col s6 m4 l4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{ intervention.id }</span>
                    <p> { intervention.victimName } </p>
                    <button onClick={this.openModal}>Open Modal</button>
                    <InterventionModal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      contentLabel="Example Modal">
                      <div>I am a modal</div>
                    </InterventionModal>
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
