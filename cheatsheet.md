# 📋 DSA Cheatsheet — Pattern Recognition Guide

> Nhìn đề bài → nhận dạng pattern → áp dụng template.

## 🎯 Quick Pattern Matching

| Dấu hiệu trong đề | Pattern | Ví dụ |
|---------------------|---------|-------|
| "Tìm 2/3 phần tử có tổng = X" | **Two Pointers** (sorted) / **Hash Map** | Two Sum, 3Sum |
| "Substring/subarray tối ưu" | **Sliding Window** | Min Window Substring, Longest Substring |
| "Tất cả tổ hợp / hoán vị" | **Backtracking** | Permutations, Subsets, N-Queens |
| "Min/max cost, số cách" | **Dynamic Programming** | Coin Change, Unique Paths |
| "K lớn/nhỏ nhất" | **Heap** | Kth Largest, Top K Frequent |
| "Shortest path" | **BFS** (unweighted) / **Dijkstra** (weighted) | Network Delay, Shortest Path |
| "Connected components, cycle" | **Union-Find** / **DFS** | Number of Islands, Redundant Connection |
| "Sorted array → tìm target" | **Binary Search** | Search Rotated Array |
| "Tree traversal" | **DFS** (recursive) / **BFS** (level order) | Max Depth, Level Order |
| "Prefix match, autocomplete" | **Trie** | Implement Trie, Word Search II |
| "Next greater/smaller" | **Monotonic Stack** | Daily Temperatures, Next Greater Element |
| "Range query + update" | **Segment Tree / BIT** | Range Sum Query Mutable |
| "Schedule, overlap" | **Greedy** (sort by end time) | Merge Intervals, Meeting Rooms |
| "Palindrome" | **Two Pointers** (expand from center) | Longest Palindromic Substring |
| "Dependency / ordering" | **Topological Sort** | Course Schedule |
| "Matrix traversal" | **BFS/DFS** + visited | Number of Islands, Rotting Oranges |

---

## 🧩 Pattern Templates

### 1. Two Pointers
```
Khi nào: Mảng sorted, tìm cặp thỏa điều kiện
Template:
  left = 0, right = n-1
  while left < right:
    if condition_met → return
    if need_bigger → left++
    if need_smaller → right--
```

### 2. Sliding Window
```
Khi nào: Substring/subarray con tối ưu
Template (variable size):
  left = 0
  for right in range(n):
    expand window (add arr[right])
    while window invalid:
      shrink (remove arr[left], left++)
    update answer
```

### 3. Binary Search
```
Khi nào: Sorted data, hoặc tìm min/max thỏa điều kiện
Template:
  lo, hi = search_range
  while lo < hi:
    mid = (lo + hi) / 2
    if condition(mid) → hi = mid
    else → lo = mid + 1
  return lo
```

### 4. BFS (Level Order)
```
Khi nào: Shortest path (unweighted), level-by-level
Template:
  queue = [start], visited = {start}
  while queue:
    node = queue.shift()
    for neighbor of node:
      if not visited → add to queue
```

### 5. DFS / Backtracking
```
Khi nào: Explore all paths, tổ hợp, hoán vị
Template:
  function backtrack(state):
    if goal → add result
    for choice in choices:
      if valid(choice):
        make(choice)
        backtrack(next_state)
        undo(choice)
```

### 6. Dynamic Programming
```
Khi nào: Overlapping subproblems, optimal substructure
Framework:
  1. State: dp[i] = gì?
  2. Transition: dp[i] = f(dp[i-1], ...)
  3. Base case: dp[0] = ?
  4. Order: left→right? bottom→up?
  5. Optimize space?
```

### 7. Monotonic Stack
```
Khi nào: Next/previous greater/smaller element
Template:
  stack = []
  for i in range(n):
    while stack and arr[i] > arr[stack.top]:
      result[stack.pop()] = arr[i]
    stack.push(i)
```

---

## ⏱️ Complexity Quick Reference

### Data Structures
| Structure | Access | Search | Insert | Delete |
|-----------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Hash Table | — | O(1) | O(1) | O(1) |
| BST (balanced) | — | O(log n) | O(log n) | O(log n) |
| Heap | — | O(n) | O(log n) | O(log n) |
| Trie | — | O(m) | O(m) | O(m) |

### Sorting
| Algorithm | Best | Avg | Worst | Space | Stable |
|-----------|------|-----|-------|-------|--------|
| Quick Sort | n log n | n log n | n² | log n | ❌ |
| Merge Sort | n log n | n log n | n log n | n | ✅ |
| Heap Sort | n log n | n log n | n log n | 1 | ❌ |
| Counting | n+k | n+k | n+k | k | ✅ |

### Graph
| Algorithm | Time | Space | Use case |
|-----------|------|-------|----------|
| BFS | O(V+E) | O(V) | Shortest (unweighted) |
| DFS | O(V+E) | O(V) | Connected, cycle |
| Dijkstra | O((V+E)logV) | O(V) | Shortest (weighted+) |
| Bellman-Ford | O(VE) | O(V) | Negative weights |
| Topo Sort | O(V+E) | O(V) | DAG ordering |
| Union-Find | O(α(n)) | O(n) | Connected components |

---

## 💡 Tips Interview

1. **Luôn hỏi**: Input size? Sorted? Duplicates? Negative numbers?
2. **Brute force trước** → tối ưu sau
3. **Nói ra suy nghĩ** khi code
4. **Test bằng tay** với small input
5. **Edge cases**: empty, 1 element, duplicates, overflow
