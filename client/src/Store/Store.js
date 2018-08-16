import { action, observable } from 'mobx';
import { InterventionStorage } from './InterventionStorage';

class Store {
  @observable intervention = new InterventionStorage();
  @observable isLoggedIn = false;

  @action
  addInterventionInfo(info) {
    for (const prop in info) {
      this.intervention[prop] = info[prop];
    }
  }

  @action
  clearIntervention() {
    this.intervention = {};
  }

  @action
  login() {
    this.isLoggedIn = true;
  }
}

export default new Store();
