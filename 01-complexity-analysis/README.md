# 📊 Complexity Analysis (Phân tích độ phức tạp)

## Khái niệm

**Big O Notation** mô tả tốc độ tăng trưởng của thuật toán khi input tăng lên.

## Các loại độ phức tạp thời gian

| Big O | Tên gọi | Ví dụ |
|-------|---------|-------|
| O(1) | Constant | Truy cập mảng theo index |
| O(log n) | Logarithmic | Binary Search |
| O(n) | Linear | Duyệt mảng |
| O(n log n) | Linearithmic | Merge Sort, Quick Sort |
| O(n²) | Quadratic | Bubble Sort, 2 vòng lặp lồng nhau |
| O(2ⁿ) | Exponential | Fibonacci đệ quy |
| O(n!) | Factorial | Permutations |

## Quy tắc tính Big O

1. **Bỏ hằng số**: O(2n) → O(n)
2. **Lấy term lớn nhất**: O(n² + n) → O(n²)
3. **Phép cộng**: Tuần tự → O(A + B)
4. **Phép nhân**: Lồng nhau → O(A × B)

## Space Complexity

- **O(1)**: Dùng số biến cố định
- **O(n)**: Tạo mảng phụ kích thước n
- **O(n²)**: Ma trận 2D n×n

## Code minh họa

```javascript
// O(1) - Constant
function getFirst(arr) {
  return arr[0];
}

// O(n) - Linear
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) - Quadratic
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(log n) - Logarithmic
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```
