import { isFunction } from './validate';

/**
 * @description 事件防抖，注意以下要点：
 * 1.绑定返回函数的this指向
 * 2.arguments传递
 * 3.第一次是否立即执行不延迟
 * 4.假设函数有返回值，虽然绝大部分情况用不到，但出于严谨还是考虑在内
 * 5.中途取消debounce
 * 
 * github地址：
 * https://github.com/mqyqingfeng/Blog/tree/master/demos/debounce
 */
export function debounce(
  func: (...args: any[]) => any,
  wait = 0,
  immediate = false
): () => any {
  if (!isFunction(func)) {
    throw new Error('debounce first argument except a function');
  }
  
  let timerId,
    result;
  
  const clearTimerId = function(): void {
    clearTimeout(timerId);
    timerId = null;
  };
  
  const setTimerId = function(context, args): void {
    timerId && clearTimerId();
    timerId = setTimeout(function() {
      func.apply(context, args);
      clearTimerId();
    }, wait);
  };
  
  const debounced = function(...args): any {
    const context = this;
  
    timerId && clearTimerId(); 
  
    if (immediate) {
      const callNow = !timerId;
      timerId = setTimeout(function() {
        clearTimerId();
      }, wait);
      callNow && func.apply(context, args);
    } else {
      setTimerId(context, args);
    }
  
    return result;
  };
  
  debounced.cancel = function(): void {
    timerId && clearTimerId();
  };
  
  return debounced;
}