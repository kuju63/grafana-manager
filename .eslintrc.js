// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier", "jest"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
    ],
    rules: {
        "prettier/prettier": "error",
    },
};
