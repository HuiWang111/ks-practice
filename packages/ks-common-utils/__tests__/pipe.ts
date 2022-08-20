import { pipe } from '../src';

describe('test pipe', () => {
  it('pipe should work on Array', () => {
    const filter = (arr: any[]): any[] => arr.filter(i => i < 5);
    const map = (arr: any[]): any[] => arr.map(i => i * 2);
    const pipedFunc = pipe(filter, map);
    const list = [1, 2, 3, 4, 5];

    expect(pipedFunc(list)).toEqual([2, 4, 6, 8])
  });

  it('pipe should work on Math static function', () => {
    const f = pipe(Math.pow, Math.sqrt);
    const res = Math.sqrt(Math.pow(2, 3));

    expect(f(2, 3)).toBe(res)
  });
});
