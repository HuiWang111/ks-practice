/**
 * TODO: 导出注释的代表测试还有问题
 */

export {
  get,
  // flatten
} from './utils';

export {
  domQuery
} from './domQuery';

export { debounce } from './debounce';

// export { throttle } from './throttle';

export { createMathFunc } from './dom';

export {
  isArray,
  isString,
  isBoolean,
  isFunction,
  isUndefined,
  isNull,
  isNumber,
  isObject,
  isPlainObject,
  isNil,
  isInteger,
  isFloat,
  isPrimitive
} from './validate';

export {
  isEqual
} from './isEqual';

export {
  transformBase64ToBlob,
  transformBlobToBase64
} from './transform';

export { compose } from './compose/recursion';

export { pipe } from './pipe';
