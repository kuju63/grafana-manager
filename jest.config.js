// eslint-disable-next-line no-undef
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!**/node_modules/**",
        "!**/vendor/**",
    ],
    coverageDirectory: "coverage",
};
