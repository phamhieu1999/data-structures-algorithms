/**
 * Design Pattern Examples
 */

// ============================================================
// 1. LRU Cache - Hash Map + Doubly Linked List
// Link: https://leetcode.com/problems/lru-cache/
// ============================================================

class DLLNode {
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    // Dummy head & tail
    this.head = new DLLNode();
    this.tail = new DLLNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.val = value;
      this._moveToHead(node);
    } else {
      const node = new DLLNode(key, value);
      this.map.set(key, node);
      this._addToHead(node);

      if (this.map.size > this.capacity) {
        const removed = this._removeTail();
        this.map.delete(removed.key);
      }
    }
  }

  _addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  _removeTail() {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
  }
}

console.log("=== LRU Cache ===");
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1));   // 1
lru.put(3, 3);              // evicts key 2
console.log(lru.get(2));   // -1
lru.put(4, 4);              // evicts key 1
console.log(lru.get(1));   // -1
console.log(lru.get(3));   // 3
console.log(lru.get(4));   // 4

// ============================================================
// 2. Event Emitter (Observer Pattern)
// ============================================================

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(callback);
    return this;
  }

  off(event, callback) {
    if (!this.events.has(event)) return this;
    const cbs = this.events.get(event).filter(cb => cb !== callback);
    this.events.set(event, cbs);
    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    this.events.get(event).forEach(cb => cb(...args));
    return true;
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
}

console.log("\n=== Event Emitter ===");
const emitter = new EventEmitter();
emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
emitter.once('greet', (name) => console.log(`Welcome, ${name}! (once)`));
emitter.emit('greet', 'Alice');
// Hello, Alice!
// Welcome, Alice! (once)
emitter.emit('greet', 'Bob');
// Hello, Bob!  (once handler đã bị gỡ)

// ============================================================
// 3. Insert Delete GetRandom O(1)
// Link: https://leetcode.com/problems/insert-delete-getrandom-o1/
// ============================================================

class RandomizedSet {
  constructor() {
    this.map = new Map(); // val → index
    this.list = [];
  }

  insert(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }

  remove(val) {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val);
    const last = this.list[this.list.length - 1];
    // Swap với phần tử cuối
    this.list[idx] = last;
    this.map.set(last, idx);
    this.list.pop();
    this.map.delete(val);
    return true;
  }

  getRandom() {
    const idx = Math.floor(Math.random() * this.list.length);
    return this.list[idx];
  }
}

console.log("\n=== RandomizedSet ===");
const rs = new RandomizedSet();
console.log(rs.insert(1));  // true
console.log(rs.remove(2));  // false
console.log(rs.insert(2));  // true
console.log(rs.getRandom()); // 1 or 2
console.log(rs.remove(1));  // true
console.log(rs.getRandom()); // 2

// ============================================================
// 4. Design Twitter (Mini)
// Link: https://leetcode.com/problems/design-twitter/
// ============================================================

class Twitter {
  constructor() {
    this.tweets = [];     // [{userId, tweetId, time}]
    this.following = new Map(); // userId → Set<userId>
    this.time = 0;
  }

  postTweet(userId, tweetId) {
    this.tweets.push({ userId, tweetId, time: this.time++ });
  }

  getNewsFeed(userId) {
    const followees = this.following.get(userId) || new Set();
    const relevant = this.tweets.filter(
      t => t.userId === userId || followees.has(t.userId)
    );
    return relevant
      .sort((a, b) => b.time - a.time)
      .slice(0, 10)
      .map(t => t.tweetId);
  }

  follow(followerId, followeeId) {
    if (!this.following.has(followerId)) {
      this.following.set(followerId, new Set());
    }
    this.following.get(followerId).add(followeeId);
  }

  unfollow(followerId, followeeId) {
    this.following.get(followerId)?.delete(followeeId);
  }
}

console.log("\n=== Twitter ===");
const tw = new Twitter();
tw.postTweet(1, 5);
console.log(tw.getNewsFeed(1));  // [5]
tw.follow(1, 2);
tw.postTweet(2, 6);
console.log(tw.getNewsFeed(1));  // [6, 5]
tw.unfollow(1, 2);
console.log(tw.getNewsFeed(1));  // [5]
