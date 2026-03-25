# 🔁 Recursion & Backtracking

## Recursion (Đệ quy)

Hàm gọi chính nó với bài toán con nhỏ hơn cho đến khi đạt **base case**.

```javascript
// Fibonacci - O(2^n) → tối ưu bằng DP
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

## Backtracking (Quay lui)

**Template**:
```
function backtrack(state, choices):
    if isGoal(state):
        addResult(state)
        return
    for choice in choices:
        if isValid(choice):
            makeChoice(choice)
            backtrack(newState, remainingChoices)
            undoChoice(choice)   ← BACKTRACK
```

### Permutations (Hoán vị)
```javascript
function permute(nums) {
  const result = [];

  function backtrack(path, used) {
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
```

### Combinations (Tổ hợp)
```javascript
function combine(n, k) {
  const result = [];

  function backtrack(start, path) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(1, []);
  return result;
}
```

### Subsets (Tập con)
```javascript
function subsets(nums) {
  const result = [];

  function backtrack(start, path) {
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
```

## Bài tập phổ biến

- Permutations
- Subsets
- Combination Sum
- N-Queens
- Word Search
- Sudoku Solver
