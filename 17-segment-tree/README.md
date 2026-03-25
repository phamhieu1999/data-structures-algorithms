# 🌲 Segment Tree & Fenwick Tree

## Segment Tree

Range queries + point updates.

| Thao tác | Complexity |
|----------|-----------|
| Build | O(n) |
| Query | O(log n) |
| Update | O(log n) |

```javascript
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
```

## Fenwick Tree (BIT)

```javascript
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
```

## Bài tập: Range Sum Query, Count of Smaller Numbers After Self, Reverse Pairs
