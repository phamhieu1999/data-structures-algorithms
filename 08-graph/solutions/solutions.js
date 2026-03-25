/**
 * ĐÁP ÁN — Graph Practice
 */

// BÀI 2: Rotting Oranges (Multi-source BFS)
function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let minutes = 0;
  while (queue.length && fresh > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}

// BÀI 3: Course Schedule II (Topological Sort)
function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const inDeg = new Array(numCourses).fill(0);
  for (const [c, p] of prerequisites) { graph[p].push(c); inDeg[c]++; }
  const queue = [];
  for (let i = 0; i < numCourses; i++) if (inDeg[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const n = queue.shift();
    order.push(n);
    for (const next of graph[n]) { inDeg[next]--; if (inDeg[next] === 0) queue.push(next); }
  }
  return order.length === numCourses ? order : [];
}

// BÀI 5: Word Ladder (BFS)
function ladderLength(beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  while (queue.length) {
    const [word, steps] = queue.shift();
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (next === endWord) return steps + 1;
        if (dict.has(next) && !visited.has(next)) {
          visited.add(next);
          queue.push([next, steps + 1]);
        }
      }
    }
  }
  return 0;
}

console.log("=== Solutions: Graph ===");
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));  // 4
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));    // [0,1,2,3] or similar
console.log(ladderLength("hit","cog",["hot","dot","dog","lot","log","cog"])); // 5
