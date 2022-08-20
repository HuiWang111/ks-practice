import { bubbleSort } from '.';

describe('test bubbleSort', () => {
  it('should work', () => {
    const arr = [4, 6, 8, 1, 7, 9, 2, 3, 5];
    bubbleSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
