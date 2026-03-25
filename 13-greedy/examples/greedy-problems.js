/**
 * BÀI 1: Jump Game
 * Link: https://leetcode.com/problems/jump-game/
 *
 * Input:  [2,3,1,1,4]
 * Output: true
 */
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}

console.log("=== Jump Game ===");
console.log(canJump([2,3,1,1,4]));  // true
console.log(canJump([3,2,1,0,4]));  // false

/**
 * BÀI 2: Jump Game II (Minimum Jumps)
 * Link: https://leetcode.com/problems/jump-game-ii/
 *
 * Input:  [2,3,1,1,4]
 * Output: 2  (index 0→1→4)
 */
function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}

console.log("\n=== Jump Game II ===");
console.log(jump([2,3,1,1,4]));    // 2
console.log(jump([2,3,0,1,4]));    // 2

/**
 * BÀI 3: Non-overlapping Intervals
 * Link: https://leetcode.com/problems/non-overlapping-intervals/
 *
 * Tìm số intervals tối thiểu cần xóa để không overlap.
 *
 * Input:  [[1,2],[2,3],[3,4],[1,3]]
 * Output: 1  (xóa [1,3])
 */
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      count++;
    }
  }
  return count;
}

console.log("\n=== Non-overlapping Intervals ===");
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));       // 2
console.log(eraseOverlapIntervals([[1,2],[2,3]]));             // 0

/**
 * BÀI 4: Gas Station
 * Link: https://leetcode.com/problems/gas-station/
 *
 * Input:  gas = [1,2,3,4,5], cost = [3,4,5,1,2]
 * Output: 3
 */
function canCompleteCircuit(gas, cost) {
  let totalTank = 0, currentTank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    totalTank += diff;
    currentTank += diff;
    if (currentTank < 0) {
      start = i + 1;
      currentTank = 0;
    }
  }
  return totalTank >= 0 ? start : -1;
}

console.log("\n=== Gas Station ===");
console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])); // 3
console.log(canCompleteCircuit([2,3,4], [3,4,3]));          // -1
