// 对于一组不同重量、不同价值、不可分割的物品，
// 选择将某些物品装入背包，在满足背包最大重量限制的前提下，
// 背包中可装入物品的总价值最大是多少呢？

// 回溯算法
// 决定性改为价值，然后都是拿与不拿
class Bag1 {
  constructor(valueArr, bagArr, weight) {
    this.valueArr = valueArr;
    this.bagArr = bagArr;
    this.weight = weight;
    this.vmax = 0;
    // 快速创建二维数组
    this.flag = Array(this.bagArr.length).fill([]);
    this.getBagResult(0, 0, 0);
  }

  getBagResult(i, vw, cw) {
    if (i === this.bagArr.length) {
      if (this.vmax < vw) this.vmax = vw;
      return;
    }

    // 说是不拿剪枝，不知道这两行代码是否有用
    if (this.flag[i][cw] > vw) return;
    this.flag[i][cw] = vw;

    this.getBagResult(i + 1, vw, cw);

    if (cw + this.bagArr[i] <= this.weight) {
      this.getBagResult(i + 1, vw + this.valueArr[i], cw + this.bagArr[i]);
    }
  }
}

class Bag2 {
  constructor(valueArr, bagArr, weight) {
    this.valueArr = valueArr;
    this.bagArr = bagArr;
    this.weight = weight;
    // 快速创建二维数组并在其中添加值，需要使用以下方法
    // 不然会造成子索引都引用同一个数组
    // this.status = Array(this.bagArr.length).fill(
    //   Array(this.weight + 1).fill(-1)
    // );
    this.status = Array(this.bagArr.length)
      .fill(-1)
      .map(() => Array(this.weight + 1).fill(-1));
    // console.log(this.status);
  }

  getBagResult() {
    this.status[0][0] = 0;
    // console.log(this.status);
    if (this.bagArr[0] < this.weight) {
      this.status[0][this.bagArr[0]] = this.valueArr[0];
    }
    // console.log(this.status);
    for (let i = 1; i < this.bagArr.length; i++) {
      // 不拿
      for (let j = 0; j <= this.weight; j++) {
        if (this.status[i - 1][j] >= 0) {
          this.status[i][j] = this.status[i - 1][j];
        }
      }

      // 拿
      for (let j = 0; j <= this.weight; j++) {
        const w = j + this.bagArr[i];
        if (w <= this.weight) {
          const v = this.status[i - 1][j] + this.valueArr[i];
          if (v > this.status[i - 1][w]) {
            this.status[i][w] = v;
          }
        }
      }
    }

    // console.log(this.status);
    let max = 0;
    for (let j = this.weight; j >= 0; j--) {
      if (this.status[this.bagArr.length - 1][j] > max) {
        max = this.status[this.bagArr.length - 1][j];
      }
    }
    return max;
  }
}

const bag1 = new Bag1([5, 1, 8, 9], [8, 2, 8, 5], 10);
console.log(bag1.vmax);

const bag2 = new Bag2([5, 1, 8, 7], [7, 2, 7, 5], 10);
console.log(bag2.getBagResult());
