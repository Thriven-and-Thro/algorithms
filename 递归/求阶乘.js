// 求阶乘
// f(n)=n*f(n-1)
// f(1)=1
// f(0)=0
function f(n) {
  if (n === 1) return 1;
  if (n === 0) return 0;
  return f(n - 1) * n;
}

console.log(f(4));
