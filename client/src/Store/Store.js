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
    this.intervention = new InterventionStorage();
  }

  @action
  login() {
    this.isLoggedIn = true;
  }

  @action
  isInterventionBlank() {
    for (const key in Object.keys(this.intervention)) {
      if(this.intervention[key] !== undefined && this.intervention[key] !== '') return false;
    }

    return true;
  }
}

export default new Store();
