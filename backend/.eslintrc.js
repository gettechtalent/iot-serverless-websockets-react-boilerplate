module.exports = {
    "parserOptions": {
        "ecmaVersion": 8
    },
    "env": {
        "commonjs": true,
        "node": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "warn",
            4,
            {"SwitchCase": 1}
        ],
        "no-trailing-spaces": "error",
        "no-unused-vars": [
            "warn",
            {"args": "none"}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "no-extra-boolean-cast": "off",
        "comma-dangle": "off",
    }
};
