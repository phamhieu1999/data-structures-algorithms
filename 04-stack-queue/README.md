# 📚 Stack & Queue

## Stack (Ngăn xếp) — LIFO

**Last In, First Out**: Phần tử vào sau ra trước.

```
Push → [4] ← Pop
       [3]
       [2]
       [1]
```

| Thao tác | Complexity |
|----------|-----------|
| push | O(1) |
| pop | O(1) |
| peek/top | O(1) |
| isEmpty | O(1) |

### Code minh họa

```javascript
// Valid Parentheses
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (!map[char]) {
      stack.push(char);
    } else if (stack.pop() !== map[char]) {
      return false;
    }
  }
  return stack.length === 0;
}

// Monotonic Stack - Next Greater Element
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // lưu index

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
```

## Queue (Hàng đợi) — FIFO

**First In, First Out**: Phần tử vào trước ra trước.

```
Enqueue → [1][2][3][4] → Dequeue
```

| Thao tác | Complexity |
|----------|-----------|
| enqueue | O(1) |
| dequeue | O(1) |
| front | O(1) |
| isEmpty | O(1) |

### Code minh họa

```javascript
// BFS sử dụng Queue
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}
```

## Deque (Double-ended Queue)

Cho phép thêm/xóa ở cả hai đầu trong O(1).

## Bài tập phổ biến

- Valid Parentheses
- Min Stack
- Daily Temperatures
- Sliding Window Maximum
- Implement Queue using Stacks
