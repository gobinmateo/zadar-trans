import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class InterventionSummary extends Component {
  handleInterventionSummaryClick = () => {
    const { history } = this.props;

    history.push('/intervention');
  }

  render() {
    return (
      <div className="col s6 m4 l4" onClick={this.handleInterventionSummaryClick}>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{ this.props._id }</span>
            <p> { this.props.victimName } </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InterventionSummary);
