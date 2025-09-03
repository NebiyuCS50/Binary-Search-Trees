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
      // ✅ Found the node to delete

      // Case 1: no children
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: one child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: two children
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
}
const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
tree.prettyPrint(tree.root);
