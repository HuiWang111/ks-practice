
interface Option {
    leading?: boolean;
    trailing?: boolean;
}
/**
 * @description 事件节流，注意以下几点：
 * 1.通过leading配置可以设置第一次立即执行
 * 2.通过trailing配置可以设置结束后是否再执行一次
 * 3.this的绑定和arguments的传递
 * 4.可以取消
 * 
 * !!!注意点：
 * leading：false 和 trailing: false 不能同时设置。
 * 如果同时设置的话，比如当你将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，所以只要再
 * 过了设置的时间，再移入的话，就会立刻执行，就违反了 leading: false，bug 就出来了
 * 
 * github地址：
 * https://github.com/mqyqingfeng/Blog/tree/master/demos/throttle
 */
export function throttle(
  func: (...args: any[]) => void,
  wait = 0,
  {
    leading = false,
    trailing = false
  }: Option = {
    leading: false,
    trailing: false
  }
): () => any {
  if (typeof func !== 'function') {
    throw new TypeError('throttle first argument expect a function');
  }
  
  let timerId,
    result,
    lastCallTime = 0,
    context,
    args;
  const now = Date.now || function(): number {
    return +new Date();
  };

  if (leading === false && trailing === false) {
    trailing = true; // 如果leading和trailing都为false, 忽略trailing
  }

  const clearTimerId = function(): void {
    clearTimeout(timerId);
    timerId = null;
  };
  
  const later = function(): void {
    timerId && clearTimerId();
    lastCallTime = now();
    func.apply(context, args);
  };
  
  const throttled = function(...args: any[]): any {
    const nowTime = now();
    const remaining = (wait as number) - (nowTime - lastCallTime);
  
    if (!lastCallTime && leading === false) lastCallTime = nowTime; // 第一次调用且leading为false,不执行
    
    context = this;
  
    if (remaining <= 0 || remaining > (wait as number)) { // remaining > wait原因尚未明白
      timerId && clearTimerId();
      lastCallTime = nowTime;
      result = func.apply(context, args);
    } else if (!timerId && trailing !== false) {
      timerId = setTimeout(later, wait);
    }
  
    return result;
  };
  
  throttled.cancel = function(): void {
    timerId && clearTimerId();
    lastCallTime = 0;
  };
  
  return throttled;
}