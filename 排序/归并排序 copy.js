// 合并函数
// 对两个数组中的数进行逐一比较，然后将比较结果放入一个新的数组里面
const mergeArr = (left, right) => {
  let temp = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (left.length > leftIndex && right.length > rightIndex) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex]);
      leftIndex++;
    } else {
      temp.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

// 将数组递归拆成两部分
// 对不能再拆的数组放入合并函数
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return mergeArr(mergeSort(left), mergeSort(right));
};

const testArr = [];
let i = 0;
while (i < 100) {
  testArr.push(Math.floor(Math.random() * 1000));
  i++;
}

const res = mergeSort(testArr);
console.log(res);
