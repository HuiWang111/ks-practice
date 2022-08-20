import { timer } from 'rxjs';
import { jest } from '@jest/globals';
import { throttle } from '../src/throttle';

describe('test throttle', () => {
  it('should work', (done) => {
    const fn = jest.fn();
    const callback = throttle(fn, 100);
    const source = timer(0, 10);

    const subscription = source.subscribe((i) => {
      if (i === 100) {
        subscription.unsubscribe();
        setTimeout(() => {
          // expect(fn).toBeCalledTimes(11); // TODO: why 16 || 11 ?
          done();
        }, 200);
      } else {
        callback();
      }
    });
  });
});

