'use strict';

module.exports = {

  setStep(step) {
    localStorage.onboardStep = step;
  },

  getStep() {
    return localStorage.onboardStep;
  },

  removeStep() {
    delete localStorage.onboardStep;
  },

}
