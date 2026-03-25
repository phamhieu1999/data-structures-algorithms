/**
 * BÀI 1: Maximum Subarray (Divide & Conquer)
 * Link: https://leetcode.com/problems/maximum-subarray/
 *
 * Input:  [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6  (subarray [4,-1,2,1])
 */
function maxSubArray(nums) {
  return helper(nums, 0, nums.length - 1);
}

function helper(nums, lo, hi) {
  if (lo === hi) return nums[lo];
  const mid = Math.floor((lo + hi) / 2);
  const leftMax = helper(nums, lo, mid);
  const rightMax = helper(nums, mid + 1, hi);
  const crossMax = crossSum(nums, lo, mid, hi);
  return Math.max(leftMax, rightMax, crossMax);
}

function crossSum(nums, lo, mid, hi) {
  let leftSum = -Infinity, sum = 0;
  for (let i = mid; i >= lo; i--) {
    sum += nums[i];
    leftSum = Math.max(leftSum, sum);
  }
  let rightSum = -Infinity;
  sum = 0;
  for (let i = mid + 1; i <= hi; i++) {
    sum += nums[i];
    rightSum = Math.max(rightSum, sum);
  }
  return leftSum + rightSum;
}

console.log("=== Max Subarray (D&C) ===");
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));  // 6

/**
 * BÀI 2: Pow(x, n)
 * Link: https://leetcode.com/problems/powx-n/
 *
 * Input:  x = 2, n = 10
 * Output: 1024
 */
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}

console.log("\n=== Pow(x, n) ===");
console.log(myPow(2, 10));    // 1024
console.log(myPow(2.1, 3));   // 9.261
console.log(myPow(2, -2));    // 0.25

/**
 * BÀI 3: Sort an Array (Merge Sort)
 * Link: https://leetcode.com/problems/sort-an-array/
 */
function sortArray(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));

  const merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  return [...merged, ...left.slice(i), ...right.slice(j)];
}

console.log("\n=== Sort Array (Merge Sort) ===");
console.log(sortArray([5,2,3,1]));      // [1,2,3,5]
console.log(sortArray([5,1,1,2,0,0]));  // [0,0,1,1,2,5]

/**
 * BÀI 4: Count Inversions
 *
 * Đếm số cặp (i,j) mà i < j nhưng arr[i] > arr[j].
 * Dùng merge sort modified.
 *
 * Input:  [2, 4, 1, 3, 5]
 * Output: 3  → (2,1), (4,1), (4,3)
 */
function countInversions(arr) {
  let count = 0;

  function mergeCount(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeCount(arr.slice(0, mid));
    const right = mergeCount(arr.slice(mid));

    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        merged.push(left[i++]);
      } else {
        count += left.length - i; // tất cả phần tử còn lại bên trái > right[j]
        merged.push(right[j++]);
      }
    }
    return [...merged, ...left.slice(i), ...right.slice(j)];
  }

  mergeCount([...arr]);
  return count;
}

console.log("\n=== Count Inversions ===");
console.log(countInversions([2, 4, 1, 3, 5])); // 3
console.log(countInversions([5, 4, 3, 2, 1])); // 10
console.log(countInversions([1, 2, 3, 4, 5])); // 0
