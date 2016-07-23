'use strict';
import { browserHistory } from 'react-router';

module.exports = {
  /* Using integers for step. If a step has been saved (and that the param has
     been saved to the user profile) the site can redirect to the next step.
     1: site
     2: theme/preset
     3: plans */

  setStep(step) {
    localStorage.onboardStep = step;
  },

  getStep() {
    return localStorage.onboardStep;
  },

  removeStep() {
    delete localStorage.onboardStep;
  },

  gotoNextStep() {
    switch (this.getStep()) {
      case 1:
        console.log('saved step 1, going to step 2');
        browserHistory.push('/welcome/theme');
        break;
      case 2:
        console.log('saved step 2, going to step 3');
        browserHistory.push('/welcome/plan');
        break;
      default:
        /* if no step has been saved, do nothing */
        break;
    }
  }

}
