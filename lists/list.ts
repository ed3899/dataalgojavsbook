class Node<T> {
  element: T;
  next: Node<T> | null;

  constructor(_element: T) {
    this.element = _element;
    this.next = null;
  }
}

class LinkedList {
  head: InstanceType<typeof Node>;

  constructor() {
    this.head = new Node("head");
  }

  find(_item: string): Node<unknown> | null {
    let currNode = this.head;

    while (currNode.element !== _item) {
      currNode = currNode.next!;
    }

    return currNode;
  }

  insert() {}
}
