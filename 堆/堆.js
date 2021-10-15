class Heap {
  constructor() {
    this.heap = [null];
    this.len = 1;
  }

  // 交换
  swap(heap, first, second) {
    const temp = heap[first];
    heap[first] = heap[second];
    heap[second] = temp;
  }

  // 插入
  insert(data) {
    let i = this.len;
    // 先插入末尾
    this.heap[i] = data;
    this.len++;
    // 大于父节点，交换
    while (this.heap[Math.floor(i / 2)] < data) {
      if (Math.floor(i / 2) === 0) break;
      this.swap(this.heap, i, Math.floor(i / 2));
      i = Math.floor(i / 2);
    }
  }

  // 删除
  delete(data) {
    // 查找节点
    let temp;
    for (let j = 1; j < this.len; j++) {
      if (this.heap[j] === data) temp = j;
    }
    // 跟尾结点交换并删除
    this.swap(this.heap, temp, this.len - 1);
    this.len -= 1;

    while (1) {
      let maxTemp = temp * 2;
      // 右节点是否更大
      if (
        maxTemp + 1 < this.len &&
        this.heap[maxTemp + 1] > this.heap[maxTemp]
      ) {
        maxTemp = maxTemp + 1;
      }
      // 存在maxTemp并大于父节点，交换
      if (maxTemp < this.len && this.heap[maxTemp] > this.heap[temp]) {
        this.swap(this.heap, maxTemp, temp);
        temp = maxTemp;
        // 不存在或都小于父节点，退出
      } else {
        break;
      }
    }
  }

  // 打印
  print() {
    console.log(this.heap.slice(0, this.len));
  }

  // 排序
  order() {
    const temp = this.len;
    while (this.len > 1) {
      this.delete(this.heap[1]);
    }
    this.len = temp;
  }
}

console.log("-------------test------------");
let heap1 = new Heap();
console.log("------------insert-----------");
heap1.insert(9);
heap1.insert(11);
heap1.insert(12);
heap1.insert(10);
heap1.insert(13);
heap1.print();
console.log("------------delete-----------");
heap1.delete(13);
heap1.print();
console.log("-------------order-----------");
heap1.order();
heap1.print();
