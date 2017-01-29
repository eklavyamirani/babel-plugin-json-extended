"use strict";

var _BinaryStringProcessor = require("./BinaryStringProcessor");

var plugin = function plugin(babel) {
  var types = babel.types;
  var processor = new _BinaryStringProcessor.BinaryStringProcessor();

  return {
    visitor: {
      Program: function Program(path) {
        var body = path.get("body.0");
        var rootExpressionBody = body.get("declarations.0").node.init;
        path.node.body[0] = rootExpressionBody;
      },
      Property: function Property(path) {
        if (path.node.key.name[0] === '$') {
          processor.Identifiers[path.node.key.name] = path.node.value.value;
          path.remove();
        } else {
          path.node.key = types.stringLiteral(path.node.key.name);
        }
      },
      BinaryExpression: function BinaryExpression(path) {
        processor.combineBinaryStrings(path, types);
      }
    }
  };
}; /// Source code for JSON transformer project
/// Written by Eklavya Mirani

module.exports = plugin;