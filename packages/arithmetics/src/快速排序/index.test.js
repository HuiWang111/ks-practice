import { quickSort } from '.';

describe('test quickSort', () => {
  it('should work', () => {
    const arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
    quickSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});