class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(
    _data: T,
    _left: TreeNode<T> | null = null,
    _right: TreeNode<T> | null = null
  ) {
    this.data = _data;
    this.left = _left;
    this.right = _right;
  }

  show() {
    return this.data;
  }
}

class BST<T> {
  root: null | TreeNode<T>;

  constructor() {
    this.root = null;
  }

  insert(_data: T) {
    const n = new TreeNode(_data, null, null);

    //First node
    if (this.root === null) {
      this.root = n;
    } else {
      //Get ready to traverse
      let current: TreeNode<T> | null = this.root;
      let parent: unknown;

      //Keep traversing
      while (true) {
        parent = current;

        //Go left
        if (_data < (current as TreeNode<T>).data) {
          current = (current as TreeNode<T>).left;

          if (current === null) {
            (parent as TreeNode<T>).left = n;
            break;
          }

          //Go right
        } else {
          current = (current as TreeNode<T>).right;

          if (current === null) {
            (parent as TreeNode<T>).right = n;
            break;
          }
        }
      }
    }
  }

  inOrder(_node: TreeNode<T> | null = this.root as TreeNode<T>) {
    //Node not equal to null
    if (_node !== null) {
      this.inOrder(_node.left);
      console.log(_node.show());
      this.inOrder(_node.right);
    }
  }

  preOrder(_node: TreeNode<T> | null = this.root as TreeNode<T>) {
    if (_node !== null) {
      console.log(_node.show());
      this.preOrder(_node.left);
      this.preOrder(_node.right);
    }
  }

  postOrder(_node: TreeNode<T> | null = this.root as TreeNode<T>) {
    if (_node !== null) {
      this.postOrder(_node.left);
      this.postOrder(_node.right);
      console.log(_node.show());
    }
  }

  getMin(_node: TreeNode<T> = this.root!) {
    let current = _node;

    while (current?.left !== null) {
      current = current?.left!;
    }

    return current;
  }

  getMax() {
    let current = this.root;

    while (current?.right !== null) {
      current = current?.right!;
    }

    return current.data;
  }

  find(_data: T) {
    let current = this.root;

    while (current?.data !== _data) {
      if (_data < current?.data!) {
        current = current?.left!;
      } else {
        current = current?.right!;
      }

      if (current === null) {
        return null;
      }
    }

    return current;
  }

  private removeNode(_node: TreeNode<T> | null, _data: T) {
    if (_node === null) {
      return null;
    }

    if (_data === _node.data) {
      // node has no children
      if (_node.left === null && _node.right === null) {
        return null;
      }

      // node has no left child
      if (_node.left === null) {
        return _node.right;
      }

      // node has no right child
      if (_node.right === null) {
        return _node.left;
      }

      // node has two children

      const tempNode = this.getMin(_node.right); //!
      _node.data = tempNode.data;
      _node.right = this.removeNode(_node.right, tempNode.data);
      return _node;

      //Keep traversing
    } else if (_data < _node.data) {
      _node.left = this.removeNode(_node.left, _data);
      return _node;
    } else {
      _node.right = this.removeNode(_node.right, _data);
      return _node;
    }
  }

  remove(_data: T) {
    this.root = this.removeNode(this.root!, _data);
  }
}
