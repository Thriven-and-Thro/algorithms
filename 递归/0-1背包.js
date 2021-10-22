// 假设有一个背包，背包总的承载重量是 Wkg。
// 现在有 n 个物品，每个物品的重量不等，并且不可分割。
// 现在期望选择几件物品，装载到背包中。
// 在不超过背包所能装载重量的前提下，如何让背包中物品的总重量最大？

// 回溯算法
// 背包问题：（求最优）
// 拿与不拿两种递归
// 可进行剪枝
class Bag1 {
  constructor(weight, arr) {
    this.weight = weight;
    this.bagArr = arr;
    this.max = 0;
    // 注意：即使是填充一个空的数组，其中的数组也是相同的
    // 由此可得：数组的fill方法不适合添加引用类型
    // this.mem = Array(this.bagArr.length).fill([]);
    this.mem = Array(this.bagArr.length)
      .fill("")
      .map(() => []);
    this.getBagResult(0, 0);
  }

  getBagResult(cw, i) {
    // 每次到底都与记录的最大值比较
    if (cw === this.weight || i === this.bagArr.length) {
      if (cw > this.max) {
        this.max = cw;
      }
      return;
    }

    // 剪枝，错误？？？
    if (this.mem[i][cw]) return;
    this.mem[i][cw] = true;

    // 不拿
    this.getBagResult(cw, i + 1);

    // 拿
    if (cw + this.bagArr[i] <= this.weight) {
      this.getBagResult(cw + this.bagArr[i], i + 1);
    }
  }
}

// 动态规划
// 维持一个二维数组
// 记录每一次取与不取的结果
// 全部记录完后最后一行最后一列被记录的则为最大值
class Bag2 {
  constructor(weight, arr) {
    this.weight = weight;
    this.bagArr = arr;
    // 维持一个二维数组
    // 此处填充的都是同一个数组
    // this.status = Array(this.bagArr.length).fill(
    //   Array(this.weight + 1).fill(0)
    // );
    // 采用Array搭配map的方法
    this.status = Array(this.bagArr.length)
      .fill("")
      .map(() => Array(this.weight + 1).fill(0));
  }

  getBagResult() {
    // 第一列特殊情况，也可以使用哨兵
    if (this.bagArr[0] < this.weight) this.status[0][this.bagArr[0]] = 1;
    this.status[0][0] = 1;

    // 这里因为拿与不拿都为1，即使相互覆盖也没事
    // 但是当拿与不拿的值不同时，
    // 在同一个循环中，有可能拿的值被后面不拿的值所覆盖
    for (let i = 1; i < this.bagArr.length; i++) {
      for (let j = 0; j <= this.weight; j++) {
        if (this.status[i - 1][j] === 1) {
          // 记录每一次取与不取的结果
          if (j + this.bagArr[i] <= this.weight)
            this.status[i][j + this.bagArr[i]] = 1;
          this.status[i][j] = 1;
        }
      }
    }

    // 全部记录完后最后一行最后一列被记录的则为最大值
    for (let j = this.weight; j >= 0; j--) {
      if (this.status[this.bagArr.length - 1][j] === 1) return j;
    }
  }
}

const bag1 = new Bag1(10, [8, 4, 2, 3]);
const bag2 = new Bag2(10, [8, 3, 3, 3]);
console.log(bag1.max);
console.log(bag2.getBagResult());
