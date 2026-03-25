/**
 * Segment Tree & Fenwick Tree - Examples
 */

// ============================================================
// BÀI 1: Range Sum Query - Mutable (Segment Tree)
// Link: https://leetcode.com/problems/range-sum-query-mutable/
// ============================================================

class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this._build(arr, 1, 0, this.n - 1);
  }

  _build(arr, node, start, end) {
    if (start === end) { this.tree[node] = arr[start]; return; }
    const mid = Math.floor((start + end) / 2);
    this._build(arr, 2 * node, start, mid);
    this._build(arr, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  update(idx, val, node = 1, start = 0, end = this.n - 1) {
    if (start === end) { this.tree[node] = val; return; }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) this.update(idx, val, 2 * node, start, mid);
    else this.update(idx, val, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  query(l, r, node = 1, start = 0, end = this.n - 1) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    return this.query(l, r, 2 * node, start, mid) +
           this.query(l, r, 2 * node + 1, mid + 1, end);
  }
}

console.log("=== Segment Tree: Range Sum Query ===");
const st = new SegmentTree([1, 3, 5, 7, 9, 11]);
console.log("Sum [1..3]:", st.query(1, 3));  // 3+5+7 = 15
st.update(2, 10); // arr[2] = 10
console.log("After update arr[2]=10:");
console.log("Sum [1..3]:", st.query(1, 3));  // 3+10+7 = 20
console.log("Sum [0..5]:", st.query(0, 5));  // 1+3+10+7+9+11 = 41

// ============================================================
// BÀI 2: Range Sum Query - Mutable (Fenwick/BIT)
// ============================================================

class FenwickTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }

  update(i, delta) {
    for (i++; i <= this.n; i += i & (-i)) this.tree[i] += delta;
  }

  prefixSum(i) {
    let sum = 0;
    for (i++; i > 0; i -= i & (-i)) sum += this.tree[i];
    return sum;
  }

  rangeSum(l, r) {
    return this.prefixSum(r) - (l > 0 ? this.prefixSum(l - 1) : 0);
  }
}

console.log("\n=== Fenwick Tree: Range Sum ===");
const nums = [1, 3, 5, 7, 9, 11];
const ft = new FenwickTree(nums.length);
nums.forEach((v, i) => ft.update(i, v));
console.log("Sum [1..3]:", ft.rangeSum(1, 3));  // 15
ft.update(2, 5); // add 5 to index 2 → arr[2] becomes 10
console.log("After +5 at idx 2:");
console.log("Sum [1..3]:", ft.rangeSum(1, 3));  // 20

// ============================================================
// BÀI 3: Count of Smaller Numbers After Self
// Link: https://leetcode.com/problems/count-of-smaller-numbers-after-self/
//
// Input:  [5, 2, 6, 1]
// Output: [2, 1, 1, 0]
// ============================================================
function countSmaller(nums) {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((v, i) => rank.set(v, i));

  const bit = new FenwickTree(sorted.length);
  const result = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    const r = rank.get(nums[i]);
    result.unshift(r > 0 ? bit.prefixSum(r - 1) : 0);
    bit.update(r, 1);
  }
  return result;
}

console.log("\n=== Count Smaller After Self ===");
console.log(countSmaller([5, 2, 6, 1]));  // [2, 1, 1, 0]
console.log(countSmaller([1]));           // [0]
console.log(countSmaller([2, 0, 1]));     // [2, 0, 0]
