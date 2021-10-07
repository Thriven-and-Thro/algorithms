class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkQueue {
  constructor() {
    this.tail = null;
    this.head = null;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
  }

  dequeue() {
    if (this.head === null) return false;
    this.head = this.head.next;
  }

  display() {
    let headTemp = this.head;
    while (headTemp !== null) {
      console.log(headTemp.value);
      headTemp = headTemp.next;
    }
  }
}

console.log("------------test------------");
const queue1 = new LinkQueue();
console.log("----------enqueue-----------");
queue1.enqueue(1);
queue1.enqueue(2);
queue1.enqueue(3);
queue1.display();
console.log("----------dequeue-----------");
queue1.dequeue();
queue1.dequeue();
queue1.display();
