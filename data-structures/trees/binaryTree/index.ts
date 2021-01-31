import { TreeNode } from '../index';

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
    let current: BinaryTreeNode | null = this.root;
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

  /**
   * Looks for a node with the given value and returns it
   */
  lookup = (value: number): BinaryTreeNode | null => {
    if (!this.root) return null;

    let result: BinaryTreeNode | null = null;
    let current: BinaryTreeNode | null = this.root;

    while (current) {
      if (current.value === value) {
        result = current;
        break;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return result;
  };

  remove = (value: number): BinarySearchTree => {
    if (!this.root) return null;

    let parent = null;
    let parentMove = null;
    let current = this.root;
    while (current) {
      if (current.value === value) {
        // current node is the target to remove

        // check if the target is a leaf
        if (this.isLeaf(current)) {
          parent[parentMove] = null;
          current = null;
          return;
        }

        // check if the target has only one child
        if (this.getSingleChild(current)) {
          const successor = this.getSingleChild(current);
          parent[parentMove] = successor;
          current = null;
          return;
        }

        // if target has two children replace with the right branch and left child
        const successor = this.getNodeSuccessor(current);
        if (current.value === this.root.value) {
          this.root = successor;
        }
        successor.left = current.left;
        successor.right = current.right;

        if (parent && parentMove) {
          parent[parentMove] = successor;
        }
        return;
      }

      if (value < current.value) {
        parent = current;
        parentMove = 'left';
        current = current.left;
      } else {
        parent = current;
        parentMove = 'right';
        current = current.right;
      }
    }

    return this.root;
  };

  isLeaf = (node: BinaryTreeNode): boolean => {
    return !node.left && !node.right;
  };

  getSingleChild = (node: BinaryTreeNode): BinaryTreeNode | null => {
    if (node.left && !node.right) {
      return node.left;
    }
    if (node.right && !node.left) {
      return node.right;
    }

    return null;
  };

  getNodeSuccessor = (node: BinaryTreeNode): BinaryTreeNode | null => {
    if (!node) return null;
    if (!node.right) return node;

    const rightNode = node.right;
    return rightNode.left || rightNode;
  };
}

// const rootNode = new BinaryTreeNode(30);
// let tree: BinarySearchTree;
// const values = [25, 37, 27, 32, 39, 23];
// tree = new BinarySearchTree(rootNode);
// for (let value of values) {
//   tree.insert(value);
// }
// tree.remove(39);
