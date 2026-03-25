# 🎯 Interview Guide — Hướng dẫn phỏng vấn DSA

## ⏰ Phân bổ thời gian (45 phút)

| Giai đoạn | Thời gian | Làm gì |
|-----------|-----------|--------|
| **Hiểu đề** | 3-5 phút | Đọc kỹ, hỏi clarify, viết examples |
| **Phân tích** | 5-7 phút | Brute force → tối ưu, chọn approach |
| **Code** | 15-20 phút | Viết code sạch, có comment |
| **Test** | 5-7 phút | Dry run, edge cases |
| **Tối ưu** | 3-5 phút | Cải thiện nếu còn thời gian |

---

## 📋 Checklist trước khi code

### 1. Hiểu đề (QUAN TRỌNG NHẤT)

Hỏi interviewer:
- [ ] Input format? (sorted? unique? negative?)
- [ ] Output format? (return array? index? boolean?)
- [ ] Constraints? (n lớn bao nhiêu?)
- [ ] Edge cases? (empty? one element? duplicates?)

### 2. Viết examples

```
Input:  [2, 7, 11, 15], target = 9
Output: [0, 1]

Edge:   [], target = 5 → []
Edge:   [3], target = 3 → ??? (hỏi interviewer)
```

### 3. Brainstorm approach

```
Brute force: O(n²) — 2 vòng lặp
Better: O(n log n) — sort + binary search
Optimal: O(n) — hash map
```

**Luôn nói brute force trước**, sau đó cải tiến.

---

## 🗣️ Cách communicate

### ✅ Nên:
- "Tôi đang nghĩ dùng hash map vì cần lookup O(1)..."
- "Approach này O(n) time, O(n) space, có ok không?"
- "Edge case: nếu mảng rỗng, return mảng rỗng"
- "Tôi sẽ refactor function này sau khi chạy đúng"

### ❌ Không nên:
- Im lặng code
- "Em không biết"
- Bỏ qua edge cases
- Code xong không test

---

## 🔥 Chiến lược khi bí

| Tình huống | Cách xử lý |
|-----------|-----------|
| Không biết approach | Bắt đầu từ brute force, tìm cách tối ưu |
| Bí logic | Viết pseudocode / vẽ diagram trước |
| Code sai | Dry run từng bước với example nhỏ |
| Hết thời gian | Giải thích approach còn lại bằng lời |

---

## 📊 Approach theo Input Size

| n (constraints) | Target Complexity | Gợi ý approach |
|----------------|-------------------|----------------|
| n ≤ 10 | O(n!) | Backtracking, brute force |
| n ≤ 20 | O(2ⁿ) | Bitmask, backtracking + pruning |
| n ≤ 500 | O(n³) | DP 2D, Floyd-Warshall |
| n ≤ 5000 | O(n²) | DP, 2 nested loops |
| n ≤ 10⁶ | O(n log n) | Sort, binary search, heap |
| n ≤ 10⁸ | O(n) | Two pointers, hash map, greedy |
| n > 10⁸ | O(log n) / O(1) | Math, binary search on answer |

---

## 🏆 Top 20 Must-Know Problems

### Easy (Warm up)
1. Two Sum
2. Valid Parentheses
3. Merge Two Sorted Lists
4. Best Time to Buy and Sell Stock
5. Valid Palindrome

### Medium (Core)
6. 3Sum
7. Longest Substring Without Repeating Characters
8. Container With Most Water
9. Group Anagrams
10. Binary Tree Level Order Traversal
11. Coin Change
12. Course Schedule
13. Number of Islands
14. Search in Rotated Sorted Array
15. Daily Temperatures

### Hard (Differentiator)
16. Trapping Rain Water
17. Merge K Sorted Lists
18. Minimum Window Substring
19. Word Ladder
20. Sliding Window Maximum

---

## 🎒 Trước ngày phỏng vấn

### 1 tuần trước
- [ ] Ôn lại cheatsheet.md
- [ ] Giải 2-3 bài/ngày từ Top 20
- [ ] Luyện nói to khi code

### 1 ngày trước
- [ ] Review lại các pattern chính
- [ ] Đọc lại complexity table
- [ ] Ngủ đủ 7-8 tiếng

### Khi phỏng vấn
- [ ] Bình tĩnh, đọc kỹ đề
- [ ] Hỏi clarify TRƯỚC khi code
- [ ] Nói approach trước khi code
- [ ] Test sau khi code xong
- [ ] Phân tích complexity cuối cùng
