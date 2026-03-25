# ✂️ Divide and Conquer (Chia để trị)

## Khái niệm

Chia bài toán thành các **bài toán con nhỏ hơn**, giải từng bài con, rồi **kết hợp** kết quả.

```
Bài toán lớn
    ├── Bài toán con 1 → Giải → Kết quả 1
    ├── Bài toán con 2 → Giải → Kết quả 2 ──→ Kết hợp → Kết quả cuối
    └── Bài toán con 3 → Giải → Kết quả 3
```

## So sánh với DP

| | Divide & Conquer | Dynamic Programming |
|--|-----------------|-------------------|
| Bài toán con | Độc lập | Trùng lặp |
| Lưu kết quả | Không | Có (memoization) |
| Ví dụ | Merge Sort | Fibonacci |

## Code minh họa

### Maximum Subarray (Kadane vs D&C)
```javascript
// D&C approach - O(n log n)
function maxSubarrayDC(nums, lo = 0, hi = nums.length - 1) {
  if (lo === hi) return nums[lo];

  const mid = Math.floor((lo + hi) / 2);
  const leftMax = maxSubarrayDC(nums, lo, mid);
  const rightMax = maxSubarrayDC(nums, mid + 1, hi);
  const crossMax = maxCrossing(nums, lo, mid, hi);

  return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossing(nums, lo, mid, hi) {
  let leftSum = -Infinity, sum = 0;
  for (let i = mid; i >= lo; i--) {
    sum += nums[i];
    leftSum = Math.max(leftSum, sum);
  }
  let rightSum = -Infinity;
  sum = 0;
  for (let i = mid + 1; i <= hi; i++) {
    sum += nums[i];
    rightSum = Math.max(rightSum, sum);
  }
  return leftSum + rightSum;
}
```

### Pow(x, n) — O(log n)
```javascript
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);

  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
```

## Bài tập phổ biến

- Merge Sort / Quick Sort
- Maximum Subarray
- Pow(x, n)
- Closest Pair of Points
- Count Inversions
