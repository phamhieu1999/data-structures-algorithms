/**
 * BÀI 1: Search in Rotated Sorted Array
 * Link: https://leetcode.com/problems/search-in-rotated-sorted-array/
 *
 * Mảng sorted bị xoay tại 1 điểm. Tìm target trong O(log n).
 *
 * Input:  nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 */
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // Nửa trái sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Nửa phải sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

console.log("=== Search in Rotated Sorted Array ===");
console.log(searchRotated([4,5,6,7,0,1,2], 0));  // 4
console.log(searchRotated([4,5,6,7,0,1,2], 3));  // -1
console.log(searchRotated([1], 0));               // -1

/**
 * BÀI 2: Find Minimum in Rotated Sorted Array
 * Link: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 *
 * Input:  [3,4,5,1,2]
 * Output: 1
 */
function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}

console.log("\n=== Find Min in Rotated Array ===");
console.log(findMin([3,4,5,1,2]));    // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0
console.log(findMin([11,13,15,17]));   // 11

/**
 * BÀI 3: Koko Eating Bananas
 * Link: https://leetcode.com/problems/koko-eating-bananas/
 *
 * Binary Search on Answer: tìm tốc độ ăn nhỏ nhất để ăn hết trong h giờ.
 *
 * Input:  piles = [3,6,7,11], h = 8
 * Output: 4
 */
function minEatingSpeed(piles, h) {
  let lo = 1;
  let hi = Math.max(...piles);

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);

    if (hours <= h) hi = mid;   // có thể ăn chậm hơn
    else lo = mid + 1;          // phải ăn nhanh hơn
  }
  return lo;
}

console.log("\n=== Koko Eating Bananas ===");
console.log(minEatingSpeed([3,6,7,11], 8));     // 4
console.log(minEatingSpeed([30,11,23,4,20], 5)); // 30
console.log(minEatingSpeed([30,11,23,4,20], 6)); // 23

/**
 * BÀI 4: Search a 2D Matrix
 * Link: https://leetcode.com/problems/search-a-2d-matrix/
 *
 * Ma trận m×n, mỗi hàng sorted, hàng sau > hàng trước.
 * Tìm target trong O(log(m*n)).
 */
function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}

console.log("\n=== Search a 2D Matrix ===");
const matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]];
console.log(searchMatrix(matrix, 3));   // true
console.log(searchMatrix(matrix, 13));  // false
