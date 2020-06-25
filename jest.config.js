module.exports = {
  verbose: true,
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/setup.ts"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
};
