import Node from "./node.js";
import prettyPrint from "./prettyPrint.js";

function removeDuplicates(arr) {
  return arr.filter((val, index) => arr.indexOf(val) === index);
}

function mergeSort(arr) {
  const m = Math.floor(arr.length / 2);
  let [leftSide, rightSide] = [arr.slice(0, m), arr.slice(m, arr.length)];
  if (leftSide.length !== 1) {
    leftSide = mergeSort(leftSide);
  }
  if (rightSide.length !== 1) {
    rightSide = mergeSort(rightSide);
  }
  return mergeArrays(leftSide, rightSide);
}

function mergeArrays(a, b, c = []) {
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      c.push(a[i]);
      i++;
    } else {
      c.push(b[j]);
      j++;
    }
  }

  for (i; i < a.length; i++) {
    c.push(a[i]);
  }

  for (j; j < b.length; j++) {
    c.push(b[j]);
  }

  return c;
}

export default class Tree {
  constructor(array) {
    this.array = mergeSort(removeDuplicates(array));
    this.root = null;
  }

  buidlTree(arr = this.array) {
    if (arr.length === 0) return;
    const half = Math.floor(arr.length / 2);
    const [leftSide, rightSide] = [
      arr.slice(0, half),
      arr.slice(half + 1, arr.length),
    ];
    this.root = new Node(
      arr[half],
      this.buidlTree(leftSide),
      this.buidlTree(rightSide)
    );

    return this.root;
  }

  findKey(value, root = this.root) {
    if (root === null) return null;
    if (value < root.data) {
      return this.findKey(value, root.left);
    }
    if (value > root.data) {
      return this.findKey(value, root.right);
    }
    return root;
  }

  insertKey(value) {
    this.root = this.insertRec(this.root, value);
  }

  isEmpty(emptyArray) {
    if (Array.isArray(emptyArray) && emptyArray.length) return true;
    return false;
  }

  levelOrder(func) {
    const Q = [];
    const levelOrderList = [];
    if (this.root === null) return levelOrderList;
    Q.push(this.root);
    while (this.isEmpty(Q)) {
      if (func) {
        func(Q[0]);
      } else {
        levelOrderList.push(Q[0].data);
      }
      if (Q[0].left !== null) {
        Q.push(Q[0].left);
      }
      if (Q[0].right !== null) {
        Q.push(Q[0].right);
      }
      Q.shift();
    }
    if (levelOrderList.length > 0) return levelOrderList;
  }

  depth(value = this.root.data, node = this.root) {
    if (node === null) return 0;
    if (value === node.data) return 0;
    if (value < node.data) {
      return this.depth(value, node.left) + 1;
    }
    if (value > node.data) {
      return this.depth(value, node.right) + 1;
    }
  }

  height(value = "yo", node = this.root) {
    if (value !== "yo") {
      node = this.findKey(value);
    }
    if (node === null) return 0;
    if (!node.left && !node.right) return 0;

    const leftHeight = this.height("yo", node.left);
    const rightHeight = this.height("yo", node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    const leftHeight = this.height("yo", node.left);
    const rightHeight = this.height("yo", node.right);
    const difference = Math.abs(leftHeight - rightHeight);
    if (difference > 1) return false;
    return true;
  }

  rebalance() {
    if (this.isBalanced()) return;
    const arr = mergeSort(removeDuplicates(this.iinorder()));
    this.root = this.buidlTree(arr);
  }

  iinorder(callbackFn, node = this.root, inorderList = []) {
    if (node === null) return;

    this.iinorder(callbackFn, node.left, inorderList);
    if (callbackFn) {
      callbackFn(node);
    } else {
      inorderList.push(node.data);
    }
    this.iinorder(callbackFn, node.right, inorderList);

    if (inorderList.length > 0) return inorderList;
  }

  preorder(callbackFn, node = this.root, preorderList = []) {
    if (node === null) return;
    if (callbackFn) {
      callbackFn(node);
    } else {
      preorderList.push(node.data);
    }
    this.preorder(callbackFn, node.left, preorderList);
    this.preorder(callbackFn, node.right, preorderList);

    if (preorderList.length > 0) return preorderList;
  }

  postorder(callbackFn, node = this.root, postorderList = []) {
    if (node === null) return;
    this.postorder(callbackFn, node.left, postorderList);
    this.postorder(callbackFn, node.right, postorderList);
    if (callbackFn) {
      callbackFn(node);
    } else {
      postorderList.push(node.data);
    }
    if (postorderList.length > 0) return postorderList;
  }

  insertRec(value, root = this.root) {
    if (root === null) return new Node(value);
    if (value < root.data) {
      root.left = this.insertRec(value, root.left);
    } else {
      root.right = this.insertRec(value, root.right);
    }
    return root;
  }

  // after gfg
  insertABitBetter(value) {
    if (this.root === null) {
      this.buidlTree([value]);
    } else {
      let node = this.root;
      while (node.left && node.right) {
        if (node.data > value) {
          node = node.left;
        } else if (node.data < value) {
          node = node.right;
        }
      }
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        node.right = new Node(value);
      }
    }
  }

