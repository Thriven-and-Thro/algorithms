// 查找第一个等于给定值
const biaryFindFirst = (arr, value) => {
  if (arr.length === 0) return -1;
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === value) {
      if (mid === 0 || arr[mid - 1] < value) return mid;
      high = mid - 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

// 查找最后一个相等的数
const biaryFindLast = (arr, value) => {
  if (arr.length === 0) return -1;
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === value) {
      if (mid === arr.length - 1 || arr[mid + 1] > value) return mid;
      low = mid + 1;
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

// 查找第一个大于等于给定值的元素
const biaryFindFistBig = (arr, value) => {
  if (arr.length === 0) return -1;
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] >= value) {
      if (mid === 0 || arr[mid - 1] < value) return mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

// 查找最后一个小于等于给定值的元素
const biaryFindLastSmall = (arr, value) => {
  if (arr.length === 0) return -1;
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] <= value) {
      if (mid === arr.length - 1 || arr[mid + 1] > value) return mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};

const arr = [1, 2, 3, 4, 4, 4, 4, 4, 6, 7, 8, 8, 9];
const first = biaryFindFirst(arr, 4);
console.log(`FindFirst: ${first}`);

const last = biaryFindLast(arr, 4);
console.log(`FindLast: ${last}`);
const FisrtBig = biaryFindFistBig(arr, 5);
console.log(`FindFisrtBig: ${FisrtBig}`);
const LastSmall = biaryFindLastSmall(arr, 4);
console.log(`FindLastSmall: ${LastSmall}`);
