export default {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json"],
  testMatch: ["**/__tests__/**/*.test.js"],
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
