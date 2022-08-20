export function binarySearch(array, target, start = 0, end = array.length - 1) {
  const mid = Math.floor((start + end) / 2);
  if (target === array[mid]) {
    return mid;
  } else if (target < array[mid]) {
    return binarySearch(array, target, start, mid - 1);
  } else {
    return binarySearch(array, target, mid + 1, end);
  }
}

