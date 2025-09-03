# Binary Search Trees

A JavaScript implementation of a Binary Search Tree (BST) with common operations and pretty-printing.

## Features

- Build a balanced BST from an array
- Insert and delete nodes
- Find nodes, minimum value, height, and depth
- Traversal methods: level-order, in-order, pre-order, post-order
- Check if the tree is balanced
- Rebalance the tree
- Pretty-print the tree structure in the console

## Usage

1. **Clone or download this repository.**
2. **Run the code:**

```bash
node index.js
```

3. **Example output:**

- Initial array and traversals
- Balance status before and after insertions/rebalancing
- Pretty-printed tree structure

## Main Classes

- `Node`: Represents a node in the tree.
- `Tree`: Handles all BST operations.

## Example

```javascript
const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
tree.prettyPrint(tree.root);
```

## Methods

- `insert(value)`
- `delete(value)`
- `find(value)`
- `levelOrderForEach(callback)`
- `inOrderForEach(callback)`
- `preOrderForEach(callback)`
- `postOrderForEach(callback)`
- `height(value)`
- `depth(value)`
- `isBalanced()`
- `rebalance()`
- `prettyPrint(node)`
