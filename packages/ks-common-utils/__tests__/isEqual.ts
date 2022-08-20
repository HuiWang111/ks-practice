import { isEqual } from '../src/isEqual';

describe('test isEqual', () => {
  it('should work', () => {
    expect(isEqual('hh', 'hh')).toBe(true);
    expect(isEqual('hh', 'hhh')).toBe(false);
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(/a/i, /a/i)).toBe(true);
    // expect(isEqual(/a/i, /a/g)).toBe(false);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, null)).toBe(false);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual([1], [1])).toBe(true);
    expect(isEqual({ value: 1 }, { value: 1 })).toBe(true);
    expect(isEqual(1, new Number(1))).toBe(true);
    expect(isEqual('Curly', new String('Curly'))).toBe(true);
    expect(isEqual(true, new Boolean(true))).toBe(true);
    expect(isEqual(+0, -0)).toBe(false);
    expect(isEqual(new Date(2009, 9, 25), new Date(2009, 9, 25))).toBe(true);
    expect(isEqual(/a/i, new RegExp(/a/i))).toBe(true);

    function Persion() {
      this.name = 'hh';
    }
    function Animal() {
      this.name = 'hh';
    }
    const a = new Persion();
    const b = new Animal();
    expect(isEqual(a, b)).toBe(false);
    expect(isEqual({ name: 'hh' }, { name: 'hh' })).toBe(true);
  });
});
