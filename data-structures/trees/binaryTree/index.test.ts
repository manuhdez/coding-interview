import BinarySearchTree, { BinaryTreeNode } from './index';

describe("BinarySearchTree", () => {
  let rootNode: BinaryTreeNode;
  beforeEach(() => {
    rootNode = new BinaryTreeNode(30);
  })

  test("A new binary search tree can be created only when a valid root node is passed", () => {
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

  describe("Node insertion", () => {
    let baseTree: BinarySearchTree;
    beforeEach(() => {
      baseTree = new BinarySearchTree(rootNode);
    });

    test("Adds nodes correctly at both sides of the root", () => {
      expect(baseTree.root.value).toEqual(30);
      expect(baseTree.root.left).toBeNull();
      expect(baseTree.root.right).toBeNull();

      baseTree.insert(25);
      baseTree.insert(37);
      expect(baseTree.root.left.value).toEqual(25);
      expect(baseTree.root.right.value).toEqual(37);
    });

    test("Adds nodes into a third level", () => {
      expect(baseTree.root.value).toEqual(30);

      /**
       *        30
       *    25       37    
       * 23   27   32  39
       */
      const valuesToInsert = [25, 37, 27, 32, 39, 23];
      for (let value of valuesToInsert) {
        baseTree.insert(value);
      }

      const secondLevel = [baseTree.root.left, baseTree.root.right];
      const secondLevelValues: number[] = secondLevel.map(node => node.value);

      const thirdLevel: BinaryTreeNode[][] =  secondLevel.map(node => [node.left, node.right]);
      const thirdLevelValues: number[] = thirdLevel.reduce<number[]>((prev, current) => {
        current.forEach(node => prev.push(node.value));
        return prev;
      }, []);

      expect(secondLevelValues).toEqual([25, 37]);
      expect(thirdLevelValues).toEqual([23, 27, 32, 39]);
    })
  });

  describe.skip("Node lookup", () => {});
})
