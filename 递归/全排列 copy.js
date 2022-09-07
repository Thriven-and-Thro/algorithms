// 123 => 123 => ...
//        213 => ...
//        321 => 321
//               312

function f(arr, n) {
  if (n === arr.length - 1) {
    console.log(arr);
    return;
  }
  const arrC = arr;
  for (let i = n; i < arr.length - 1; i++) {
    let temp = arr[i + 1];
    arr[i + 1] = arr[n];
    arr[n] = temp;
    // console.log(arr);

    f(arr, n + 1);

    // 避免重复，需将交换的节点恢复
    temp = arr[i + 1];
    arr[i + 1] = arr[n];
    arr[n] = temp;
  }
  f(arrC, n + 1);
}

// 注意，js中不能通过下标修改字符串，所以这里使用数组
f([1, 2, 3], 0);
