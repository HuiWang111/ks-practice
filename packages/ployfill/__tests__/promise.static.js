/*
 * @Autor: hui.wang
 * @Date: 2022-03-05 20:23:46
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-03-05 21:32:22
 * @emial: hui.wang@bizfocus.cn
 */
import { MyPromise } from '..';

describe('test MyPromise static methods', () => {
  it('.resolve should work with MyPromise instance', (done) => {
    MyPromise.resolve(
      new MyPromise((resolve) => {
        resolve(2)
      })
    ).then((val) => {
      expect(val).toBe(2)
      done()
    })
  })
  it('.resolve should work with other', (done) => {
    MyPromise.resolve(1).then((val) => {
      expect(val).toBe(1)
      done()
    })
  })

  it('.rject should work with MyPromise instance', (done) => {
    MyPromise.reject(
      new MyPromise(() => {
        throw new Error('this is a error')
      })
    ).catch((err) => {
      expect(err.message).toBe('this is a error')
      done()
    })
  })
  it('.reject should work with other', (done) => {
    MyPromise.reject(new Error('this is a error')).catch((err) => {
      expect(err.message).toBe('this is a error')
      done()
    })
  })

  it('.all should work', (done) => {
    const p1 = new MyPromise((r) => {
      setTimeout(() => {
        r(1)
      }, 1000)
    })
    const p2 = 2
    const p3 = new Promise((r) => {
      r(3)
    })

    MyPromise.all([p1, p2, p3])
      .then(res => {
        expect(res).toEqual([1, 2, 3])
        done()
      })
  })

  it('.all should work with error', (done) => {
    const p1 = new MyPromise((r) => {
      setTimeout(() => {
        r(1)
      }, 1000)
    })
    const p2 = 2
    const p3 = new Promise(() => {
      throw new Error('this is a error')
    })

    MyPromise.all([p1, p2, p3])
      .catch(err => {
        expect(err.message).toBe('this is a error')
        done()
      })
  })

  it('.allSettled should work', () => {
    const p1 = new MyPromise(() => {
      throw new Error('1')
    })
    const p2 = 2
    const p3 = new Promise(() => {
      throw new Error('3')
    })

    MyPromise.allSettled([p1, p2, p3])
      .then(res => {
        expect(res).toBe([
          { status: 'rejected', reason: new Error('1') },
          { status: 'fulfilled', value: 2 },
          { status: 'rejected', reason: new Error('3') }
        ])
      })
  })
})
