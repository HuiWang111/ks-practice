/**
 * @description bind比较复杂，需要注意3个要点：
 * 1.返回一个函数
 * 2.可以传入参数
 * 3.当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
 */
export function bind(func, context) {
  if (typeof func !== 'function') {
    throw new Error('[bind method] what is trying to be bound is not callable');
  }

  context = context || {};

  const _slice = Array.prototype.slice;
  const bindArgs = _slice.call(arguments, 2);

  const fn = function () {
    const args = _slice.call(arguments);
    return func.apply(this instanceof noop ? this : context, bindArgs.concat(args));
  };

  /**
   * @description 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值，
   * 但是直接将fn.prototype赋值为绑定函数的原型时，当修改fn.prototype时绑定函数的原型也会被修改，
   * 因此通过空函数中转
   */
  const noop = function () { /** pass */ };
  noop.prototype = func.prototype;
  fn.prototype = new noop();

  return fn;
}
