/**
 * BÀI 1: Valid Parentheses
 * Link: https://leetcode.com/problems/valid-parentheses/
 *
 * Input:  "({[]})"
 * Output: true
 */
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

console.log("=== Valid Parentheses ===");
console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("(]"));       // false
console.log(isValid("({[]})"));   // true

/**
 * BÀI 2: Min Stack
 * Link: https://leetcode.com/problems/min-stack/
 *
 * Stack hỗ trợ push, pop, top, getMin đều O(1).
 */
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // lưu min tại mỗi bước
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length
      ? Math.min(val, this.minStack[this.minStack.length - 1])
      : val;
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

console.log("\n=== Min Stack ===");
const ms = new MinStack();
ms.push(-2);
ms.push(0);
ms.push(-3);
console.log("Min:", ms.getMin());  // -3
ms.pop();
console.log("Top:", ms.top());    // 0
console.log("Min:", ms.getMin()); // -2

/**
 * BÀI 3: Daily Temperatures
 * Link: https://leetcode.com/problems/daily-temperatures/
 *
 * Cho mảng temperatures, tìm số ngày phải chờ để gặp ngày ấm hơn.
 *
 * Input:  [73, 74, 75, 71, 69, 72, 76, 73]
 * Output: [1,  1,  4,  2,  1,  1,  0,  0]
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // monotonic decreasing stack, lưu index

  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      result[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return result;
}

console.log("\n=== Daily Temperatures ===");
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1, 1, 4, 2, 1, 1, 0, 0]

/**
 * BÀI 4: Implement Queue using Stacks
 * Link: https://leetcode.com/problems/implement-queue-using-stacks/
 */
class MyQueue {
  constructor() {
    this.pushStack = [];
    this.popStack = [];
  }

  push(x) {
    this.pushStack.push(x);
  }

  pop() {
    this._transfer();
    return this.popStack.pop();
  }

  peek() {
    this._transfer();
    return this.popStack[this.popStack.length - 1];
  }

  empty() {
    return this.pushStack.length === 0 && this.popStack.length === 0;
  }

  _transfer() {
    if (this.popStack.length === 0) {
      while (this.pushStack.length) {
        this.popStack.push(this.pushStack.pop());
      }
    }
  }
}

console.log("\n=== Queue using Stacks ===");
const q = new MyQueue();
q.push(1);
q.push(2);
console.log("Peek:", q.peek());  // 1
console.log("Pop:", q.pop());    // 1
console.log("Empty:", q.empty()); // false
