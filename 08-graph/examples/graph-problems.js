/**
 * BÀI 1: Number of Islands
 * Link: https://leetcode.com/problems/number-of-islands/
 *
 * Input:
 *   [["1","1","0","0","0"],
 *    ["1","1","0","0","0"],
 *    ["0","0","1","0","0"],
 *    ["0","0","0","1","1"]]
 * Output: 3
 */
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // đánh dấu đã thăm
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}

console.log("=== Number of Islands ===");
console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]));  // 3

/**
 * BÀI 2: Clone Graph (DFS)
 * Link: https://leetcode.com/problems/clone-graph/
 */
class GraphNode {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return null;
  const visited = new Map();

  function dfs(n) {
    if (visited.has(n)) return visited.get(n);
    const clone = new GraphNode(n.val);
    visited.set(n, clone);
    for (const neighbor of n.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  }
  return dfs(node);
}

console.log("\n=== Clone Graph ===");
const n1 = new GraphNode(1), n2 = new GraphNode(2);
const n3 = new GraphNode(3), n4 = new GraphNode(4);
n1.neighbors = [n2, n4]; n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4]; n4.neighbors = [n1, n3];
const cloned = cloneGraph(n1);
console.log("Cloned node 1 val:", cloned.val);
console.log("Cloned neighbors:", cloned.neighbors.map(n => n.val));

/**
 * BÀI 3: Course Schedule (Topological Sort)
 * Link: https://leetcode.com/problems/course-schedule/
 *
 * Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * Output: true (có thể hoàn thành tất cả)
 */
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completed = 0;
  while (queue.length) {
    const course = queue.shift();
    completed++;
    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return completed === numCourses;
}

console.log("\n=== Course Schedule ===");
console.log(canFinish(4, [[1,0],[2,0],[3,1],[3,2]]));  // true
console.log(canFinish(2, [[1,0],[0,1]]));               // false (cycle)

/**
 * BÀI 4: Shortest Path - BFS (Unweighted Graph)
 *
 * Input: graph adjacency list, start, end
 * Output: shortest path length
 */
function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, 0]];

  while (queue.length) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}

console.log("\n=== Shortest Path (BFS) ===");
const g = { A: ['B','C'], B: ['A','D','E'], C: ['A','F'], D: ['B'], E: ['B','F'], F: ['C','E'] };
console.log(`A → F: ${shortestPath(g, 'A', 'F')} steps`);  // 2
console.log(`A → D: ${shortestPath(g, 'A', 'D')} steps`);  // 2
