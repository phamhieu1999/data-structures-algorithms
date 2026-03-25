/**
 * ĐÁP ÁN — Stack & Queue Practice
 */

// BÀI 1: Evaluate Reverse Polish Notation
function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (['+', '-', '*', '/'].includes(t)) {
      const b = stack.pop(), a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack[0];
}

// BÀI 2: Sliding Window Maximum
function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

// BÀI 3: Largest Rectangle in Histogram
function largestRectangleArea(heights) {
  const stack = [-1];
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    while (stack[stack.length - 1] !== -1 && heights[stack[stack.length - 1]] >= heights[i]) {
      const h = heights[stack.pop()];
      const w = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }
  while (stack[stack.length - 1] !== -1) {
    const h = heights[stack.pop()];
    const w = heights.length - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, h * w);
  }
  return maxArea;
}

console.log("=== Solutions: Stack & Queue ===");
console.log(evalRPN(["2","1","+","3","*"]));  // 9
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
