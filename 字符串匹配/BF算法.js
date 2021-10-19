function bf(mainStr, otherStr) {
  let j = 0;
  while (j <= mainStr.length - otherStr.length) {
    let i = 0;
    for (; i < otherStr.length; i++) {
      // 遇到不匹配则主字符串后移一位
      if (mainStr[j + i] !== otherStr[i]) {
        j++;
        break;
      }
    }
    if (i === otherStr.length) return j;
  }
  return false;
}

const result = bf("asdabc", "abc");
console.log(result);
