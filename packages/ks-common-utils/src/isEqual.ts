import { getType } from './validate';

/**
 * @description 判断两个对象是否相等，注意一下几点：
 * 1. NaN 和 NaN 是相等，[1] 和 [1] 是相等，{value: 1} 和 {value: 1} 是相等
 * 2. 1 和 new Number(1) 是相等，'Curly' 和 new String('Curly') 是相等，true 和 new Boolean(true) 是相等
 * 3. -0和0不相等
 * 4. var a = true; var b = new Boolean(true); console.log(+a === +b) // true
 * 5. var a = new Date(2009, 9, 25); var b = new Date(2009, 9, 25); console.log(+a === +b) // true
 * 6. var a = /a/i; var b = new RegExp(/a/i); console.log('' + a === '' + b) // true
 * 7. var a = Number(NaN); var b = Number(NaN); if (+a !== +a) return +b !== +b; // true
 * 8. 对象拥有相同的键值，但是构造器不一致时，也算为不相等
 * 
 * 参考链接：
 * https://github.com/mqyqingfeng/Blog/issues/41
 * 未完全按照文章的写法，加入了自己的理解，有待验证
 */
const funcToString = Function.prototype.toString;
const _hasOwn = Object.prototype.hasOwnProperty;
 
function hasCtor(object: object): boolean {
  return 'constructor' in object;
}
 
export function isEqual(a: any, b: any): boolean {
  if (a === b) {
    if (typeof a !== 'number' && typeof b !== 'number') {
      return true;
    }
        
    return 1 / a === 1 / b; // +0 和 0
  }
 
  if (a !== a) return b !== b; // NaN 和 NaN
 
  if (a == null || b == null) return false; // null 和其他对象不相等
 
   
  return deepEqual(a, b);
}
 
/**
  * @description 判断object类型是否相等，主要处理构造器判断，数组、对象是否相等
  */
function deepEqual(a: any, b: any): boolean {
  const aType = getType(a);
  if (aType !== getType(b)) return false;
 
  switch (aType) {
  case 'boolean':
  case 'date':
    return +a === +b;
     
  case 'regExp':
  case 'string':
    return '' + a === '' + b;
 
  case 'number':
    if (+a !== +a) return +b !== +b;
    return +a === +b ? 1 / +a === 1 / +b : false;
  }
 
  const isArr = aType === 'array';
  if (isArr) {
    let length = a.length;
    if (length !== b.length) return false;
 
    while (length--) {
      if (!isEqual(a[length], b[length])) {
        return false;
      }
    }
  } else {
    // if (aType !== 'object' && typeof b !== 'object') return false;
 
    if (hasCtor(a) && hasCtor(b)) {
      const aCtor = a.constructor,
        bCtor = b.constructor;
 
      if (funcToString.call(aCtor) !== funcToString.call(bCtor)) {
        return false;
      }
    } else if ( (hasCtor(a) && !hasCtor(b)) || (!hasCtor(a) && hasCtor(b)) ) {
      return false;
    }
 
    const props = Object.keys(a);
    let length = props.length;
 
    if (length !== Object.keys(b).length) return false;
        
    while (length--) {
      const key = props[length];
      if (!_hasOwn.call(b, key) || !isEqual(a[key], b[key])) return false;
    }
  }
 
  return true;
}