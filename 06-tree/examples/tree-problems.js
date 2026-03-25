/**
 * BÀI 1: Maximum Depth of Binary Tree
 * Link: https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 *     3
 *    / \
 *   9  20
 *      / \
 *     15  7
 * Output: 3
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: tạo tree từ mảng (level-order, null = trống)
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

console.log("=== Max Depth ===");
const tree1 = buildTree([3, 9, 20, null, null, 15, 7]);
console.log(maxDepth(tree1));  // 3

/**
 * BÀI 2: Invert Binary Tree
 * Link: https://leetcode.com/problems/invert-binary-tree/
 *
 *     4             4
 *    / \    →      / \
 *   2   7        7   2
 *  /\  /\       /\  /\
 * 1 3 6  9     9 6 3  1
 */
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}

// Helper: print tree level-order
function treeToArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  return result;
}

console.log("\n=== Invert Binary Tree ===");
const tree2 = buildTree([4, 2, 7, 1, 3, 6, 9]);
console.log("Before:", treeToArray(tree2));
invertTree(tree2);
console.log("After: ", treeToArray(tree2));

/**
 * BÀI 3: Validate BST
 * Link: https://leetcode.com/problems/validate-binary-search-tree/
 */
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}

console.log("\n=== Validate BST ===");
console.log(isValidBST(buildTree([2, 1, 3])));             // true
console.log(isValidBST(buildTree([5, 1, 4, null, null, 3, 6]))); // false

/**
 * BÀI 4: Lowest Common Ancestor (LCA)
 * Link: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 */
function lowestCommonAncestor(root, p, q) {
  if (!root || root.val === p || root.val === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}

console.log("\n=== Lowest Common Ancestor ===");
const tree4 = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
const lca = lowestCommonAncestor(tree4, 5, 1);
console.log("LCA of 5 and 1:", lca.val);  // 3

/**
 * BÀI 5: Binary Tree Level Order Traversal
 * Link: https://leetcode.com/problems/binary-tree-level-order-traversal/
 */
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

console.log("\n=== Level Order Traversal ===");
console.log(levelOrder(buildTree([3, 9, 20, null, null, 15, 7])));
// [[3], [9, 20], [15, 7]]
