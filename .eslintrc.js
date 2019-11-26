module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "mocha": true,
    "node": true,
    "jest": true,
  },
  "rules": {
    "import/prefer-default-export": "off",
    "array-callback-return": "off",
    "linebreak-style": "off"
  },
  "globals": {
    "fixture": "readonly"
  }
};
