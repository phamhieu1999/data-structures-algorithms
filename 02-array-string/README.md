# 📦 Array & String (Mảng & Chuỗi)

## Khái niệm

- **Array**: Cấu trúc dữ liệu lưu trữ các phần tử liên tiếp trong bộ nhớ
- **String**: Mảng các ký tự (immutable trong nhiều ngôn ngữ)

## Đặc điểm

| Thao tác | Time Complexity |
|----------|----------------|
| Access (index) | O(1) |
| Search | O(n) |
| Insert (cuối) | O(1) amortized |
| Insert (giữa) | O(n) |
| Delete (cuối) | O(1) |
| Delete (giữa) | O(n) |

## Kỹ thuật quan trọng

### 1. Two Pointers (Hai con trỏ)
```javascript
// Kiểm tra palindrome
function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

### 2. Sliding Window (Cửa sổ trượt)
```javascript
// Tìm tổng lớn nhất của subarray có k phần tử
function maxSubarraySum(arr, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
```

### 3. Prefix Sum (Tổng tiền tố)
```javascript
// Tính tổng từ index l đến r trong O(1)
function buildPrefixSum(arr) {
  const prefix = [0];
  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
  }
  return prefix;
}

function rangeSum(prefix, l, r) {
  return prefix[r + 1] - prefix[l];
}
```

## Bài tập phổ biến

- Two Sum
- Container With Most Water
- Longest Substring Without Repeating Characters
- Product of Array Except Self
- Merge Intervals
