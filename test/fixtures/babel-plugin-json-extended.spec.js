"use strict";

const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const types = require('babel-types');
const generate = require('babel-generator').default;
const pluginToTest = require('../../dist/index')

describe("json-extended", function () {
  it("replaces variables successfully", function () {
    let input = 'var x = { $environment: "test",\
  resultValue: "variable $environment = " + $environment\
}';

    let expectedOutput = '{\n\
  "resultValue": "variable $environment = test"\n\
}';

    let ast = babylon.parse(input);
    traverse(ast, pluginToTest({types: types}).visitor);

    let actualOutput;
    traverse(ast, {
      Program: function (_path) {
        actualOutput = generate(_path.node).code;
        _path.stop();
      }
    });

    expect(actualOutput).toEqual(expectedOutput);
  });
});