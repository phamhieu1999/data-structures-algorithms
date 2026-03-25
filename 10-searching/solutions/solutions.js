/**
 * ĐÁP ÁN — Binary Search Practice
 */

// BÀI 1: Time Based Key-Value Store
class TimeMap {
  constructor() { this.store = new Map(); }
  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push({ value, timestamp });
  }
  get(key, timestamp) {
    const arr = this.store.get(key) || [];
    let lo = 0, hi = arr.length - 1, result = '';
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].timestamp <= timestamp) { result = arr[mid].value; lo = mid + 1; }
      else hi = mid - 1;
    }
    return result;
  }
}

// BÀI 2: Median of Two Sorted Arrays
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    const l1 = i > 0 ? nums1[i - 1] : -Infinity;
    const r1 = i < m ? nums1[i] : Infinity;
    const l2 = j > 0 ? nums2[j - 1] : -Infinity;
    const r2 = j < n ? nums2[j] : Infinity;
    if (l1 <= r2 && l2 <= r1) {
      return (m + n) % 2 === 1
        ? Math.max(l1, l2)
        : (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
    }
    if (l1 > r2) hi = i - 1;
    else lo = i + 1;
  }
}

// BÀI 3: Split Array Largest Sum
function splitArray(nums, k) {
  let lo = Math.max(...nums), hi = nums.reduce((a, b) => a + b);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let splits = 1, sum = 0;
    for (const n of nums) {
      if (sum + n > mid) { splits++; sum = 0; }
      sum += n;
    }
    if (splits <= k) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}

// BÀI 4: Find Peak Element
function findPeakElement(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < nums[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

console.log("=== Solutions: Binary Search ===");
const tm = new TimeMap();
tm.set("foo", "bar", 1); tm.set("foo", "bar2", 4);
console.log(tm.get("foo", 4));  // bar2
console.log(tm.get("foo", 3));  // bar
console.log("Median:", findMedianSortedArrays([1, 3], [2]));    // 2
console.log("Split:", splitArray([7,2,5,10,8], 2));              // 18
console.log("Peak:", findPeakElement([1, 2, 3, 1]));             // 2
