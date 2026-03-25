/**
 * ĐÁP ÁN — Hash Table Practice
 */

// BÀI 1: First Unique Character
function firstUniqChar(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) return i;
  }
  return -1;
}

// BÀI 2: Encode and Decode TinyURL
class TinyURL {
  constructor() {
    this.urlToCode = new Map();
    this.codeToUrl = new Map();
    this.counter = 0;
  }
  encode(longUrl) {
    if (this.urlToCode.has(longUrl)) return this.urlToCode.get(longUrl);
    const code = `http://tiny/${(this.counter++).toString(36)}`;
    this.urlToCode.set(longUrl, code);
    this.codeToUrl.set(code, longUrl);
    return code;
  }
  decode(shortUrl) {
    return this.codeToUrl.get(shortUrl) || '';
  }
}

// BÀI 3: LRU Cache
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}

// BÀI 4: Minimum Window Substring
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let have = 0, required = need.size;
  let left = 0, minLen = Infinity, minStart = 0;
  const win = new Map();
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    win.set(c, (win.get(c) || 0) + 1);
    if (need.has(c) && win.get(c) === need.get(c)) have++;
    while (have === required) {
      if (r - left + 1 < minLen) { minLen = r - left + 1; minStart = left; }
      const lc = s[left];
      win.set(lc, win.get(lc) - 1);
      if (need.has(lc) && win.get(lc) < need.get(lc)) have--;
      left++;
    }
  }
  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}

console.log("=== Solutions: Hash Table ===");
console.log(firstUniqChar("leetcode"));           // 0
console.log(firstUniqChar("aabb"));               // -1
const lru = new LRUCache(2);
lru.put(1, 1); lru.put(2, 2);
console.log("LRU get(1):", lru.get(1));           // 1
lru.put(3, 3);
console.log("LRU get(2):", lru.get(2));           // -1
console.log(minWindow("ADOBECODEBANC", "ABC"));   // BANC
