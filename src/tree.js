import Node from "./node.js";
import prettyPrint from "./prettyPrint.js";

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buidlTree() {
    const half = Math.floor(this.array.length / 2);
    this.root = new Node(this.array[half]);
    this.root.left = new Node(this.array[half - 1]);
    this.root.right = new Node(this.array[half + 1]);
  }
}
