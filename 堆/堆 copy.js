class Heap {
  constructor() {
    this.heap = [null];
    this.len = 1;
  }

  // 交换
  swap(heap, i, j) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  // 插入
  insert(data) {
    let i = this.len;
    this.heap[i] = data;
    this.len++;

    while (1) {
      const par = Math.floor(i / 2);
      if (par === 0) return;
      if (this.heap[i] > this.heap[par]) {
        this.swap(this.heap, par, i);
        i = par;
      } else {
        return;
      }
    }
  }

  // 删除
  delete(data) {
    let dataLocation;
    for (let i = 1; i < this.len; i++) {
      if (this.heap[i] === data) dataLocation = i;
    }
    this.swap(this.heap, dataLocation, this.len - 1);
    this.len--;

    while (1) {
      let maxTemp = dataLocation * 2;
      if (maxTemp + 1 < this.len && this.heap[maxTemp + 1] > this.heap[maxTemp])
        maxTemp = maxTemp + 1;
      if (maxTemp < this.len && this.heap[maxTemp] > this.heap[dataLocation]) {
        this.swap(this.heap, maxTemp, dataLocation);
      } else {
        return;
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
heap1.insert(6);
heap1.insert(10);
heap1.insert(2);
heap1.insert(6);
heap1.insert(5);
heap1.print();
console.log("------------delete-----------");
heap1.delete(5);
heap1.print();
console.log("-------------order-----------");
heap1.order();
heap1.print();
