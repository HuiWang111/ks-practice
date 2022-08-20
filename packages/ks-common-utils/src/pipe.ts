import { isFunction } from './validate';

/**
 * pipe
 * 将一个函数的输出作为另一个函数的输入
 */
export function pipe(...funcs: Function[]): Function {
  return (...params: any[]): any => {
    return funcs.reduce<any[]>((args, func) => {
      if (!isFunction(func)) {
        throw new Error('pipe params must be a function');
      }

      const res = func(...args);
      return [res];
    }, params)[0];
  }
}
