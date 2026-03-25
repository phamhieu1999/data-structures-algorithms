# 📚 Cấu Trúc Dữ Liệu & Giải Thuật

> Tổng hợp kiến thức DSA từ cơ bản đến nâng cao, có lý thuyết + code minh họa + bài tập + đáp án.

## 📂 Cấu trúc thư mục

```
data-structures-algorithms/
│
├── 📖 cheatsheet.md              ← Pattern recognition guide
├── 🎯 interview-guide.md         ← Hướng dẫn phỏng vấn DSA
├── ⚠️  common-mistakes.md         ← 12 lỗi thường gặp
├── 📚 resources.md               ← Roadmaps, sách, YouTube, lịch ôn
│
├── 01-complexity-analysis/        # Big O, Time & Space Complexity
├── 02-array-string/               # Mảng, Chuỗi, Two Pointers, Sliding Window
├── 03-linked-list/                # Singly, Doubly, Circular, Floyd's Cycle
├── 04-stack-queue/                # Stack, Queue, Deque, Monotonic Stack/Queue
├── 05-hash-table/                 # Hash Map, Hash Set, Collision, LRU Cache
├── 06-tree/                       # Binary Tree, BST, AVL, Traversal
├── 07-heap/                       # Min/Max Heap, Priority Queue, Median Finder
├── 08-graph/                      # BFS, DFS, Dijkstra, Bellman-Ford, Topo Sort
├── 09-sorting/                    # Bubble, Selection, Insertion, Merge, Quick, Heap, Radix
├── 10-searching/                  # Binary Search, Search on Answer
├── 11-recursion-backtracking/     # Permutations, Combinations, N-Queens, Sudoku
├── 12-dynamic-programming/        # Memoization, Tabulation, Knapsack, LCS, LIS
├── 13-greedy/                     # Activity Selection, Jump Game, Intervals
├── 14-divide-and-conquer/         # Max Subarray, Pow(x,n), Count Inversions
├── 15-trie/                       # Prefix Tree, Autocomplete, Word Search II
├── 16-union-find/                 # Disjoint Set, Path Compression, Union by Rank
├── 17-segment-tree/               # Segment Tree, Fenwick Tree (BIT)
├── 18-advanced-patterns/          # Sliding Window, Intervals, Monotonic Stack, 3Sum
├── 19-design-patterns/            # LRU Cache, Event Emitter, RandomizedSet, Twitter
├── 20-system-design-basics/       # Consistent Hashing, Rate Limiting, Load Balancing
├── 21-bit-manipulation/           # XOR tricks, Bitmask, Single Number, Subsets
├── 22-math/                       # GCD, Sieve, Fast Power, Pascal, Trailing Zeroes
│
├── tests/                         # Automated tests (node --test)
│   └── run-tests.js               ← 14 tests, 7 suites
│
└── typescript/                    # TypeScript versions
    ├── data-structures.ts         ← Stack, Queue, Heap, Trie, UnionFind (generics)
    └── algorithms.ts              ← Sorting, DP, Graph, Backtracking (typed)
```

### Mỗi folder chứa:

```
XX-topic/
├── README.md        ← Lý thuyết, bảng complexity, hình minh họa
├── examples/        ← Code minh họa đầy đủ (chạy được)
├── problems/        ← Bài tập tự luyện (TODO stubs + hints)
└── solutions/       ← Đáp án bài tập (tự check sau khi làm)
```

## 🗺️ Lộ trình học

| Giai đoạn | Chủ đề | Mức độ | Thời gian |
|-----------|--------|--------|-----------|
| **Nền tảng** | 01 → 05 | ⭐ Cơ bản | Tuần 1-2 |
| **Trung cấp** | 06 → 10 | ⭐⭐ Trung bình | Tuần 3-4 |
| **Nâng cao** | 11 → 15 | ⭐⭐⭐ Nâng cao | Tuần 5-6 |
| **Chuyên sâu** | 16 → 22 | ⭐⭐⭐⭐ Chuyên gia | Tuần 7-8 |

## 🚀 Quick Start

```bash
# Chạy ví dụ
node 02-array-string/examples/array-string-problems.js

# Chạy tests
node --test tests/run-tests.js

# Chạy TypeScript
npx tsx typescript/data-structures.ts

# Tự luyện: mở file practice, code phần TODO, rồi check solutions
code 12-dynamic-programming/problems/practice.js
code 12-dynamic-programming/solutions/solutions.js
```

## 📊 Thống kê

| Metric | Số lượng |
|--------|---------|
| Chủ đề | 22 |
| Bài examples | ~90+ |
| Bài practice | ~60+ |
| Bài solutions | ~60+ |
| Test cases | 14 (automated) |
| Guide files | 4 |
