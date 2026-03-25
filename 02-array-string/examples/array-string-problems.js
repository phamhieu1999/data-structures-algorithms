/**
 * BÀI 1: Two Sum
 * Link: https://leetcode.com/problems/two-sum/
 *
 * Cho mảng nums và target, tìm 2 phần tử có tổng = target.
 * Trả về index của 2 phần tử đó.
 *
 * Input:  nums = [2, 7, 11, 15], target = 9
 * Output: [0, 1]  (vì nums[0] + nums[1] = 2 + 7 = 9)
 */

// ❌ Cách 1: Brute Force - O(n²)
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}

// ✅ Cách 2: Hash Map - O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test
console.log("=== Two Sum ===");
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));          // [0, 1]

/**
 * BÀI 2: Container With Most Water
 * Link: https://leetcode.com/problems/container-with-most-water/
 *
 * Cho mảng height, tìm 2 đường thẳng tạo container chứa nhiều nước nhất.
 *
 * Input:  [1, 8, 6, 2, 5, 4, 8, 3, 7]
 * Output: 49
 */
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    max = Math.max(max, width * h);

    // Di chuyển con trỏ có chiều cao nhỏ hơn
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}

console.log("\n=== Container With Most Water ===");
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));  // 49

/**
 * BÀI 3: Longest Substring Without Repeating Characters
 * Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * Input:  "abcabcbb"
 * Output: 3  (substring "abc")
 */
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right]) && seen.get(s[right]) >= left) {
      left = seen.get(s[right]) + 1;
    }
    seen.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

console.log("\n=== Longest Substring Without Repeating ===");
console.log(lengthOfLongestSubstring("abcabcbb"));  // 3
console.log(lengthOfLongestSubstring("bbbbb"));     // 1
console.log(lengthOfLongestSubstring("pwwkew"));    // 3

/**
 * BÀI 4: Product of Array Except Self
 * Link: https://leetcode.com/problems/product-of-array-except-self/
 *
 * Trả mảng output[i] = tích tất cả phần tử trừ nums[i].
 * KHÔNG được dùng phép chia.
 *
 * Input:  [1, 2, 3, 4]
 * Output: [24, 12, 8, 6]
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left pass: result[i] = tích từ 0 → i-1
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right pass: nhân thêm tích từ n-1 → i+1
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

console.log("\n=== Product of Array Except Self ===");
console.log(productExceptSelf([1, 2, 3, 4]));  // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));  // [0, 0, 9, 0, 0]

/**
 * BÀI 5: Maximum Subarray (Kadane's Algorithm)
 * Link: https://leetcode.com/problems/maximum-subarray/
 *
 * Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 * Output: 6  (subarray [4, -1, 2, 1])
 */
function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

console.log("\n=== Maximum Subarray ===");
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));  // 6
console.log(maxSubArray([1]));       // 1
console.log(maxSubArray([5, 4, -1, 7, 8]));  // 23
