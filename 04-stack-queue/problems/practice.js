/**
 * BÀI TẬP TỰ LUYỆN — Stack & Queue
 */

// ============================================================
// BÀI 1: Evaluate Reverse Polish Notation (Medium)
// Link: https://leetcode.com/problems/evaluate-reverse-polish-notation/
//
// Input:  ["2","1","+","3","*"]
// Output: 9  ((2+1)*3)
// Hint: Stack
// ============================================================
function evalRPN(tokens) {
  // TODO
}

// ============================================================
// BÀI 2: Sliding Window Maximum (Hard)
// Link: https://leetcode.com/problems/sliding-window-maximum/
//
// Cho mảng và window size k, tìm max trong mỗi window.
//
// Input:  nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Hint: Monotonic Deque
// ============================================================
function maxSlidingWindow(nums, k) {
  // TODO
}

// ============================================================
// BÀI 3: Largest Rectangle in Histogram (Hard)
// Link: https://leetcode.com/problems/largest-rectangle-in-histogram/
//
// Input:  [2, 1, 5, 6, 2, 3]
// Output: 10
// Hint: Monotonic Stack
// ============================================================
function largestRectangleArea(heights) {
  // TODO
}

// ============================================================
// BÀI 4: Design Circular Queue (Medium)
// Link: https://leetcode.com/problems/design-circular-queue/
// ============================================================
class MyCircularQueue {
  constructor(k) {
    // TODO
  }
  enQueue(value) { /* TODO */ }
  deQueue() { /* TODO */ }
  Front() { /* TODO */ }
  Rear() { /* TODO */ }
  isEmpty() { /* TODO */ }
  isFull() { /* TODO */ }
}

// TEST
// console.log(evalRPN(["2","1","+","3","*"]));  // 9
// console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
