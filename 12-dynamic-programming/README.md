# 💡 Dynamic Programming (Quy hoạch động)

## Khái niệm

DP giải bài toán bằng cách chia thành **bài toán con trùng lặp** và lưu kết quả để tránh tính lại.

### Hai cách tiếp cận

| | Top-Down (Memoization) | Bottom-Up (Tabulation) |
|--|----------------------|----------------------|
| Hướng | Đệ quy + cache | Vòng lặp |
| Ưu điểm | Dễ viết | Tối ưu bộ nhớ |
| Nhược | Stack overflow | Phải tính hết |

## Các dạng DP phổ biến

### 1. Fibonacci
```javascript
// Top-Down
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return (memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
}

// Bottom-Up (tối ưu space O(1))
function fibTab(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
```

### 2. Climbing Stairs
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
```

### 3. 0/1 Knapsack
```javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}
```

### 4. Longest Common Subsequence
```javascript
function lcs(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}
```

## Framework giải DP

1. **Xác định state**: dp[i] biểu diễn gì?
2. **Công thức chuyển trạng thái**: dp[i] = f(dp[i-1], ...)
3. **Base case**: dp[0] = ?
4. **Thứ tự tính**: Từ nhỏ → lớn hay ngược lại?
5. **Tối ưu space**: Có thể dùng biến thay mảng?

## Bài tập phổ biến

- Climbing Stairs
- Coin Change
- Longest Increasing Subsequence
- House Robber
- Edit Distance
- Unique Paths
