const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displaySuccessful: true,
    displayPending: true,
    displayFailed: true,
    displayErrorMessages: false,
    displayStacktrace: true
  }
}));