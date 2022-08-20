/*
 * @Autor: hui.wang
 * @Date: 2022-03-05 16:12:26
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-03-05 21:50:22
 * @emial: hui.wang@bizfocus.cn
 */
import { getLength, isCatchable, isIterable, isThenable } from './utils'

const states = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

export class MyPromise {
  constructor(executor) {
    this.state = states.PENDING
    this.pendingWorks = new Set()
    this.pendingRejecters = new Set()
    this.then = this.then.bind(this)
    this.catch = this.catch.bind(this)

    const resolve = (value) => {
      if (this.state !== states.PENDING) {
        return
      }

      this.value = value
      this.state = states.FULFILLED
      this.pendingWorks.forEach(work => {
        work(value)
      })
    }

    const reject = (error) => {
      if (this.state !== states.PENDING) {
        return
      }

      this.error = error
      this.state = states.REJECTED
      this.pendingRejecters.forEach(rejecter => {
        rejecter(error)
      })
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFulFillment, onRejection) {
    return new MyPromise((resolve, reject) => {
      if (this.state === states.PENDING) {
        const work = (val) => resolve(onFulFillment(val))
        this.pendingWorks.add(work)
        const rejecter = (err) => reject(onRejection(err))
        this.pendingRejecters.add(rejecter)
      } else if (this.state === states.FULFILLED) {
        try {
          resolve(onFulFillment(this.value))
        } catch(e) {
          reject(e)
        }
      } else {
        onRejection && reject(onRejection(this.error))
      }
    })
  }

  catch(onRejection) {
    return new MyPromise((resolve, reject) => {
      if (this.state === states.PENDING) {
        const rejecter = (err) => reject(onRejection(err))
        this.pendingRejecters.add(rejecter)
      } else if (this.state === states.REJECTED) {
        reject(onRejection(this.error))
      }
    }) 
  }
}

MyPromise.resolve = function(val) {
  if (isThenable(val)) {
    return val
  }
  return new MyPromise((resolve) => {
    resolve(val)
  })
}

MyPromise.reject = function(error) {
  if (isCatchable(error)) {
    return error
  }
  return new MyPromise((_, reject) => {
    reject(error)
  })
}

MyPromise.all = function(iterator) {
  return new MyPromise((resolve, reject) => {
    if (!isIterable(iterator)) {
      throw new Error(`${typeof iterator} ${iterator} is not iterable`)
    }

    const results = []
    const length = getLength(iterator)
    let count = 0

    if (!length) {
      resolve(results)
    }

    iterator.forEach((asyncWork, index) => {
      if (isThenable(asyncWork)) {
        asyncWork
          .then((val) => {
            results[index] = val
            count++

            if (count === length) {
              resolve(results)
            }
          })
          .catch(reject)
      } else {
        new Promise((r) => {
          r(asyncWork)
        }).then((val) => {
          results[index] = val
          count++

          if (count === length) {
            resolve(results)
          }
        })
      }
    })
  })
}

MyPromise.allSettled = function(iterator) {
  return new MyPromise((resolve, reject) => {
    if (!isIterable(iterator)) {
      throw new Error(`${typeof iterator} ${iterator} is not iterable`)
    }

    const results = []
    const length = getLength(iterator)
    let count = 0

    if (!length) {
      resolve(results)
    }

    iterator.forEach((work, index) => {
      const asyncWork = isThenable(work)
        ? work
        : new MyPromise((r) => {
          r(work)
        })

      asyncWork
        .then((value) => {
          count++
          results[index] = { status: 'fulfilled', value }

          if (count === length) {
            resolve(results)
          }
        })
        .catch((reason) => {
          count++
          results[index] = { status: 'rejected', reason }

          if (count === length) {
            resolve(results)
          }
        })
    })
  })
}
