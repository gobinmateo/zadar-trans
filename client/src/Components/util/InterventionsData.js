import React, { Component } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';

import InterventionList from '../InterventionList';
import API from '../../Api';

class InterventionsData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interventions: [],
      isLoading: false,
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true});
    try {
      const interventions = await API.get('/interventions');
      let data = _get(interventions, 'data');
      if (!data) {
        data = [];
      }
      this.setState({
        interventions: data,
        isLoading: false,
      })
    } catch(err) {
      console.log(err);
    }
  }

  handleNewIntervention = async (intervention) => {
    console.log(intervention);
    if (_find(this.state.interventions, {id: intervention.data.id})) {
      return;
    }
    await this.setState({ interventions: [...this.state.interventions, intervention.data]});
    console.log(this.state.interventions);
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
        </div>
      </div>;
    }
    return <InterventionList {...this.state} handleNewIntervention={this.handleNewIntervention}/>
  }
}

export default InterventionsData;
