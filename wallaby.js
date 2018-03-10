module.exports = function (wallaby) {
  return {
    files: [
      './server.js',
      'src/**/*.js?(x)',
      'src/**/*.snap',
      '!src/**/*.spec.js?(x)'
    ],
    tests: [
      'src/**/*.spec.js?(x)',
      '__tests__/*.test.js?(x)'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      "**/*.js?(x)": wallaby.compilers.babel()
    },

    testFramework: 'jest',

    debug: true
  };
}