const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const reporterConfig = {
    displayStacktrace: 'summary',      // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
    displaySuccessesSummary: false, // display summary of all successes after execution 
    displayFailuresSummary: true,   // display summary of all failures after execution 
    displayPendingSummary: true,    // display summary of all pending specs after execution 
    displaySuccessfulSpec: true,    // display each successful spec 
    displayFailedSpec: true,        // display each failed spec 
    displayPendingSpec: false,      // display each pending spec 
    displaySpecDuration: false,     // display each spec duration 
    displaySuiteNumber: false,      // display each suite number (hierarchical) 
    colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
    },
    prefixes: {
        success: '✓ ',
        failure: '✗ ',
        pending: '* '
    },
    customProcessors: []
};

jasmine.getEnv().clearReporters();               // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter(reporterConfig));