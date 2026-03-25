/**
 * Dijkstra's Algorithm — Shortest Path (Weighted Graph)
 *
 * Time:  O((V + E) log V) với Min Heap
 * Space: O(V + E)
 *
 * Chỉ hoạt động với trọng số KHÔNG ÂM.
 */

class MinHeap {
  constructor() { this.h = []; }
  size() { return this.h.length; }
  push(item) {
    this.h.push(item);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p][0] <= this.h[i][0]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  pop() {
    const top = this.h[0], last = this.h.pop();
    if (this.h.length) {
      this.h[0] = last;
      let i = 0;
      while (true) {
        let s = i; const l = 2*i+1, r = 2*i+2;
        if (l < this.h.length && this.h[l][0] < this.h[s][0]) s = l;
        if (r < this.h.length && this.h[r][0] < this.h[s][0]) s = r;
        if (s === i) break;
        [this.h[s], this.h[i]] = [this.h[i], this.h[s]];
        i = s;
      }
    }
    return top;
  }
}

/**
 * Dijkstra — Tìm đường đi ngắn nhất từ source đến tất cả nodes
 *
 * @param {Map<number, [number, number][]>} graph - adjacency list: node → [[neighbor, weight]]
 * @param {number} source - node bắt đầu
 * @param {number} n - tổng số nodes
 * @returns {number[]} dist - khoảng cách ngắn nhất từ source đến mỗi node
 */
function dijkstra(graph, source, n) {
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;

  const heap = new MinHeap();
  heap.push([0, source]);  // [distance, node]

  while (heap.size()) {
    const [d, u] = heap.pop();

    // Skip nếu đã tìm được đường ngắn hơn
    if (d > dist[u]) continue;

    for (const [v, weight] of (graph.get(u) || [])) {
      const newDist = dist[u] + weight;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        heap.push([newDist, v]);
      }
    }
  }
  return dist;
}

/**
 * Dijkstra + Path Reconstruction (truy vết đường đi)
 */
function dijkstraWithPath(graph, source, n) {
  const dist = new Array(n).fill(Infinity);
  const prev = new Array(n).fill(-1);
  dist[source] = 0;

  const heap = new MinHeap();
  heap.push([0, source]);

  while (heap.size()) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue;

    for (const [v, weight] of (graph.get(u) || [])) {
      const newDist = dist[u] + weight;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        prev[v] = u;
        heap.push([newDist, v]);
      }
    }
  }

  // Truy vết path
  function getPath(target) {
    const path = [];
    let node = target;
    while (node !== -1) {
      path.unshift(node);
      node = prev[node];
    }
    return path[0] === source ? path : [];
  }

  return { dist, getPath };
}

// ============================================================
// DEMO 1: Network Delay Time (LeetCode #743)
// ============================================================
function networkDelayTime(times, n, k) {
  const graph = new Map();
  for (const [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push([v, w]);
  }

  const dist = dijkstra(graph, k, n + 1);
  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}

console.log("=== Network Delay Time ===");
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2));  // 2
console.log(networkDelayTime([[1,2,1]], 2, 2));                    // -1

// ============================================================
// DEMO 2: Shortest Path with Reconstruction
// ============================================================
console.log("\n=== Dijkstra with Path ===");
/*
  Graph:
  0 --4-- 1 --2-- 3
  |       |       |
  1       3       1
  |       |       |
  2 --5-- 4 --6-- 5
*/
const g = new Map();
g.set(0, [[1, 4], [2, 1]]);
g.set(1, [[0, 4], [3, 2], [4, 3]]);
g.set(2, [[0, 1], [4, 5]]);
g.set(3, [[1, 2], [5, 1]]);
g.set(4, [[1, 3], [2, 5], [5, 6]]);
g.set(5, [[3, 1], [4, 6]]);

const result = dijkstraWithPath(g, 0, 6);
console.log("Distances from node 0:", result.dist);
// [0, 4, 1, 6, 6, 7] ← Expected: 0→0, 1→4, 2→1, 3→6(0→1→3), 4→6(0→2→4), 5→7(0→1→3→5)

for (let i = 0; i < 6; i++) {
  console.log(`0 → ${i}: cost=${result.dist[i]}, path=[${result.getPath(i).join('→')}]`);
}

// ============================================================
// DEMO 3: Cheapest Flight (LeetCode #787 variant)
// ============================================================
console.log("\n=== Cheapest Flights ===");
const flights = new Map();
flights.set(0, [[1, 100], [2, 500]]);
flights.set(1, [[2, 100]]);
const flightDist = dijkstra(flights, 0, 3);
console.log(`0 → 2: cost=${flightDist[2]}`);  // 200 (0→1→2)
