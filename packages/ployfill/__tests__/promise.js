/*
 * @Autor: hui.wang
 * @Date: 2022-03-05 16:12:26
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-03-05 21:01:38
 * @emial: hui.wang@bizfocus.cn
 */
import { MyPromise } from '..';

describe('test MyPromise', () => {
  it('handle sync resolve', (done) => {
    new MyPromise((resolve) => {
      resolve(11);
    }).then(value => {
      expect(value).toBe(11);
      done();
    });
  });

  it('handle async resolve', (done) => {
    new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(11);
      }, 1000)
    }).then(value => {
      expect(value).toBe(11);
      done();
    });
  });

  it('handle sync reject', (done) => {
    new MyPromise((resolve, reject) => {
      reject(new Error('handle sync reject'));
    }).catch(e => {
      expect(e.message).toBe('handle sync reject');
      done();
    });
  });

  it('handle sync reject in executor', (done) => {
    new MyPromise((resolve, reject) => {
      throw new Error('handle sync reject in executor');
    }).catch(e => {
      expect(e.message).toBe('handle sync reject in executor');
      done();
    });
  });

  it('handle async reject', (done) => {
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('handle sync reject'));
      }, 1000)
    }).catch(e => {
      expect(e.message).toBe('handle sync reject');
      done();
    });
  });

  it('handle chain call then', (done) => {
    new MyPromise((resolve) => {
      resolve(2)
    }).then(() => {
      return 3
    }).then((val) => {
      expect(val).toBe(3)
      done()
    })
  })

  it('handle reject on then', (done) => {
    new MyPromise(() => {
      throw new Error('handle reject on then')
    }).then(() => {}, (err) => {
      expect(err.message).toBe('handle reject on then');
      done()
    })
  })
});
