/**
 * Advanced Patterns - Các kỹ thuật nâng cao thường gặp
 */

// ============================================================
// PATTERN 1: Sliding Window - Variable Size
// ============================================================

/**
 * Minimum Window Substring
 * Link: https://leetcode.com/problems/minimum-window-substring/
 *
 * Tìm substring ngắn nhất chứa tất cả ký tự của t.
 *
 * Input:  s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 */
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  let have = 0, required = need.size;
  let left = 0, minLen = Infinity, minStart = 0;
  const window = new Map();

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;

    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) have--;
      left++;
    }
  }
  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

console.log("=== Minimum Window Substring ===");
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a"));                // "a"
console.log(minWindow("a", "aa"));               // ""

// ============================================================
// PATTERN 2: Merge Intervals
// ============================================================

/**
 * Insert Interval
 * Link: https://leetcode.com/problems/insert-interval/
 *
 * Input:  intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 */
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  while (i < intervals.length) result.push(intervals[i++]);
  return result;
}

console.log("\n=== Insert Interval ===");
console.log(insert([[1,3],[6,9]], [2,5]));           // [[1,5],[6,9]]
console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])); // [[1,2],[3,10],[12,16]]

// ============================================================
// PATTERN 3: Monotonic Stack
// ============================================================

/**
 * Trapping Rain Water
 * Link: https://leetcode.com/problems/trapping-rain-water/
 *
 * Input:  [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 */
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}

console.log("\n=== Trapping Rain Water ===");
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));               // 9

// ============================================================
// PATTERN 4: Fast & Slow Pointers
// ============================================================

/**
 * Find the Duplicate Number
 * Link: https://leetcode.com/problems/find-the-duplicate-number/
 *
 * Mảng n+1 phần tử, giá trị [1..n], có đúng 1 số lặp.
 * Giải O(n) time, O(1) space.
 *
 * Input:  [1,3,4,2,2]
 * Output: 2
 */
function findDuplicate(nums) {
  // Floyd's cycle detection
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Tìm điểm bắt đầu cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}

console.log("\n=== Find Duplicate ===");
console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3

// ============================================================
// PATTERN 5: 3Sum với Two Pointers
// ============================================================

/**
 * 3Sum
 * Link: https://leetcode.com/problems/3sum/
 *
 * Input:  [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum === 0) {
        result.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++;
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--;
        lo++; hi--;
      } else if (sum < 0) lo++;
      else hi--;
    }
  }
  return result;
}

console.log("\n=== 3Sum ===");
console.log(threeSum([-1,0,1,2,-1,-4]));
// [[-1,-1,2],[-1,0,1]]
