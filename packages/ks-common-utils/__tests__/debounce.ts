import { timer } from 'rxjs';
import { jest } from '@jest/globals';
import { debounce } from '../src/debounce';

describe('test debounce', () => {
  it('should work', (done) => {
    const fn = jest.fn();
    const callback = debounce(fn, 100);
    const source = timer(0, 10);

    const subscription = source.subscribe(i => {
      if (i === 100) {
        subscription.unsubscribe();
        setTimeout(() => {
          expect(fn).toBeCalledTimes(1);
          done();
        }, 200);
      } else {
        callback();
      }
    });
  });

  it('immediate should work', (done) => {
    const fn = jest.fn();
    const callback = debounce(fn, 100);
    const source = timer(0, 10);

    const subscription = source.subscribe(i => {
      if (i === 100) {
        subscription.unsubscribe();
        setTimeout(() => {
          expect(fn).toBeCalledTimes(1);
          done();
        }, 200);
      } else {
        callback();
      }
    });
  });
});
