[![build status](https://travis-ci.org/eklavyamirani/babel-plugin-json-extended.svg?branch=master)](https://travis-ci.org/eklavyamirani/babel-plugin-json-extended)

**This plugin is an experiment to extend the json file format, and a project for me to understand more about babel plugins, and transpilation.**

Currently, this plugin only supports the use of variables prefixed with '$' symbol.

Usage:

```javascript
var x = { 
  $environment: "test",
  foo: "variable $environment = " + $environment
}
```

Outputs:

```javascript
{
  "foo": "variable $environment = test"
}
```

Add the plugin to .babelrc from the dist and feed a js file with an object definition. Since babel cannot parse a json directly, I had to wrap this inside a js object. The output for the plugin is a json.
