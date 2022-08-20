import { isArray, isPrimitive, isUndefined } from './validate';

export function get(target: object, props: string, defaultValue?: any): any {
  if (target == null || props == null) {
    return;
  }

  const keys = String(props).split('.');

  let obj = target;
  for (let i = 0, len = keys.length; i < len; i++) {
    const value = obj[keys[i]];
    if (value == null) {
      return defaultValue;
    } else if (isPrimitive(value)) {
      return value;
    } else if (i === len - 1) {
      return value;
    }
    obj = value;
  }
}

/**
 * @description 数组扁平化，注意一下几点：
 * @param input 需要被处理的数组
 * @param shallow 是否只处理一层
 * @param output 方便递归而处理的参数
 * github地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
export function flatten(input: any, shallow: boolean, strict: boolean, output?: any[]): any[] {
  output = output || [];
  
  let idx = output.length,
    i = -1;
  const len = input.length;
  
  while (++i < len) {
    const value = input[i];
    if (isArray(value)) {
      if (shallow) {
        for (let j = 0, length = value.length; j < length; j++) {
          output[idx++] = value[j];
        }
      } else {
        flatten(value, shallow, strict, output);
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  
  return output;
}

export function deepSet(target: any, path: any[], value: Record<string, unknown>, i = 0): Record<string, unknown> {
  const key = path[i];
  if (isUndefined(key)) {
    return value;
  }

  if (isUndefined(target)) {
    if (/\d+/.test(key)) {
      target = [];
    } else {
      target = {};
    }
  }

  target[key] = deepSet(target[key], path, value, i + 1);
  return target;
}

export function getPath(pathStr?: string): string[] {
  if (!pathStr) {
    return [];
  }

  const pthIndentifer = /[A-Za-z0-9_$][A-Za-z0-9_$]*/;
  const m = pthIndentifer.exec(pathStr);
  if (!m) {
    throw new Error(`[getPath] unexpect path '${pathStr}'`);
  }
    
  const pthPart = /(\.([A-Za-z_$][A-Za-z0-9_$]*)|\[([A-Za-z0-9_$]+)\])/g;
  const path: string[] = [m[0]];
  let p: RegExpExecArray | null;
  let lastIdx = 0;

  pathStr = pathStr.replace(m[0], '');
  while ((p = pthPart.exec(pathStr))) {
    if (p.index !== lastIdx) { // 'a=b%%c=1'
      throw new Error(`[getPath] unexpect path '${pathStr}'`);
    }
    lastIdx += p[0].length;
    path.push(p[2] || p[3]);
  }
    
  return path;
}