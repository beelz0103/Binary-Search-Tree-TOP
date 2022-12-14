import Tree from "./tree.js";

function returnRandomArray() {
  const arr = [];
  let length = 100;
  while (length > 0) {
    const value = getRndInteger(0, 1001);
    arr.push(value);
    length -= 1;
  }

  return arr;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function unbalanceTree(tree) {
  let num = 100;
  while (num > 0) {
    const value = getRndInteger(0, 1001);
    tree.insertRec(value);
    num -= 1;
  }
}

const treeArray = returnRandomArray();
const newTree = new Tree(treeArray);
newTree.buidlTree();
console.log(newTree.levelOrder());
console.log(newTree.iinorder());
console.log(newTree.preorder());
console.log(newTree.postorder());
console.log(newTree.isBalanced());
unbalanceTree(newTree);
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());
console.log(newTree.levelOrder());
console.log(newTree.iinorder());
console.log(newTree.preorder());
console.log(newTree.postorder());
