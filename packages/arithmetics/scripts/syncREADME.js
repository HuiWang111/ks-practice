import fs from 'fs';
import path from 'path';

const dirs = fs.readdirSync(path.join(process.cwd(), 'src'));
const baseURL = 'https://github.com/HuiWang111/arithmetics/blob/main/src/';
const articles = {
  '快速排序': 'https://segmentfault.com/a/1190000009426421',
  '选择排序': 'https://segmentfault.com/a/1190000009366805',
  '希尔排序': 'https://segmentfault.com/a/1190000009461832',
  '堆栈/队列/链表': 'https://juejin.im/entry/58759e79128fe1006b48cdfd',
  '递归': 'https://segmentfault.com/a/1190000009857470',
  '波兰式和逆波兰式': {
    '理论': 'http://www.cnblogs.com/chenying99/p/3675876.html',
    '源码': 'https://github.com/Tairraos/rpn.js/blob/master/rpn.js'
  }
};

let READMEContent = '# 各种算法 \n';
READMEContent += '\n';
READMEContent += '### 练习 \n';
dirs.forEach(dir => {
  let desc = '';
  if (dir === 'BFS') {
    desc += ' 广度优先搜索';
  } else if (dir === 'DFS') {
    desc += ' 深度优先搜索';
  }
  READMEContent += `- [${dir}${desc}](${baseURL}${dir}/index.js) \n`;
});
READMEContent += '\n';
READMEContent += '### 文章 \n';
for (const name in articles) {
  const value = articles[name];

  if (typeof value === 'object') {
    READMEContent += `- ${name} \n`;
    for (const key in value) {
      READMEContent += `    - [${key}](${value[key]}) \n`;
    }
  } else {
    READMEContent += `- [${name}](${value}) \n`;
  }
}

fs.writeFileSync(
  path.join(process.cwd(), 'README.md'),
  READMEContent
);
