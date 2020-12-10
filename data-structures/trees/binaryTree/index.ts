export class BinaryTreeNode implements TreeNode {
  value: number;
  left = null;
  right = null;

  constructor(value: number) {
    this.value = value;
  }
}

interface BinaryTree {
  root: BinaryTreeNode;
  insert: (value: number) => void;
  lookup: (value: number) => void;
}

export default class BinarySearchTree implements BinaryTree {
  root = null;

  constructor(rootNode: BinaryTreeNode) {
    if (!rootNode || rootNode.value == null) return;
    this.root = rootNode;
  }
  
  /**
   * Inserts a new node inside the tree
   * Traverses the tree nodes to find the correct spot to place it
   */
  insert = (value: number) => {
    const newNode = new BinaryTreeNode(value);

    // If there is no root node insert it as a root node
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // Traverse the nodes checking where the node should go
    let current: BinaryTreeNode | null = this.root
    while (current) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }

        current = current.left;
      }

      if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          break;
        }

        current = current.right;
      }
    }

    return newNode;
  };

  lookup = (value: number) => {};
}
