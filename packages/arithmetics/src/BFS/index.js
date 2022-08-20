export function* bfs(node) {
  const queue = new Array(1000);
  let i = 0, j = 0;
  queue[j++] = node;

  while (i !== j) {
    const node = queue[i++];
    yield node;

    if (node.children) {
      for (let k = 0, len = node.children.length; k < len; k++) {
        const child = node.children[k];
        queue[j++] = child;
      }
    }
  }
}