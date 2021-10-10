const biaryFind = (arr, value) => {
  if (arr.length === 0) return -1;
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};
const arr = [1, 4, 5, 6, 7, 8, 10, 11, 23, 42, 44, 54, 56, 77, 102];
console.log(biaryFind(arr, 44));
console.log(biaryFind(arr, 1));
console.log(biaryFind(arr, 102));
console.log(biaryFind(arr, 1111));
