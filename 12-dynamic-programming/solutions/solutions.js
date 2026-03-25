/**
 * ĐÁP ÁN — DP Practice
 */

// BÀI 1: Word Break
function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.substring(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}

// BÀI 2: Longest Palindromic Substring
function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
  }
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return s.substring(start, start + maxLen);
}

// BÀI 3: Partition Equal Subset Sum
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}

// BÀI 4: Decode Ways
function numDecodings(s) {
  if (s[0] === '0') return 0;
  const n = s.length;
  let prev2 = 1, prev1 = 1;
  for (let i = 1; i < n; i++) {
    let curr = 0;
    if (s[i] !== '0') curr += prev1;
    const two = parseInt(s.substring(i - 1, i + 1));
    if (two >= 10 && two <= 26) curr += prev2;
    prev2 = prev1; prev1 = curr;
  }
  return prev1;
}

console.log("=== Solutions: DP ===");
console.log(wordBreak("leetcode", ["leet","code"]));  // true
console.log(longestPalindrome("babad"));              // "bab" or "aba"
console.log(canPartition([1, 5, 11, 5]));             // true
console.log(numDecodings("226"));                     // 3
