/**
 * TypeScript Version — Algorithms
 *
 * Chạy: npx tsx typescript/algorithms.ts
 */
export {};

// ============================================================
// SORTING
// ============================================================
function quickSort(arr: number[]): number[] {
  arr = [...arr];
  _qs(arr, 0, arr.length - 1);
  return arr;
}

function _qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) return;
  const pivot = partition(arr, lo, hi);
  _qs(arr, lo, pivot - 1);
  _qs(arr, pivot + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

// ============================================================
// DYNAMIC PROGRAMMING
// ============================================================
function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }
  return tails.length;
}

// ============================================================
// GRAPH
// ============================================================
type Graph = Map<string, string[]>;

function bfs(graph: Graph, start: string): string[] {
  const visited = new Set<string>([start]);
  const queue: string[] = [start];
  const order: string[] = [];

  while (queue.length) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of (graph.get(node) || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

function dfs(graph: Graph, start: string): string[] {
  const visited = new Set<string>();
  const order: string[] = [];

  function explore(node: string): void {
    visited.add(node);
    order.push(node);
    for (const neighbor of (graph.get(node) || [])) {
      if (!visited.has(neighbor)) explore(neighbor);
    }
  }
  explore(start);
  return order;
}

// ============================================================
// BACKTRACKING
// ============================================================
function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(path: number[], used: boolean[]): void {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(start: number, path: number[]): void {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// ============================================================
// SLIDING WINDOW
// ============================================================
function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right])! >= left) {
      left = seen.get(s[right])! + 1;
    }
    seen.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// ============================================================
// DEMO
// ============================================================
console.log("=== TypeScript Algorithms Demo ===\n");

console.log("Quick Sort:", quickSort([5, 3, 8, 1, 2]));
console.log("Coin Change:", coinChange([1, 5, 10, 25], 30));
console.log("LIS:", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));

const graph: Graph = new Map([
  ['A', ['B', 'C']], ['B', ['A', 'D']],
  ['C', ['A', 'D']], ['D', ['B', 'C']],
]);
console.log("BFS:", bfs(graph, 'A'));
console.log("DFS:", dfs(graph, 'A'));

console.log("Permutations of [1,2,3]:", permute([1, 2, 3]));
console.log("Subsets of [1,2,3]:", subsets([1, 2, 3]));
console.log("Longest Substring:", lengthOfLongestSubstring("abcabcbb"));
