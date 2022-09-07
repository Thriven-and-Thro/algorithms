// 斐波那契数列
// f(n)=f(n-1)+f(n-2)
function f(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return f(n - 1) + f(n - 2);
}

console.log(f(5));
