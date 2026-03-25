# 🕸️ Graph (Đồ thị)

## Khái niệm

Graph gồm tập đỉnh (vertices) và cạnh (edges) nối các đỉnh.

## Biểu diễn đồ thị

### Adjacency List (phổ biến nhất)
```javascript
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C'],
};
```

### Adjacency Matrix
```javascript
//     A  B  C  D
// A [[0, 1, 1, 0],
// B  [1, 0, 0, 1],
// C  [1, 0, 0, 1],
// D  [0, 1, 1, 0]]
```

## Thuật toán duyệt

### BFS (Breadth-First Search) — O(V + E)
```javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
```

### DFS (Depth-First Search) — O(V + E)
```javascript
function dfs(graph, start) {
  const visited = new Set();
  const order = [];

  function explore(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) explore(neighbor);
    }
  }
  explore(start);
  return order;
}
```

## Shortest Path

### Dijkstra — O((V + E) log V)
Đồ thị có trọng số **không âm**.

### Bellman-Ford — O(V × E)
Xử lý được cạnh **trọng số âm**.

## Topological Sort

Sắp xếp đỉnh sao cho mọi cạnh u → v, u đứng trước v. Chỉ áp dụng cho **DAG**.

```javascript
function topologicalSort(graph, numNodes) {
  const inDegree = new Array(numNodes).fill(0);
  for (const node in graph) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor]++;
    }
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return order.length === numNodes ? order : []; // empty = cycle
}
```

## Bài tập phổ biến

- Number of Islands
- Clone Graph
- Course Schedule
- Pacific Atlantic Water Flow
- Network Delay Time
