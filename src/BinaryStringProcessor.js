export class BinaryStringProcessor {
  Identifiers = {}

  combineBinaryStrings (path, types) {
    const left = path.node.left;
    const right = path.node.right;

    if (types.isIdentifier(left) && left.name[0] === '$') {
      path.replaceWithSourceString(
          '"' + this.Identifiers[left.name] + right.value + '"'
      );

      this.combineBinaryStrings(path.parentPath, types);
      return;
    }
    else if (types.isIdentifier(right) && right.name[0] === '$') {
      path.replaceWithSourceString(
          '"' + left.value + this.Identifiers[right.name] +'"'
      );

      this.combineBinaryStrings(path.parentPath, types);
      return;
    }

    if (types.isLiteral(left) && types.isLiteral(right)) {
      path.replaceWithSourceString(
          '"' + left.value + right.value + '"'
      );

      return;
    }
  };
}