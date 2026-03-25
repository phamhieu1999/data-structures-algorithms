/**
 * BÀI 1: Group Anagrams
 * Link: https://leetcode.com/problems/group-anagrams/
 *
 * Input:  ["eat","tea","tan","ate","nat","bat"]
 * Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 */
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

console.log("=== Group Anagrams ===");
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));

/**
 * BÀI 2: Longest Consecutive Sequence
 * Link: https://leetcode.com/problems/longest-consecutive-sequence/
 *
 * Tìm dãy số liên tiếp dài nhất. Yêu cầu O(n).
 *
 * Input:  [100, 4, 200, 1, 3, 2]
 * Output: 4  (dãy [1, 2, 3, 4])
 */
function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;

  for (const num of set) {
    // Chỉ bắt đầu đếm từ số đầu tiên của dãy
    if (!set.has(num - 1)) {
      let current = num;
      let streak = 1;

      while (set.has(current + 1)) {
        current++;
        streak++;
      }
      maxLen = Math.max(maxLen, streak);
    }
  }
  return maxLen;
}

console.log("\n=== Longest Consecutive Sequence ===");
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));  // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));  // 9

/**
 * BÀI 3: Valid Anagram
 * Link: https://leetcode.com/problems/valid-anagram/
 *
 * Input:  s = "anagram", t = "nagaram"
 * Output: true
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  for (const c of t) {
    if (!freq[c]) return false;
    freq[c]--;
  }
  return true;
}

console.log("\n=== Valid Anagram ===");
console.log(isAnagram("anagram", "nagaram"));  // true
console.log(isAnagram("rat", "car"));          // false

/**
 * BÀI 4: Subarray Sum Equals K
 * Link: https://leetcode.com/problems/subarray-sum-equals-k/
 *
 * Đếm số subarray có tổng = k. (Prefix Sum + Hash Map)
 *
 * Input:  nums = [1, 1, 1], k = 2
 * Output: 2
 */
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  let sum = 0, count = 0;

  for (const num of nums) {
    sum += num;
    if (prefixCount.has(sum - k)) {
      count += prefixCount.get(sum - k);
    }
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}

console.log("\n=== Subarray Sum Equals K ===");
console.log(subarraySum([1, 1, 1], 2));      // 2
console.log(subarraySum([1, 2, 3], 3));      // 2
console.log(subarraySum([1, -1, 0], 0));     // 3
