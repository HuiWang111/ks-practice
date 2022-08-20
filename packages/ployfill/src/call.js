export function call(func, context) {
  if (typeof func !== 'function') {
    throw new Error('the call method must scope the function');
  }

  context = context || {};

  const args = [];
  for (let i = 2, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  context.fn = func;
  const result = eval('context.fn(' + args + ')'); // 用eval解决参数传递问题
  delete context.fn;
  return result;
};