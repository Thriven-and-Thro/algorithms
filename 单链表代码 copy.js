// 单链表数据结构
class Node {
  constructor(item) {
    this.element = item;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("head");
  }

  fineByValue(item) {
    let currentNode = this.head;
    while (currentNode !== null && currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    if (currentNode === null) return false;
    return currentNode;
  }

  fineByIndex(index) {
    let currentNode = this.head;
    let pos = 0;
    while (currentNode !== null && pos < index) {
      currentNode = currentNode.next;
      pos++;
    }
    if (currentNode === null) return false;
    return currentNode;
  }

  insert(newElement, element) {
    let currentNode = this.fineByValue(element);
    if (currentNode) {
      const newNode = new Node(newElement);
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      return true;
    } else {
      return false;
    }
  }

  display() {
    if (this.checkCircle()) return false;
    let currentNode = this.head.next;
    while (currentNode !== null) {
      console.log(currentNode.element);
      currentNode = currentNode.next;
    }
  }

  finePrev(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    if (currentNode.next === null) return false;
    return currentNode;
  }

  remove(item) {
    let currentNode = this.fineByValue(item);
    if (currentNode) {
      let prevNode = this.finePrev(item);
      prevNode.next = currentNode.next;
    } else {
      return false;
    }
  }

  // 单链表算法
  // 链表中环的检测
  checkCircle() {
    let fast = this.head;
    let slow = this.head;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) return true;
    }
    return false;
  }

  // 单链表反转：尾插法
  reverseList() {
    let currentNode = this.head.next;
    let root = new Node("head");
    while (currentNode !== null) {
      const next = currentNode.next;
      currentNode.next = root.next;
      root.next = currentNode;
      currentNode = next;
    }
    this.head = root;
  }

  // 删除链表倒数第 n 个结点
  removeByIndexFromEnd(index) {
    if (this.checkCircle()) return false;
    this.reverseList();
    let currentNode = this.head;
    let pos = 0;
    while (currentNode !== null && pos < index) {
      currentNode = currentNode.next;
      pos++;
    }
    if (currentNode === null) {
      this.reverseList();
      return false;
    }
    this.remove(currentNode.element);
    this.reverseList();
  }

  // 求链表的中间结点
  findMiddleNode() {
    if (this.checkCircle()) return false;
    let fast = this.head;
    let slow = this.head;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
    }
    if (fast !== null) {
      console.log(slow.element, slow.next.element);
    } else {
      console.log(slow.element);
    }
    return slow;
  }
}

const mergeSortedLists = (listA, listB) => {
  if (!listA || !listB) return false;
  let a = listA.next;
  let b = listB.next;

  let resultList = undefined;
  if (a.element < b.element) {
    resultList = a;
    a = a.next;
  } else {
    resultList = b;
    b = b.next;
  }

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

  if (a !== null) currentNode.next = a;
  if (b !== null) currentNode.next = b;

  return resultList;
};

console.log("------------test------------");
const list1 = new LinkedList();
list1.insert(1, "head");
list1.insert(45, "head");
list1.insert(5, "head");
list1.insert(7, "head");
list1.insert(56, "head");
list1.insert(7, "head");
list1.display();

console.log("---------fineByIndex--------");
console.log(list1.fineByIndex(1));

console.log("-----------finePrev---------");
console.log(list1.finePrev(5));

console.log("-----------remove-----------");
list1.remove(7);
list1.display();

console.log("--------reverseList---------");
list1.reverseList();
list1.display();

console.log("----removeByIndexFromEnd----");
list1.removeByIndexFromEnd(2);
list1.display();

console.log("-------findMiddleNode-------");
list1.findMiddleNode();

console.log("------mergeSortedLists------");
const sortedList1 = new LinkedList();
sortedList1.insert(9, "head");
sortedList1.insert(8, "head");
sortedList1.insert(7, "head");
sortedList1.insert(6, "head");
const sortedList2 = new LinkedList();
sortedList2.insert(21, "head");
sortedList2.insert(20, "head");
sortedList2.insert(19, "head");
sortedList2.insert(8, "head");
let resuleList = mergeSortedLists(sortedList1.head, sortedList2.head);
while (resuleList !== null) {
  console.log(resuleList.element);
  resuleList = resuleList.next;
}
