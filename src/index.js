/// Source code for JSON transformer project
/// Written by Eklavya Mirani

import {BinaryStringProcessor} from './BinaryStringProcessor'

const plugin = function (babel) {
  const types = babel.types;
  const processor = new BinaryStringProcessor();

  return {
    visitor: {
      Program (path) {
        let body = path.get("body.0");
        const rootExpressionBody = body.get("declarations.0").node.init;
        path.node.body[0] = rootExpressionBody;
      },
      Property(path) {
        if (path.node.key.name[0] === '$') {
          processor.Identifiers[path.node.key.name] = path.node.value.value;
          path.remove();
        }
        else
        {
          path.node.key = types.stringLiteral(path.node.key.name);
        }
      },
      BinaryExpression(path) {
        processor.combineBinaryStrings(path, types);
      },
      
    }
  };
}

module.exports = plugin;