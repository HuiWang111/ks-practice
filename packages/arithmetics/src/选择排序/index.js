export function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; ++i) {  //最后一次只有一项，不做比较，所以次数为arr.length - 1。
    let maxValue = arr[0];
    let maxIndex = 0;
    for (let j = 0; j < arr.length - i; ++j) {
      if (arr[j] > maxValue) {
        maxValue = arr[j];
        maxIndex = j;
      }
    }
    [arr[maxIndex], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[maxIndex]];
  }
}