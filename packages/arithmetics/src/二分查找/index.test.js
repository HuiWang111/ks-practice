import { binarySearch } from '.';

describe('test binarySearch', () => {
  it('should work', () => {
    const arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
    const res = binarySearch(arr, 2);
    expect(res).toEqual(2);
  });
});