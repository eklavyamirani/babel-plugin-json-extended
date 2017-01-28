**This plugin is an experiment to extend the json file format, and a personal project for me to understand more about babel plugins, and transpilation.**

Currently, this plugin only supports the use of variables prefixed with '$' symbol.

Usage:

```javascript
var x = { 
  $environment: "test",
  resultValue: "variable $environment = " + $environment
}
```

Add the plugin to .babelrc and feed a js file with json as an object definition. Since babel cannot parse a json directly, I had to wrap this inside a js object. But I am working on a way to be able to parse json as well to be able to fully extend the json format.
