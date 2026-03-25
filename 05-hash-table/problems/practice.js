/**
 * BÀI TẬP TỰ LUYỆN — Hash Table
 */

// ============================================================
// BÀI 1: First Unique Character (Easy)
// Link: https://leetcode.com/problems/first-unique-character-in-a-string/
//
// Input:  "leetcode"
// Output: 0  (ký tự 'l')
// ============================================================
function firstUniqChar(s) {
  // TODO
}

// ============================================================
// BÀI 2: Encode and Decode TinyURL (Medium)
// Link: https://leetcode.com/problems/encode-and-decode-tinyurl/
// ============================================================
class TinyURL {
  constructor() {
    // TODO
  }
  encode(longUrl) { /* TODO */ }
  decode(shortUrl) { /* TODO */ }
}

// ============================================================
// BÀI 3: LRU Cache (Medium)
// Link: https://leetcode.com/problems/lru-cache/
//
// get(key): O(1)
// put(key, value): O(1), evict LRU khi full
// Hint: Hash Map + Doubly Linked List
// ============================================================
class LRUCache {
  constructor(capacity) {
    // TODO
  }
  get(key) { /* TODO */ }
  put(key, value) { /* TODO */ }
}

// ============================================================
// BÀI 4: Minimum Window Substring (Hard)
// Link: https://leetcode.com/problems/minimum-window-substring/
//
// Input:  s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Hint: Sliding Window + Hash Map
// ============================================================
function minWindow(s, t) {
  // TODO
}

// TEST
// console.log(firstUniqChar("leetcode"));  // 0
// console.log(minWindow("ADOBECODEBANC", "ABC"));  // "BANC"
