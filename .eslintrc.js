module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "jasmine": true,
    "jest": true,
    "es6": true,
  },
  "rules": {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    "arrow-parens": [
      "error",
      "as-needed",
      { "requireForBlockBody": true }
    ],
    "prefer-arrow-callback" : "off",
    "class-methods-use-this": "off",
    "comma-dangle": "off",
    "consistent-return": "off",
    "func-names": "off",
    "import/no-extraneous-dependencies": "off",
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "FunctionDeclaration": { "parameters": "first" },
        "FunctionExpression": { "parameters": "first" }
      }
    ],
    "max-len": [
      "error",
      {
        "code": 170,
        "ignoreComments": true
      }
    ],
    "newline-per-chained-call": "off",
    "no-constant-condition": [
      "error",
      { "checkLoops": false }
    ],
    "no-eq-null": "error",
    "no-mixed-operators": [
      "error",
      { "groups": [["+", "-", "*", "/", "%", "**"]] }
    ],
    "no-multiple-empty-lines": [
      "error",
      { "max": 1 }
    ],
    "no-param-reassign": "off",
    "no-plusplus": [
      "error",
      { "allowForLoopAfterthoughts": true }
    ],
    "no-restricted-globals": [
      "error"
    ],
    "no-underscore-dangle": "off",
    "no-use-before-define": [
      "error",
      {
        "functions": false,
        "classes": false
      }
    ],
    "no-void": "off",
    "padded-blocks": "off",
    "quotes": [ "error", "single" ],
    "space-before-function-paren": ["error", "never"],
  },
  "overrides": [
    {
      "files": ["test/**", "src/3rdparty/walkontable/test/**", "*.unit.js", "*.e2e.js"],
      "rules": {
        "import/extensions": "off",
        "import/no-unresolved": [
          "error",
          { "ignore": ["handsontable", "walkontable"] }
        ],
        "no-restricted-globals": "off",
        "no-undef": "off",
      }
    }
  ],
}
