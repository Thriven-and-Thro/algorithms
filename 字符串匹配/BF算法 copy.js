function bf(mainStr, otherStr) {
  for (let j = 0; j <= mainStr.length - otherStr.length; ) {
    let i = 0;
    for (; i < otherStr.length; i++) {
      if (mainStr[i + j] !== otherStr[i]) {
        j++;
        break;
      }
    }
    if (i === otherStr.length) return j;
  }
}

const result = bf("aabcbc", "abc");
console.log(result);
