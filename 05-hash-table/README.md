# #️⃣ Hash Table (Bảng băm)

## Khái niệm

Hash Table lưu trữ dữ liệu dạng **key-value** sử dụng hàm băm (hash function) để ánh xạ key → index.

```
key → hash(key) → index → value
```

## Độ phức tạp

| Thao tác | Average | Worst |
|----------|---------|-------|
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Search | O(1) | O(n) |

## Xử lý va chạm (Collision)

### 1. Chaining (Separate Chaining)
Mỗi slot chứa một linked list.

### 2. Open Addressing
- **Linear Probing**: Thử slot tiếp theo
- **Quadratic Probing**: Thử slot i²
- **Double Hashing**: Dùng hàm hash thứ 2

## Code minh họa

```javascript
// Two Sum - O(n) với Hash Map
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Group Anagrams
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

// Frequency Counter Pattern
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}
```

## Hash Set

Chỉ lưu key, không lưu value. Dùng để kiểm tra tồn tại trong O(1).

```javascript
// Contains Duplicate
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}
```

## Bài tập phổ biến

- Two Sum
- Group Anagrams
- Longest Consecutive Sequence
- Valid Anagram
- Top K Frequent Elements
