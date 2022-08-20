export function* dfs(node) {
  yield node;
  if (node.children) {
    for (let i = 0, len = node.children.length; i < len; i++) {
      const child = node.children[i];
      yield* dfs(child);
    }
  }
}