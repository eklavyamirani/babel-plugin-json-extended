'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryStringProcessor = exports.BinaryStringProcessor = function () {
  function BinaryStringProcessor() {
    _classCallCheck(this, BinaryStringProcessor);

    this.Identifiers = {};
  }

  _createClass(BinaryStringProcessor, [{
    key: 'combineBinaryStrings',
    value: function combineBinaryStrings(path, types) {
      var left = path.node.left;
      var right = path.node.right;

      if (types.isIdentifier(left) && left.name[0] === '$') {
        path.replaceWithSourceString('"' + this.Identifiers[left.name] + right.value + '"');

        this.combineBinaryStrings(path.parentPath, types);
        return;
      } else if (types.isIdentifier(right) && right.name[0] === '$') {
        path.replaceWithSourceString('"' + left.value + this.Identifiers[right.name] + '"');

        this.combineBinaryStrings(path.parentPath, types);
        return;
      }

      if (types.isLiteral(left) && types.isLiteral(right)) {
        path.replaceWithSourceString('"' + left.value + right.value + '"');

        return;
      }
    }
  }]);

  return BinaryStringProcessor;
}();