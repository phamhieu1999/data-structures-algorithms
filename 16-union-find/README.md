# 🔗 Union-Find (Disjoint Set)

## Khái niệm

Union-Find quản lý các **tập hợp rời nhau**, hỗ trợ 2 thao tác:
- **Find**: Tìm đại diện (root) của tập chứa phần tử
- **Union**: Gộp 2 tập hợp lại

## Tối ưu hóa

| Kỹ thuật | Mục đích |
|----------|----------|
| **Union by Rank** | Gắn cây thấp vào cây cao → tránh cây lệch |
| **Path Compression** | Gắn trực tiếp vào root khi Find → giảm chiều cao |

Kết hợp cả hai → gần như **O(1)** cho mỗi thao tác (amortized O(α(n))).

## Code minh họa

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n; // số tập hợp
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;

    // union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.count--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

### Number of Connected Components
```javascript
function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [u, v] of edges) {
    uf.union(u, v);
  }
  return uf.count;
}
```

## Bài tập phổ biến

- Number of Connected Components
- Redundant Connection
- Accounts Merge
- Longest Consecutive Sequence
- Number of Islands (Union-Find approach)
