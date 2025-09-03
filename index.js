class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }
    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }
  delete(value, node = this.root) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minValue = this.findMin(node.right);
      node.value = minValue;
      node.right = this.delete(minValue, node.right);
    }

    return node;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }
  find(value, node = this.root) {
    if (!node) return null;

    if (value === node.value) return node;

    if (value < node.value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }
  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    const queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (!node) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }

    traverse(this.root);
  }

  findNode(value, node = this.root) {
    if (!node) return null;
    if (node.value === value) return node;
    if (value < node.value) return this.findNode(value, node.left);
    return this.findNode(value, node.right);
  }

  height(value) {
    const node = this.findNode(value);
    if (!node) return null;

    function calcHeight(n) {
      if (!n) return -1;
      return Math.max(calcHeight(n.left), calcHeight(n.right)) + 1;
    }

    return calcHeight(node);
  }

  depth(value) {
    let depth = 0;
    let current = this.root;

    while (current) {
      if (value === current.value) return depth;
      if (value < current.value) current = current.left;
      else current = current.right;
      depth++;
    }
    return null;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    function checkBalance(n) {
      if (!n) return { height: -1, balanced: true };

      const left = checkBalance(n.left);
      const right = checkBalance(n.right);

      const balanced =
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1;

      return {
        height: Math.max(left.height, right.height) + 1,
        balanced,
      };
    }

    return checkBalance(node).balanced;
  }
  inOrderArray(node = this.root, arr = []) {
    if (!node) return arr;
    this.inOrderArray(node.left, arr);
    arr.push(node.value);
    this.inOrderArray(node.right, arr);
    return arr;
  }

  rebalance() {
    const sortedValues = this.inOrderArray();
    this.root = this.buildTree(sortedValues);
  }
}

function generateRandomArray(size, max = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

const randomArray = generateRandomArray(10, 100);
const tree = new Tree(randomArray);

console.log("Initial array:", randomArray);
console.log("Is balanced?", tree.isBalanced());

console.log("Level-order:");
tree.levelOrderForEach((n) => console.log(n.value));
console.log("Pre-order:");
tree.preOrderForEach((n) => console.log(n.value));
console.log("Post-order:");
tree.postOrderForEach((n) => console.log(n.value));
console.log("In-order:");
tree.inOrderForEach((n) => console.log(n.value));

[101, 110, 120].forEach((n) => tree.insert(n));
console.log("Is balanced after inserting >100?", tree.isBalanced());

tree.rebalance();
console.log("Is balanced after rebalance?", tree.isBalanced());

console.log("Level-order after rebalance:");
tree.levelOrderForEach((n) => console.log(n.value));
console.log("Pre-order after rebalance:");
tree.preOrderForEach((n) => console.log(n.value));
console.log("Post-order after rebalance:");
tree.postOrderForEach((n) => console.log(n.value));
console.log("In-order after rebalance:");
tree.inOrderForEach((n) => console.log(n.value));

tree.prettyPrint(tree.root);
