/**
 * 🧪 Automated Tests — DSA Solutions
 *
 * Chạy: node --test tests/run-tests.js
 * (Node.js 18+)
 */
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// ============================================================
// ARRAY & STRING
// ============================================================
describe('Array & String', () => {
  it('Two Sum', () => {
    function twoSum(nums, target) {
      const map = new Map();
      for (let i = 0; i < nums.length; i++) {
        const c = target - nums[i];
        if (map.has(c)) return [map.get(c), i];
        map.set(nums[i], i);
      }
      return [];
    }
    assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
    assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
    assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
  });

  it('Max Subarray (Kadane)', () => {
    function maxSubArray(nums) {
      let cur = nums[0], max = nums[0];
      for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        max = Math.max(max, cur);
      }
      return max;
    }
    assert.equal(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
    assert.equal(maxSubArray([1]), 1);
    assert.equal(maxSubArray([-1]), -1);
  });

  it('Product Except Self', () => {
    function productExceptSelf(nums) {
      const n = nums.length, result = new Array(n).fill(1);
      let left = 1;
      for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i]; }
      let right = 1;
      for (let i = n - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; }
      return result;
    }
    assert.deepEqual(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
  });
});

// ============================================================
// STACK & QUEUE
// ============================================================
describe('Stack & Queue', () => {
  it('Valid Parentheses', () => {
    function isValid(s) {
      const st = [], map = { ')': '(', ']': '[', '}': '{' };
      for (const c of s) {
        if (!map[c]) st.push(c);
        else if (st.pop() !== map[c]) return false;
      }
      return st.length === 0;
    }
    assert.equal(isValid("()[]{}"), true);
    assert.equal(isValid("(]"), false);
    assert.equal(isValid("({[]})"), true);
    assert.equal(isValid(""), true);
  });

  it('Daily Temperatures', () => {
    function dailyTemps(t) {
      const res = new Array(t.length).fill(0), stack = [];
      for (let i = 0; i < t.length; i++) {
        while (stack.length && t[i] > t[stack[stack.length - 1]]) {
          const j = stack.pop();
          res[j] = i - j;
        }
        stack.push(i);
      }
      return res;
    }
    assert.deepEqual(dailyTemps([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0]);
  });
});

// ============================================================
// HASH TABLE
// ============================================================
describe('Hash Table', () => {
  it('Longest Consecutive Sequence', () => {
    function longestConsecutive(nums) {
      const set = new Set(nums);
      let max = 0;
      for (const n of set) {
        if (!set.has(n - 1)) {
          let cur = n, streak = 1;
          while (set.has(cur + 1)) { cur++; streak++; }
          max = Math.max(max, streak);
        }
      }
      return max;
    }
    assert.equal(longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
    assert.equal(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9);
    assert.equal(longestConsecutive([]), 0);
  });

  it('Valid Anagram', () => {
    function isAnagram(s, t) {
      if (s.length !== t.length) return false;
      const f = {};
      for (const c of s) f[c] = (f[c] || 0) + 1;
      for (const c of t) { if (!f[c]) return false; f[c]--; }
      return true;
    }
    assert.equal(isAnagram("anagram", "nagaram"), true);
    assert.equal(isAnagram("rat", "car"), false);
  });
});

// ============================================================
// BINARY SEARCH
// ============================================================
describe('Binary Search', () => {
  it('Search in Rotated Sorted Array', () => {
    function search(nums, target) {
      let l = 0, r = nums.length - 1;
      while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] === target) return m;
        if (nums[l] <= nums[m]) {
          if (target >= nums[l] && target < nums[m]) r = m - 1;
          else l = m + 1;
        } else {
          if (target > nums[m] && target <= nums[r]) l = m + 1;
          else r = m - 1;
        }
      }
      return -1;
    }
    assert.equal(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
    assert.equal(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
    assert.equal(search([1], 1), 0);
  });

  it('Find Minimum in Rotated', () => {
    function findMin(nums) {
      let l = 0, r = nums.length - 1;
      while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
      }
      return nums[l];
    }
    assert.equal(findMin([3, 4, 5, 1, 2]), 1);
    assert.equal(findMin([4, 5, 6, 7, 0, 1, 2]), 0);
    assert.equal(findMin([11, 13, 15, 17]), 11);
  });
});

// ============================================================
// DYNAMIC PROGRAMMING
// ============================================================
describe('Dynamic Programming', () => {
  it('Coin Change', () => {
    function coinChange(coins, amount) {
      const dp = new Array(amount + 1).fill(Infinity);
      dp[0] = 0;
      for (let i = 1; i <= amount; i++) {
        for (const c of coins) {
          if (c <= i && dp[i - c] !== Infinity) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
      }
      return dp[amount] === Infinity ? -1 : dp[amount];
    }
    assert.equal(coinChange([1, 5, 10, 25], 30), 2);
    assert.equal(coinChange([2], 3), -1);
    assert.equal(coinChange([1], 0), 0);
  });

  it('House Robber', () => {
    function rob(nums) {
      let p2 = 0, p1 = 0;
      for (const n of nums) { const c = Math.max(p1, p2 + n); p2 = p1; p1 = c; }
      return p1;
    }
    assert.equal(rob([1, 2, 3, 1]), 4);
    assert.equal(rob([2, 7, 9, 3, 1]), 12);
  });

  it('Unique Paths', () => {
    function uniquePaths(m, n) {
      const dp = new Array(n).fill(1);
      for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
      return dp[n - 1];
    }
    assert.equal(uniquePaths(3, 7), 28);
    assert.equal(uniquePaths(3, 2), 3);
  });
});

// ============================================================
// GREEDY
// ============================================================
describe('Greedy', () => {
  it('Jump Game', () => {
    function canJump(nums) {
      let max = 0;
      for (let i = 0; i < nums.length; i++) {
        if (i > max) return false;
        max = Math.max(max, i + nums[i]);
      }
      return true;
    }
    assert.equal(canJump([2, 3, 1, 1, 4]), true);
    assert.equal(canJump([3, 2, 1, 0, 4]), false);
  });
});

// ============================================================
// SORTING
// ============================================================
describe('Sorting', () => {
  it('Merge Sort', () => {
    function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      const m = Math.floor(arr.length / 2);
      const l = mergeSort(arr.slice(0, m));
      const r = mergeSort(arr.slice(m));
      const res = [];
      let i = 0, j = 0;
      while (i < l.length && j < r.length) {
        if (l[i] <= r[j]) res.push(l[i++]);
        else res.push(r[j++]);
      }
      return [...res, ...l.slice(i), ...r.slice(j)];
    }
    assert.deepEqual(mergeSort([5, 3, 8, 1, 2]), [1, 2, 3, 5, 8]);
    assert.deepEqual(mergeSort([]), []);
    assert.deepEqual(mergeSort([1]), [1]);
  });
});
