const arr = Array(4)
  .fill(-1)
  .map(() => Array(11).fill(-1));
console.log(arr);
arr[0][0] = 0;
console.log(arr);

let a = [];
for (let i = 0; i <= 4; i++) {
  a[i] = [];
  for (let j = 0; j <= 10; j++) {
    a[i][j] = -1;
  }
}
// console.log(a);
// a[0][0] = 0;
// console.log(a);
