/**
 * 1.散列表-单链表法
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Item {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor() {
    this.store = [];
  }

  // 散列函数
  hash(string) {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i);
    }
    return hash % 10;
  }

  // 写入散列表
  put(item) {
    if (typeof item.key !== "string") {
      throw "item must have key!";
    }
    let hash = this.hash(item.key);
    const newNode = new Node(item);

    // 碰撞处理
    let cresh = this.store[hash];
    // 当前操作节点
    let currentIndex = cresh;
    // 前节点
    let preNode;

    // 存在cresh
    if (cresh) {
      // 遍历链表
      while (currentIndex !== null) {
        // 保存最后null的上一个节点
        if (currentIndex.next === null) {
          preNode = currentIndex;
        }
        // 没有重复，查找下一个
        if (currentIndex.value.key !== newNode.value.key) {
          currentIndex = currentIndex.next;
          // 重复，删除，查找下一个
        } else {
          return;
        }
      }
      // 当前槽为空，直接插入
    } else {
      // 添加哨兵
      this.store[hash] = new Node("head");
      preNode = this.store[hash];
    }
    preNode.next = newNode;
  }

  // 读取
  get(key) {
    let hash = this.hash(key);
    let currentIndex = this.store[hash];
    while (currentIndex !== null) {
      if (currentIndex.value.key === key) return currentIndex.value.value;
      currentIndex = currentIndex.next;
    }
    return false;
  }

  // 删除节点
  remove(key) {
    let hash = this.hash(key);
    let currentIndex = this.store[hash];
    while (currentIndex !== null) {
      if (currentIndex.value.key === key) {
        let preIndex = this.store[hash];
        while (preIndex.next === currentIndex) {
          preIndex.next = currentIndex.next;
        }
        return true;
      }
      currentIndex = currentIndex.next;
    }
    return false;
  }

  // 清空
  clear() {
    this.store = [];
  }

  // 打印
  print() {
    for (let i = 0; i < this.store.length; i++) {
      console.log(this.store[i]);
      let currentIndex = this.store[i].next;
      while (currentIndex !== null) {
        console.log(currentIndex.value);
        currentIndex = currentIndex.next;
      }
    }
  }
}

// 测试函数
function baseTest() {
  let hashTable = new HashTable();
  for (let i = 0; i < 50; i++) {
    hashTable.put(new Item(`test${i}`, `some value${i}`));
    hashTable.put(new Item(`test${50 - i}`, `some value${i - 1}`));
  }
  console.log(hashTable);
  console.log(hashTable.remove("test49"));
  console.log(hashTable.get("test10"));
  console.log(hashTable.get("test49"));
  hashTable.print();
}

baseTest();
