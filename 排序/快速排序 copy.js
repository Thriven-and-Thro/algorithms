const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// 排序函数
// 中间数：pivotVal
// 设置一个交换点：startIndex
// 遍历到小于中间数的数据，会与该交换点交换
// 对于小于中间数的交换点，会原地交换（不改变）
// 对于大于中间数的交换点，会与其他小于中间数的交换点交换
// 最后一步中间数与交换点交换，表明该交换点也是大于中间数的，而中间数刚好需要在中间
const partition = (arr, pivot, left, right) => {
  const pivotVal = arr[pivot];
  let startIndex = left;
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotVal) {
      swap(arr, i, startIndex);
      startIndex++;
    }
  }
  swap(arr, startIndex, pivot);
  return startIndex;
};

// 分治函数
// 思想：递归分治
// 选取最右边的数作为中间数
const quickSort = (arr, left, right) => {
  if (left < right) {
    const pivot = right;
    let pivotIndex = partition(arr, pivot, left, right);
    quickSort(arr, left, pivotIndex - 1 <= left ? left : pivotIndex - 1);
    quickSort(arr, pivotIndex + 1 >= right ? right : pivotIndex + 1, right);
  }
};

const testArr = [];
let i = 0;
while (i < 10) {
  testArr.push(Math.floor(Math.random() * 1000));
  i++;
}
console.log("unsort", testArr);
quickSort(testArr, 0, testArr.length - 1);
console.log("sort", testArr);
