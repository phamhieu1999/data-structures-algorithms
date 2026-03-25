/**
 * Union-Find (Disjoint Set Union) - Examples
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rx = this.find(x), ry = this.find(y);
    if (rx === ry) return false;
    if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry;
    else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx;
    else { this.parent[ry] = rx; this.rank[rx]++; }
    this.count--;
    return true;
  }

  connected(x, y) { return this.find(x) === this.find(y); }
}

/**
 * BÀI 1: Number of Connected Components
 *
 * Input:  n=5, edges=[[0,1],[1,2],[3,4]]
 * Output: 2
 */
function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [u, v] of edges) uf.union(u, v);
  return uf.count;
}

console.log("=== Connected Components ===");
console.log(countComponents(5, [[0,1],[1,2],[3,4]]));     // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1

/**
 * BÀI 2: Redundant Connection
 * Link: https://leetcode.com/problems/redundant-connection/
 *
 * Tìm cạnh thừa gây cycle.
 *
 * Input:  [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 */
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);
  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return [u, v]; // đã connected → cạnh thừa
  }
  return [];
}

console.log("\n=== Redundant Connection ===");
console.log(findRedundantConnection([[1,2],[1,3],[2,3]]));         // [2,3]
console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]

/**
 * BÀI 3: Number of Islands (Union-Find approach)
 * Link: https://leetcode.com/problems/number-of-islands/
 */
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  const uf = new UnionFind(rows * cols);
  let waterCount = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '0') {
        waterCount++;
        continue;
      }
      const id = r * cols + c;
      // union với ô phải và ô dưới
      if (r + 1 < rows && grid[r+1][c] === '1') uf.union(id, (r+1)*cols + c);
      if (c + 1 < cols && grid[r][c+1] === '1') uf.union(id, r*cols + c + 1);
    }
  }
  return uf.count - waterCount;
}

console.log("\n=== Number of Islands (UF) ===");
console.log(numIslands([
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
]));  // 3

/**
 * BÀI 4: Accounts Merge
 * Link: https://leetcode.com/problems/accounts-merge/
 *
 * Gộp accounts cùng chủ dựa trên email chung.
 */
function accountsMerge(accounts) {
  const uf = new UnionFind(accounts.length);
  const emailToId = new Map();

  // Map email → account index, union nếu email trùng
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];
      if (emailToId.has(email)) {
        uf.union(i, emailToId.get(email));
      } else {
        emailToId.set(email, i);
      }
    }
  }

  // Group emails by root
  const groups = new Map();
  for (const [email, id] of emailToId) {
    const root = uf.find(id);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }

  // Build result
  const result = [];
  for (const [root, emails] of groups) {
    result.push([accounts[root][0], ...emails.sort()]);
  }
  return result;
}

console.log("\n=== Accounts Merge ===");
console.log(accountsMerge([
  ["John","john@mail.com","john_hello@mail.com"],
  ["John","john@mail.com","john_work@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnny@mail.com"]
]));
