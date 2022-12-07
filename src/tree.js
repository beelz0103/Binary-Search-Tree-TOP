import Node from "./node.js";
import prettyPrint from "./prettyPrint.js";

export default class Tree {
  constructor(array) {
    this.array = array;
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

  insert(value) {
    let node = this.root;
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
    prettyPrint(this.root);
  }
}
