import jsdom from 'jsdom';
import { dfs } from '.'

const dom = new jsdom.JSDOM(`<!DOCTYPE html>
<html lang="en">
<body>
    <div>
        <span></span>
        <span></span>
    </div>
    <div>
        <a></a>
    </div>
    <div>
        <i></i>
    </div>
</body>
</html>`)

describe('test dfs', () => {
  it('should work', () => {
    const { body } = dom.window.document;
    const res = [];

    for (const node of dfs(body)) {
      res.push(node.tagName);
    }

    expect(res).toEqual(['BODY', 'DIV', 'SPAN', 'SPAN', 'DIV', 'A', 'DIV', 'I'])
  });
});