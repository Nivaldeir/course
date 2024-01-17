module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "tslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotemark: [true, "single"],
    semicolon: [true, "always"],
    "trailing-comma": [true, { multiline: "never", singleline: "never" }],
    "no-console": false,
  },
};
