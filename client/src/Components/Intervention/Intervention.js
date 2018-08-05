import React, { Component } from 'react';
import * as M from 'materialize-css';

import UserInformation from './UserInformation';

class Intervention extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const elem = document.querySelector('.tabs');
    const options = {}
    const instance = M.Tabs.init(elem, options);
  }

  render() {
    return (
      <div className="container">
        <h4 className="center blue-grey-text text-darken-1"> NEW INTERVENTION </h4>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3"><a className="active" href="#test1">User info</a></li>
              <li className="tab col s3"><a href="#test2">Test 2</a></li>
              <li className="tab col s3"><a href="#test3">Test 3</a></li>
              <li className="tab col s3"><a href="#test4">Test 4</a></li>
            </ul>
          </div>
          <div id="test1" className="col s12"><UserInformation /></div>
          <div id="test2" className="col s12">Test 2</div>
          <div id="test3" className="col s12">Test 3</div>
          <div id="test4" className="col s12">Test 4</div>
        </div>

      </div>
    );
  }
}

export default Intervention;
