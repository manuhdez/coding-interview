import BinarySearchTree, { BinaryTreeNode } from './index';

function insertBatchValues(tree: BinarySearchTree, values: number[]): void {
  for (let value of values) {
    tree.insert(value);
  }
}

describe('BinarySearchTree', () => {
  let rootNode: BinaryTreeNode;
  beforeEach(() => {
    rootNode = new BinaryTreeNode(30);
  });

  test('A new binary search tree can be created only when a valid root node is passed', () => {
    let tree = new BinarySearchTree(rootNode);
    expect(tree.root).not.toBeNull();
    expect(tree.root.value).toEqual(30);

    // Keep the root node as null if there is no valid node passed
    tree = new BinarySearchTree(null);
    expect(tree.root).toBeNull();

    // Adds the node as root if the value is 0
    tree = new BinarySearchTree(new BinaryTreeNode(0));
    expect(tree.root).not.toBeNull();
    expect(tree.root.value).toEqual(0);
  });

  describe('Node insertion', () => {
    let baseTree: BinarySearchTree;
    beforeEach(() => {
      baseTree = new BinarySearchTree(rootNode);
    });

    test('Adds nodes correctly at both sides of the root', () => {
      expect(baseTree.root.value).toEqual(30);
      expect(baseTree.root.left).toBeNull();
      expect(baseTree.root.right).toBeNull();

      baseTree.insert(25);
      baseTree.insert(37);
      expect(baseTree.root.left.value).toEqual(25);
      expect(baseTree.root.right.value).toEqual(37);
    });

    test('Adds nodes into a third level', () => {
      expect(baseTree.root.value).toEqual(30);

      /**
       *        30
       *    25       37
       * 23   27   32  39
       */
      const valuesToInsert = [25, 37, 27, 32, 39, 23];
      insertBatchValues(baseTree, valuesToInsert);
      // for (let value of valuesToInsert) {
      //   baseTree.insert(value);
      // }

      const secondLevel = [baseTree.root.left, baseTree.root.right];
      const secondLevelValues: number[] = secondLevel.map((node) => node.value);

      const thirdLevel: BinaryTreeNode[][] = secondLevel.map((node) => [
        node.left,
        node.right,
      ]);
      const thirdLevelValues: number[] = thirdLevel.reduce<number[]>(
        (prev, current) => {
          current.forEach((node) => prev.push(node.value));
          return prev;
        },
        []
      );

      expect(secondLevelValues).toEqual([25, 37]);
      expect(thirdLevelValues).toEqual([23, 27, 32, 39]);
    });
  });

  describe('Node lookup', () => {
    let tree: BinarySearchTree;
    const treeValues = [25, 37, 27, 32, 39, 23];
    beforeEach(() => {
      tree = new BinarySearchTree(rootNode);
      insertBatchValues(tree, treeValues);
      // for (let value of treeValues) {
      //   tree.insert(value);
      // }
    });

    test('Can find a node with a value that is stored in the tree', () => {
      const searchValues = [30, 32, 23];
      for (let searchValue of searchValues) {
        const lookupResult = tree.lookup(searchValue);

        expect(lookupResult).not.toBeNull();
        expect(lookupResult instanceof BinaryTreeNode).toEqual(true);
        expect(lookupResult.value).toEqual(searchValue);
      }
    });

    test('Returns null if the value cannot be found in the tree', () => {
      const searchValues = [1, 28, 9, 15];
      for (let searchValue of searchValues) {
        const lookupResult = tree.lookup(searchValue);
        expect(lookupResult).toBeNull();
      }
    });
  });

  describe('Check if a node is a leaf', () => {
    let tree: BinarySearchTree;
    const treeValues = [25, 37, 27, 32, 39, 23];
    beforeEach(() => {
      tree = new BinarySearchTree(rootNode);
      insertBatchValues(tree, treeValues);
    });

    test('When a node is not a leaf must return false', () => {
      expect(tree.isLeaf(tree.root)).toEqual(false);
      expect(tree.isLeaf(tree.root.right)).toEqual(false);
      expect(tree.isLeaf(tree.root.left)).toEqual(false);
    });

    test('When a node is a leaf must return true', () => {
      const leafValues = [27, 23, 39, 32];

      for (let value of leafValues) {
        const node = tree.lookup(value);
        expect(tree.isLeaf(node)).toEqual(true);
      }
    });
  });

  describe('GetSingleChild', () => {
    let tree: BinarySearchTree;
    const treeValues = [25, 37, 27, 32];
    beforeEach(() => {
      tree = new BinarySearchTree(rootNode);
      insertBatchValues(tree, treeValues);
    });

    test('Returns null if a node has no children', () => {
      const nodesWithouthChildren = [27, 32];
      for (let value of nodesWithouthChildren) {
        const node = tree.lookup(value);
        expect(tree.getSingleChild(node)).toEqual(null);
      }
    });

    test('Returns null if the node has more than one child', () => {
      expect(tree.getSingleChild(tree.root)).toEqual(null);
    });

    test('Returns the single child of the given node', () => {
      const nodesWithSingleChild = [25, 37];
      for (let value of nodesWithSingleChild) {
        const node = tree.lookup(value);
        const child = tree.getSingleChild(node);
        expect(child).not.toBeNull();
      }
    });
  });

  describe.skip('GetNodeSuccesor', () => {
    let tree: BinarySearchTree;
    const treeValues = [25, 37, 27, 32];
    beforeEach(() => {
      tree = new BinarySearchTree(rootNode);
      insertBatchValues(tree, treeValues);
    });

    test('Returns the given node if it has no right child');
    test('Returns the direct right child if that one has no left child');
  });

  describe.only('Remove a tree node', () => {
    let tree: BinarySearchTree;
    const treeValues = [25, 37, 27, 32, 39, 23];
    beforeEach(() => {
      tree = new BinarySearchTree(rootNode);
      insertBatchValues(tree, treeValues);
    });

    test('Remove a node with no children', () => {
      expect(tree.lookup(39)).toEqual({ left: null, right: null, value: 39 });
      tree.remove(39);
      expect(tree.lookup(39)).toEqual(null);
    });

    test('Remove a node with only right child', () => {
      const expectedNode = new BinaryTreeNode(37);
      expectedNode.right = new BinaryTreeNode(39);

      tree.remove(32);
      expect(tree.lookup(37)).toEqual(expectedNode);

      tree.remove(37);
      expect(tree.lookup(37)).toEqual(null);
      expect(tree.lookup(30).right).toEqual({
        value: 39,
        left: null,
        right: null,
      });
    });

    test('Remove a node with only left child', () => {
      // remove node 39 to leave node 37 with only a left child
      tree.remove(39);
      expect(tree.lookup(37)).toHaveProperty('left', {
        left: null,
        right: null,
        value: 32,
      });

      tree.remove(37);
      expect(tree.root.right).toHaveProperty('value', 32);
    });

    test('Remove a node with two children', () => {
      expect(tree.root.right).toHaveProperty('value', 37);
      expect(tree.root.right.right).toHaveProperty('value', 39);
      expect(tree.root.right.left).toHaveProperty('value', 32);

      tree.remove(37);
      expect(tree.root.right).toHaveProperty('value', 39);
      expect(tree.root.right).toHaveProperty('left', {
        left: null,
        right: null,
        value: 32,
      });
    });

    test('Remove a node with multiple children', () => {
      tree.remove(30);
      expect(tree.root).toHaveProperty('value', 32);
      expect(tree.root.right).toHaveProperty('value', 37);
      expect(tree.root.right.right).toHaveProperty('value', 39);
    });
  });
});
