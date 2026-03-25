/**
 * ĐÁP ÁN — Sorting Practice
 */

// BÀI 1: Sort Colors (Dutch National Flag)
function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo], nums[mid]] = [nums[mid], nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) { mid++; }
    else { [nums[mid], nums[hi]] = [nums[hi], nums[mid]]; hi--; }
  }
  return nums;
}

// BÀI 2: Merge Intervals
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);
    else merged.push(intervals[i]);
  }
  return merged;
}

// BÀI 3: Kth Largest (Quick Select)
function findKthLargest(nums, k) {
  k = nums.length - k;
  function quickSelect(lo, hi) {
    const pivot = nums[hi];
    let p = lo;
    for (let i = lo; i < hi; i++) {
      if (nums[i] <= pivot) { [nums[p], nums[i]] = [nums[i], nums[p]]; p++; }
    }
    [nums[p], nums[hi]] = [nums[hi], nums[p]];
    if (p === k) return nums[p];
    return p < k ? quickSelect(p + 1, hi) : quickSelect(lo, p - 1);
  }
  return quickSelect(0, nums.length - 1);
}

console.log("=== Solutions: Sorting ===");
console.log(sortColors([2, 0, 2, 1, 1, 0]));                    // [0,0,1,1,2,2]
console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));       // [[1,6],[8,10],[15,18]]
console.log(findKthLargest([3,2,1,5,6,4], 2));                  // 5
