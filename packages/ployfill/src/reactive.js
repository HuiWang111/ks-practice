/**
 * 数据驱动视图关键api：Object.defineProperty
 * Object.defineProperty的缺点
 * 1.深度监听需要递归，计算量大，对象层级过多会卡死
 * 2.无法监听新增、删除的属性
 */

const _toString = Object.prototype.toString;
const arrayProto = Array.prototype;
const definedArrayProto = Object.create(null);
const autoRunCallbacks = [];

function triggerDiff() {
  autoRunCallbacks.forEach(callback => callback());
}

/**
 * 重写数组所有的方法，使之能够被监听
 */
Object.getOwnPropertyNames(arrayProto).forEach(methodName => {
  if (_toString.call(arrayProto[methodName]) === '[object Function]') {
    definedArrayProto[methodName] = function () {
      triggerDiff();
      arrayProto[methodName]();
    }
  }
});

function defineReactive(target, key, value) {
  // 深度监听
  observable(value);

  Object.defineProperty(target, key, {
    set(newVal) {
      // 如果新值是对象，那么也需要监听
      observable(newVal);

      value = newVal;

      /**
             * 数据改变时触发diff算法，再由diff算法的结果决定是否更新视图
             */
      triggerDiff();
    },
    get() {
      return value;
    }
  });
}

function observable(target) {
  if (typeof target !== 'object' || target == null) {
    return target;
  }

  if (_toString.call(target) === '[object Array]') {
    target.__proto__ = definedArrayProto;
  }

  for (const key in target) {
    defineReactive(target, key, target[key]);
  }
}

function autoRun(callback) {
  if (typeof callback !== 'function') {
    throw new Error('autoRun param must be a function');
  }

  autoRunCallbacks.push(callback);
}

export {
  observable,
  autoRun
};