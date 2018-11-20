# webgl2-engine

## Build

### Versioning
preversion - Hook to run command before npm version is increased. In this case, the tests are run and a failure will halt further script execution.
version - Hook after version is incremented. We build the project and add the dist folder to git.
postversion - Hook after version script is finished executing. We push the changes to our repository.
`npm test` - Runs all jasmine tests.
`npm run build` - Builds the project.

### The below scripts require a clean git working directory
`npm precommit` - Increments the patch version. Used during development.
`npm build-prod-minor` - Increments the minor version. Used for minor production deploys. No breaking changes.
`npm build-prod-major` - Increments the major version. Used for major production deploys. May contain breaking changes.

## Matrix Math
row major
     m.set( 11, 12, 13,
            21, 22, 23,
            31, 32, 33 ); will result in the elements array containing:
col major (internal)
  m.el  = [ 11, 21, 31,
            12, 22, 32,
            13, 23, 33 ]; and internally all calculations are performed using column-major ordering. 