/**
 * ĐÁP ÁN — Tree Practice
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root]; let i = 1;
  while (q.length && i < arr.length) {
    const n = q.shift();
    if (i < arr.length && arr[i] !== null) { n.left = new TreeNode(arr[i]); q.push(n.left); } i++;
    if (i < arr.length && arr[i] !== null) { n.right = new TreeNode(arr[i]); q.push(n.right); } i++;
  }
  return root;
}

// BÀI 1: Diameter of Binary Tree
function diameterOfBinaryTree(root) {
  let maxDiam = 0;
  function depth(node) {
    if (!node) return 0;
    const l = depth(node.left), r = depth(node.right);
    maxDiam = Math.max(maxDiam, l + r);
    return 1 + Math.max(l, r);
  }
  depth(root);
  return maxDiam;
}

// BÀI 2: Subtree of Another Tree
function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
function isSame(a, b) {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isSame(a.left, b.left) && isSame(a.right, b.right);
}

// BÀI 3: Serialize and Deserialize
function serialize(root) {
  if (!root) return 'null';
  return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}
function deserialize(data) {
  const vals = data.split(',');
  let i = 0;
  function build() {
    if (vals[i] === 'null') { i++; return null; }
    const node = new TreeNode(Number(vals[i++]));
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}

// BÀI 4: Binary Tree Maximum Path Sum
function maxPathSum(root) {
  let maxSum = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const l = Math.max(0, gain(node.left));
    const r = Math.max(0, gain(node.right));
    maxSum = Math.max(maxSum, node.val + l + r);
    return node.val + Math.max(l, r);
  }
  gain(root);
  return maxSum;
}

console.log("=== Solutions: Tree ===");
console.log("Diameter:", diameterOfBinaryTree(buildTree([1,2,3,4,5])));  // 3
const t = buildTree([3,4,5,1,2]);
console.log("isSubtree:", isSubtree(t, buildTree([4,1,2])));  // true
const serialized = serialize(buildTree([1,2,3]));
console.log("Serialize:", serialized);
console.log("Deserialize root:", deserialize(serialized).val);  // 1
console.log("Max Path Sum:", maxPathSum(buildTree([-10,9,20,null,null,15,7])));  // 42
