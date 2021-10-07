class Node {
  constructor(item) {
    (this.value = item), (this.next = null);
  }
}

class LinkStack {
  constructor() {
    this.top = null;
  }

  push(item) {
    const newNode = new Node(item);
    if (this.top === null) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
  }

  pop() {
    if (this.top === null) return false;
    this.top = this.top.next;
  }

  display() {
    let temp = this.top;
    while (temp !== null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }
}

console.log("---------------test---------------");
const stack1 = new LinkStack();
console.log("---------------push---------------");
stack1.push(1);
stack1.push(1);
stack1.display();
console.log("---------------pop----------------");
stack1.pop();
stack1.display();
