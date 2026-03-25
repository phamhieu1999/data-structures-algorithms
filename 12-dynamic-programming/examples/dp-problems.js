/**
 * BÀI 1: Coin Change
 * Link: https://leetcode.com/problems/coin-change/
 *
 * Tìm số đồng xu ít nhất để tạo amount.
 *
 * Input:  coins = [1,5,10,25], amount = 30
 * Output: 2  (25 + 5)
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log("=== Coin Change ===");
console.log(coinChange([1, 5, 10, 25], 30));  // 2
console.log(coinChange([1, 5, 10], 11));      // 2 (10+1)
console.log(coinChange([2], 3));              // -1

/**
 * BÀI 2: Longest Increasing Subsequence
 * Link: https://leetcode.com/problems/longest-increasing-subsequence/
 *
 * Input:  [10, 9, 2, 5, 3, 7, 101, 18]
 * Output: 4  → [2, 3, 7, 101]
 */

// Cách 1: DP - O(n²)
function lengthOfLIS_DP(nums) {
  const dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

// Cách 2: Binary Search - O(n log n)
function lengthOfLIS(nums) {
  const tails = [];  // mảng tăng dần
  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }
  return tails.length;
}

console.log("\n=== Longest Increasing Subsequence ===");
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));            // 4
console.log(lengthOfLIS([7, 7, 7, 7, 7]));               // 1

/**
 * BÀI 3: House Robber
 * Link: https://leetcode.com/problems/house-robber/
 *
 * Không được cướp 2 nhà liền kề. Tối đa hóa tiền.
 *
 * Input:  [2, 7, 9, 3, 1]
 * Output: 12  (2 + 9 + 1)
 */
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

console.log("\n=== House Robber ===");
console.log(rob([1, 2, 3, 1]));     // 4
console.log(rob([2, 7, 9, 3, 1]));  // 12
console.log(rob([2, 1, 1, 2]));     // 4

/**
 * BÀI 4: Edit Distance
 * Link: https://leetcode.com/problems/edit-distance/
 *
 * Tìm số thao tác tối thiểu (insert, delete, replace) để biến word1 → word2.
 *
 * Input:  word1 = "horse", word2 = "ros"
 * Output: 3
 */
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }
  return dp[m][n];
}

console.log("\n=== Edit Distance ===");
console.log(minDistance("horse", "ros"));       // 3
console.log(minDistance("intention", "execution")); // 5

/**
 * BÀI 5: Unique Paths
 * Link: https://leetcode.com/problems/unique-paths/
 *
 * Robot ở góc trái-trên, đi đến góc phải-dưới (chỉ xuống/phải).
 *
 * Input:  m = 3, n = 7
 * Output: 28
 */
function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}

console.log("\n=== Unique Paths ===");
console.log(uniquePaths(3, 7));  // 28
console.log(uniquePaths(3, 2));  // 3
