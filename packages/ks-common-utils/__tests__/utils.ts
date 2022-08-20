import {
  deepSet,
  get,
  getPath
} from '../src/utils';

describe('test utils', () => {
  it('get should work', () => {
    const object = {
      a: 1,
      b: {
        c: {
          d: 2
        }
      }
    };

    expect(get(object, 'a')).toBe(1);
    expect(get(object, 'a', 10)).toBe(1);
    expect(get(object, 'b.c')).toEqual({ d: 2 });
    expect(get(object, 'b.c.d')).toBe(2);
    expect(get(object, 'c')).toBe(undefined);
    expect(get(object, 'c.d')).toBe(undefined);
    expect(get(object, 'c', 10)).toBe(10);
    expect(get(object, 'c.d', { x: 10 })).toEqual({ x: 10 });
  });

  it('deepSet should work', () => {
    expect(deepSet({}, ['a', 'b', 'c'], 5)).toEqual({ a: { b: { c: 5 } } });
    expect(deepSet([], [0, 0, 0], 'a')).toEqual([[['a']]]);
  });

  it('getPath should work', () => {
    expect(() => getPath('%%%%**')).toThrowError();
    expect(() => getPath('a.b.%%.c')).toThrowError();
    expect(getPath()).toEqual([]);
    expect(getPath('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(getPath('a[0][0][1]')).toEqual(['a', '0', '0', '1']);
    expect(getPath('a.b[0].c')).toEqual(['a', 'b', '0', 'c']);
  });
});
