/**
 * 1) 单链表反转
 * 2) 链表中环的检测
 * 3) 两个有序的链表合并
 * 4) 删除链表倒数第n个结点
 * 5) 求链表的中间结点
 *
 */

// 执行操作时都不好跳过哨兵，打印时可以
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // 哨兵
    this.head = new Node("head");
  }
  // 根据value查找节点
  findByValue(item) {
    // 遍历节点查询
    let currentNode = this.head;
    while (currentNode !== null && currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode === null ? -1 : currentNode;
  }
  // 根据index查找节点
  findByIndex(index) {
    // 遍历节点查询
    let currentNode = this.head;
    let pos = 0;
    while (currentNode !== null && pos !== index) {
      currentNode = currentNode.next;
      pos++;
    }
    return currentNode === null ? -1 : currentNode;
  }
  // 指定元素向后插入
  insert(newElement, element) {
    // 查询该节点再判断是否存在再进行插入操作
    const currentNode = this.findByValue(element);
    if (currentNode === -1) {
      console.log("未找到插入位置");
      return;
    }
    const newNode = new Node(newElement);
    newNode.next = currentNode.next;
    currentNode.next = newNode;
  }
  // 查找前一个
  findPrev(item) {
    // 遍历当前判断下一个
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    if (currentNode.next === null) {
      return -1;
    }
    return currentNode;
  }
  // 根据值删除
  remove(item) {
    // 查询该节点并判断是否存在，再获取前一个节点执行删除
    const desNode = this.findByValue(item);
    if (desNode === -1) {
      console.log("未找到元素");
      return;
    }
    const prevNode = this.findPrev(item);
    prevNode.next = desNode.next;
  }
  // 遍历显示所有节点
  display() {
    //先检查是否为环
    if (this.checkCircle()) return false;

    let currentNode = this.head;
    while (currentNode !== null) {
      console.log(currentNode.element);
      currentNode = currentNode.next;
    }
  }

  // 尾插法 反转单链表
  reverseList() {
    // 保存上下两个指针后进行next的重新指向
    const root = new Node("head");
    let currentNode = this.head.next;
    while (currentNode !== null) {
      const next = currentNode.next;
      currentNode.next = root.next;
      root.next = currentNode;
      currentNode = next;
    }
    this.head = root;
  }

  // 环验证
  checkCircle() {
    // 快慢指针，存在环路一定会相遇
    let fast = this.head;
    let slow = this.head;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) return true;
    }
    return false;
  }

  // 删除倒数第k个节点
  removeByIndexFromEnd(index) {
    // 反转成正向进行删除后再反转
    //务必先判断是否是 环链表
    if (this.checkCircle()) return false;
    this.reverseList();
    let pos = 1;
    let currentNode = this.head.next;
    while (currentNode !== null && pos < index) {
      currentNode = currentNode.next;
      pos++;
    }
    if (currentNode === null) return false;
    this.remove(currentNode.element);
    this.reverseList();
  }

  // 求中间节点
  findMiddleNode() {
    // 快慢指针法。快指针循环完慢指针正好在中间
    // 个人还是觉得应该判断一下环链表
    if (this.checkCircle()) return false;
    let fast = this.head;
    let slow = this.head;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }

    // 偶数个数打印两个
    if (fast.element !== null) {
      console.log(slow.element, slow.next.element);
      // 奇数个数打印一个
    } else {
      console.log(slow.element);
    }

    return slow;
  }
}

// 两个有序的链表合并
const mergeSortedLists = (listA, listB) => {
  // 先判断两个链表是否为空
  if (!listA) return false;
  if (!listB) return false;
  let a = listA;
  let b = listB;

  // 再判断谁的头结点小（大）
  let resultList = undefined;
  if (a.element < b.element) {
    resultList = a;
    a = a.next;
  } else {
    resultList = b;
    b = b.next;
  }

  // 遍历两个链表，小（大）的接上链表
  let currentNode = resultList;
  while (a !== null && b !== null) {
    if (a.element < b.element) {
      currentNode.next = a;
      a = a.next;
    } else {
      currentNode.next = b;
      b = b.next;
    }
    currentNode = currentNode.next;
  }

  // 当一个为空时，另一个直接接上剩下的节点
  if (a !== null) currentNode.next = a;
  if (b !== null) currentNode.next = b;

  return resultList;
};

// Test
const LList = new LinkedList();
LList.insert("chen", "head");
LList.insert("curry", "chen");
LList.insert("sang", "head");
LList.insert("zhao", "head");
LList.display();
console.log("-------------start reverse------------");
LList.reverseList();
LList.display();
console.log("-------------check circle------------");
console.log(LList.checkCircle());
console.log("-------------remove the one before last------------");
LList.removeByIndexFromEnd(2);
LList.display();

const sortedList1 = new LinkedList();
sortedList1.insert(9, "head");
sortedList1.insert(8, "head");
sortedList1.insert(7, "head");
sortedList1.insert(6, "head");
console.log("------------test findMiddleNode-----------");
sortedList1.findMiddleNode();
const sortedList2 = new LinkedList();
sortedList2.insert(21, "head");
sortedList2.insert(20, "head");
sortedList2.insert(19, "head");
sortedList2.insert(18, "head");
console.log("-------------sort two list------------");
let sortedList = mergeSortedLists(sortedList1.head.next, sortedList2.head.next);
while (sortedList !== null) {
  console.log(sortedList.element);
  sortedList = sortedList.next;
}
