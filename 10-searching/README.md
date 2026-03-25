# 🔍 Searching Algorithms (Thuật toán tìm kiếm)

## Binary Search — O(log n)

**Yêu cầu**: Mảng đã được sắp xếp.

### Template cơ bản
```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### Tìm biên trái (First occurrence)
```javascript
function lowerBound(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}
```

### Tìm biên phải (Last occurrence)
```javascript
function upperBound(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] <= target) left = mid + 1;
    else right = mid;
  }
  return left - 1;
}
```

### Binary Search on Answer
```javascript
// Tìm giá trị nhỏ nhất thỏa mãn điều kiện
function binarySearchOnAnswer(lo, hi, isValid) {
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (isValid(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

## Bài tập phổ biến

- Search in Rotated Sorted Array
- Find Minimum in Rotated Sorted Array
- Search a 2D Matrix
- Koko Eating Bananas
- Median of Two Sorted Arrays
