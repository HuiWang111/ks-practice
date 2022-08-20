import { randomSort } from '.'

describe('test randomSort', () => {
  it('should work', () => {
    expect(randomSort([1, 2, 3, 4, 5, 6, 7])).not.toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});