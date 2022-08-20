export function apply(func, context, arr) {
  if (typeof func !== 'function') {
    throw new Error('the apply method must scope the function');
  }

  context = context || {};
  context.fn = func;

  let result;
  if (arr instanceof Array) {
    const args = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
