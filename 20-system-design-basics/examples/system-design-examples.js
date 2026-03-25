/**
 * System Design Basics — Code Examples
 */

// ============================================================
// 1. Consistent Hashing (Simplified)
// ============================================================

class ConsistentHash {
  constructor(replicas = 3) {
    this.replicas = replicas;
    this.ring = new Map();  // hash → server
    this.sortedKeys = [];
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
  }

  addServer(server) {
    for (let i = 0; i < this.replicas; i++) {
      const hash = this._hash(`${server}:${i}`);
      this.ring.set(hash, server);
      this.sortedKeys.push(hash);
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  removeServer(server) {
    for (let i = 0; i < this.replicas; i++) {
      const hash = this._hash(`${server}:${i}`);
      this.ring.delete(hash);
      this.sortedKeys = this.sortedKeys.filter(k => k !== hash);
    }
  }

  getServer(key) {
    if (this.sortedKeys.length === 0) return null;
    const hash = this._hash(key);
    for (const ringKey of this.sortedKeys) {
      if (hash <= ringKey) return this.ring.get(ringKey);
    }
    return this.ring.get(this.sortedKeys[0]); // wrap around
  }
}

console.log("=== Consistent Hashing ===");
const ch = new ConsistentHash(3);
ch.addServer("server-A");
ch.addServer("server-B");
ch.addServer("server-C");
console.log("user:1 →", ch.getServer("user:1"));
console.log("user:2 →", ch.getServer("user:2"));
console.log("user:3 →", ch.getServer("user:3"));
ch.removeServer("server-B");
console.log("\nAfter removing server-B:");
console.log("user:1 →", ch.getServer("user:1"));
console.log("user:2 →", ch.getServer("user:2"));

// ============================================================
// 2. Token Bucket Rate Limiter
// ============================================================

class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens per second
    this.lastRefill = Date.now();
  }

  _refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }

  tryConsume(tokens = 1) {
    this._refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }
}

console.log("\n=== Token Bucket Rate Limiter ===");
const limiter = new TokenBucket(5, 2); // 5 capacity, 2 tokens/sec
for (let i = 0; i < 8; i++) {
  console.log(`Request ${i + 1}: ${limiter.tryConsume() ? '✅ ALLOWED' : '❌ DENIED'}`);
}

// ============================================================
// 3. Sliding Window Rate Limiter
// ============================================================

class SlidingWindowLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = new Map(); // key → [timestamps]
  }

  isAllowed(key) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(key)) this.requests.set(key, []);
    const timestamps = this.requests.get(key);

    // Remove expired timestamps
    while (timestamps.length && timestamps[0] < windowStart) {
      timestamps.shift();
    }

    if (timestamps.length < this.maxRequests) {
      timestamps.push(now);
      return true;
    }
    return false;
  }
}

console.log("\n=== Sliding Window Limiter ===");
const sw = new SlidingWindowLimiter(1000, 3); // 3 req/second
console.log("Req 1:", sw.isAllowed("user:1")); // true
console.log("Req 2:", sw.isAllowed("user:1")); // true
console.log("Req 3:", sw.isAllowed("user:1")); // true
console.log("Req 4:", sw.isAllowed("user:1")); // false (exceeded)

// ============================================================
// 4. Simple Load Balancer (Round Robin)
// ============================================================

class LoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.current = 0;
  }

  getServer() {
    const server = this.servers[this.current];
    this.current = (this.current + 1) % this.servers.length;
    return server;
  }
}

class WeightedLoadBalancer {
  constructor(servers) {
    // servers: [{host, weight}]
    this.pool = [];
    for (const s of servers) {
      for (let i = 0; i < s.weight; i++) {
        this.pool.push(s.host);
      }
    }
    this.current = 0;
  }

  getServer() {
    const server = this.pool[this.current];
    this.current = (this.current + 1) % this.pool.length;
    return server;
  }
}

console.log("\n=== Load Balancer ===");
const lb = new LoadBalancer(["server-1", "server-2", "server-3"]);
for (let i = 0; i < 6; i++) {
  console.log(`Request ${i + 1} → ${lb.getServer()}`);
}

console.log("\nWeighted (A:3, B:1):");
const wlb = new WeightedLoadBalancer([
  { host: "server-A", weight: 3 },
  { host: "server-B", weight: 1 },
]);
for (let i = 0; i < 8; i++) {
  console.log(`Request ${i + 1} → ${wlb.getServer()}`);
}

// ============================================================
// 5. Cache with TTL (Cache-Aside Pattern)
// ============================================================

class TTLCache {
  constructor(defaultTtlMs = 5000) {
    this.store = new Map();
    this.defaultTtl = defaultTtlMs;
  }

  set(key, value, ttlMs) {
    const expiry = Date.now() + (ttlMs || this.defaultTtl);
    this.store.set(key, { value, expiry });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return undefined; // expired
    }
    return entry.value;
  }

  delete(key) {
    this.store.delete(key);
  }

  size() {
    return this.store.size;
  }
}

console.log("\n=== TTL Cache ===");
const cache = new TTLCache(2000);
cache.set("user:1", { name: "Alice" });
console.log("Get:", cache.get("user:1"));  // {name: "Alice"}
console.log("Size:", cache.size());        // 1
