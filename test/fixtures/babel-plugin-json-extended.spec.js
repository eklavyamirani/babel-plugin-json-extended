"use strict";

const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const types = require('babel-types');
const generate = require('babel-generator').default;
const pluginToTest = require('../../dist/index')

describe("json-extended", function () {

  const runPlugin = function (input)
  {
    if (!input)
    {
      throw "empty input."
    }

    let ast = babylon.parse(input);
    traverse(ast, pluginToTest({types: types}).visitor);

    let output;
    traverse(ast, {
      Program: function (_path) {
        output = generate(_path.node).code;
        _path.stop();
      }
    });

    return output;
  }

  it("replaces variables successfully", function () {
    let input = 'var x = { $environment: "test",\
  resultValue: "variable $environment = " + $environment\
}';

    let expectedOutput = '{\n\
  "resultValue": "variable $environment = test"\n\
}';

    const actualOutput = runPlugin(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it ('removes the root level variable declaration from the output', function () {
    // TODO: babylon strips the spaces in the output.
    // hence adding a space might break the code. 
    let input = 'var x = {}';

    let expectedOutput = '{}';

    const actualOutput = runPlugin(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
});