import { apply } from '..';

describe('test apply', () => {
  it('should work', () => {
    const array = ['a', 'b'];
    const elements = [0, 1, 2];
    apply(array.push, array, elements);

    expect(array).toEqual(['a', 'b', 0, 1, 2]);
    expect(apply(Math.max, null, [1, 2, 3, 4, 5])).toBe(5);
    expect(apply(Math.min, null, [1, 2, 3, 4, 5])).toBe(1);
  });
});