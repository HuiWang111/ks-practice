/*
 * @Autor: hui.wang
 * @Date: 2022-03-05 18:56:41
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-03-05 20:22:23
 * @emial: hui.wang@bizfocus.cn
 */
export function isIterable(obj) {
  return obj && typeof obj[Symbol.iterator] === 'function'
}

export function getLength(iterator) {
  if ('length' in iterator) {
    return iterator.length
  } else if ('size' in iterator) {
    return iterator.size
  }
  return 0
}

export function isThenable(obj) {
  return obj && typeof obj.then === 'function'
}

export function isCatchable(obj) {
  return obj && typeof obj.catch === 'function'
}
