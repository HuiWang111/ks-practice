// eslint-ignore
import { jest } from '@jest/globals';
import {
  autoRun,
  observable
} from '..';

describe('test reactive', () => {
  it('should work', () => {
    const obj = {
      a: 1,
      b: '1',
      c: true,
      d: {
        e: '666'
      },
      f: [1, 2, 3]
    };

    observable(obj);
    const autoRunFn = jest.fn();
    autoRun(autoRunFn);

    obj.a = 2;
    expect(autoRunFn).toHaveBeenCalledTimes(1);

    obj.b = '2';
    expect(autoRunFn).toHaveBeenCalledTimes(2);

    obj.c = false;
    expect(autoRunFn).toHaveBeenCalledTimes(3);

    obj.d.e = '777';
    expect(autoRunFn).toHaveBeenCalledTimes(4);

    obj.f.push(4);
    expect(autoRunFn).toHaveBeenCalledTimes(5);
  });
});