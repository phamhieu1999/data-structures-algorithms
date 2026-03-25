# 🌳 Tree (Cây)

## Khái niệm

Tree là cấu trúc dữ liệu phi tuyến tính, gồm các node liên kết theo quan hệ cha-con.

```
        1          ← root
       / \
      2   3        ← internal nodes
     / \   \
    4   5   6      ← leaf nodes
```

## Binary Tree (Cây nhị phân)

Mỗi node có **tối đa 2 con** (left, right).

### Duyệt cây (Tree Traversal)

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Inorder: Left → Root → Right (BST → sorted)
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// Preorder: Root → Left → Right
function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// Postorder: Left → Right → Root
function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}

// Level Order (BFS)
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

## BST (Binary Search Tree)

**Tính chất**: Left < Root < Right

| Thao tác | Average | Worst (skewed) |
|----------|---------|----------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

```javascript
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
}
```

## Cây cân bằng

- **AVL Tree**: |height(left) - height(right)| ≤ 1
- **Red-Black Tree**: Dùng trong Map/Set của nhiều ngôn ngữ

## Bài tập phổ biến

- Maximum Depth of Binary Tree
- Invert Binary Tree
- Validate BST
- Lowest Common Ancestor
- Binary Tree Level Order Traversal