  // before gfg
  insertBad(value, node = this.root) {
    if (this.root === null) {
      this.buidlTree([value]);
    } else {
      const newNode = new Node(value);
      while (true) {
        if (node.left === null && node.data > value) {
          node.left = newNode;
          return;
        }
        if (node.right === null && node.data < value) {
          node.right = newNode;
          return;
        }
        if (node.data > value) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }
  }

  counter = 0;

  deleteKey(key) {
    this.root = this.deleteRec(this.root, key);
    this.counter = 0;
  }

  deleteRec(root, key) {
    this.counter += 1;
    /* Base Case: If the tree is empty */
    console.log("run", this.counter, "times");
    if (root == null) return root;

    /* Otherwise, recur down the tree */
    if (key < root.data) root.left = this.deleteRec(root.left, key);
    else if (key > root.data) root.right = this.deleteRec(root.right, key);
    // if key is same as root's
    // key, then This is the
    // node to be deleted
    else {
      // node with only one child or no child
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      // node with two children: Get the inorder
      // successor (smallest in the right subtree)
      root.data = this.minValue(root.right);

      // Delete the inorder successor
      root.right = this.deleteRec(root.right, root.data);
    }
    console.log("root returned");
    return root;
  }

  minValue(root) {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.key;
      root = root.left;
    }
    return minv;
  }

  // my Delete function refactored after looking at gfg recurison solution
  deleteABitBetter(value, node = this.root) {
    let previousNode = null;
    if (node === null) return;

    while (node) {
      if (node.data > value) {
        previousNode = node;
        node = node.left;
      } else if (node.data < value) {
        previousNode = node;
        node = node.right;
      } else if (node === this.root) {
        this.root = null;
        return;
      } else if (node.left === null) {
        if (previousNode.left.data === value) {
          previousNode.left = node.right;
        } else {
          previousNode.right = node.right;
        }
        return;
      } else if (node.right === null) {
        if (previousNode.left.data === value) {
          previousNode.left = node.left;
        } else {
          previousNode.right = node.left;
        }
        return;
      } else {
        const inorderSuccessorValue = this.inorderSuccessor(node).data;
        this.delete(inorderSuccessorValue);
        node.data = inorderSuccessorValue;
      }
    }
  }

  // my Delete function before looking at gfg recurison solution
  deleteBad(value) {
    let node = this.root;
    let previousNode = null;
    if (node.left === null && node.right === null && node.data === value) {
      this.root = null;
      return;
    }
    if (node.left === null && node.data === value) {
      this.root = node.right;
      return;
    }
    if (node.right === null && node.data === value) {
      this.root = node.left;
      return;
    }
    while (node) {
      if (node.data === value) {
        if (node.left === null && node.right === null) {
          console.log("this was run");
          if (previousNode.left.data === value) {
            previousNode.left = null;
            return;
          }
          if (previousNode.right.data === value) {
            previousNode.right = null;
            return;
          }
        }
        if (node.left === null) {
          console.log("blah run");

          if (previousNode.left.data === value) {
            previousNode.left = node.right;
            return;
          }
          if (previousNode.right.data === value) {
            previousNode.right = node.right;
            return;
          }
        }

        if (node.right === null) {
          console.log("blah  2 run");
          if (previousNode.left.data === value) {
            previousNode.left = node.left;
            return;
          }
          if (previousNode.right.data === value) {
            previousNode.right = node.left;
            return;
          }
        }
        const inorderSuccessorValue = this.inorderSuccessor(node).data;
        console.log(inorderSuccessorValue);
        this.delete(inorderSuccessorValue);
        node.data = inorderSuccessorValue;
        return;
      }
      if (node.data > value) {
        previousNode = node;
        node = node.left;
      } else {
        previousNode = node;
        node = node.right;
      }
    }
  }

  inorderSuccessor(node = this.root) {
    while (node.right) {
      node = node.right;
    }
    console.log(node);
    return node;
  }

  returnAraay(arr = this.array) {
    if (arr.length == 0) return;
    const half = Math.floor(arr.length / 2);
    const [leftSide, rightSide] = [
      arr.slice(0, half),
      arr.slice(half + 1, arr.length),
    ];
    console.log(leftSide);
    console.log(rightSide);
    console.log(arr[half]);
    this.returnAraay(leftSide);
    this.returnAraay(rightSide);
  }

  prnt() {
    console.log("pp");
    if (this.root === null) {
      console.log("tree empty");
      return;
    }

    prettyPrint(this.root);
  }
}
