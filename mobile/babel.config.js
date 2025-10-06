module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: ['react-native-worklets/plugin',
            ["module:react-native-dotenv", {
              "moduleName": "./env",
              "path": ".env",
              "blacklist": null,
              "whitelist": null,
              "safe": false,
              "allowUndefined": true
            }]
  ]
};
