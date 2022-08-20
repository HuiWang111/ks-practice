export function randomSort(arr, result = []) {
  const len = arr.length;

  if (len === 1) {
    result.push(arr[0]);
    return result;
  }

  const ran = Math.floor(Math.random() * len);  /* select one Element by random */
  result.push(arr[ran]);
  arr.splice(ran, 1);

  return randomSort(arr, result);
}