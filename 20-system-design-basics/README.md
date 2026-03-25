# 🌐 System Design Basics

## Khái niệm cốt lõi

Kiến thức nền cho system design interview, kết hợp với DSA.

---

## 1. Consistent Hashing

### Problem
Khi thêm/xóa server, hash thông thường phải remap gần như tất cả keys.

### Solution
Đặt cả server và key trên vòng tròn hash. Key được assign cho server gần nhất theo chiều kim đồng hồ.

```
        0°
        |
   S3--.---.--S1
       |       |
  270°-+       +-90°
       |       |
       '---.---'
        S2
       180°

Key "user:123" hash → 75° → thuộc S1
Thêm S4 ở 60° → chỉ remap keys 0°-60°
```

### Khi nào dùng?
- Database sharding
- CDN routing
- Distributed cache (Redis Cluster)

---

## 2. Rate Limiting

### Algorithms

| Algorithm | Mô tả | Ưu điểm |
|-----------|--------|---------|
| **Token Bucket** | Bucket chứa tokens, mỗi request tiêu 1 token | Cho phép burst |
| **Sliding Window** | Đếm requests trong window | Chính xác |
| **Fixed Window** | Đếm requests trong interval cố định | Đơn giản |
| **Leaky Bucket** | Queue + process rate cố định | Smooth output |

### Implementation (Redis)
```
-- Token Bucket bằng Redis Lua
local key = KEYS[1]
local rate = tonumber(ARGV[1])     -- tokens/second
local capacity = tonumber(ARGV[2]) -- max tokens
local now = tonumber(ARGV[3])

local data = redis.call('HMGET', key, 'tokens', 'last_time')
local tokens = tonumber(data[1]) or capacity
local last = tonumber(data[2]) or now

-- Thêm tokens theo thời gian
local elapsed = now - last
tokens = math.min(capacity, tokens + elapsed * rate)

if tokens >= 1 then
  tokens = tokens - 1
  redis.call('HMSET', key, 'tokens', tokens, 'last_time', now)
  return 1  -- ALLOWED
else
  return 0  -- DENIED
end
```

---

## 3. Load Balancing

| Strategy | Mô tả | Use case |
|----------|--------|----------|
| **Round Robin** | Lần lượt từng server | Servers đồng đều |
| **Weighted RR** | Theo trọng số | Servers khác capacity |
| **Least Connections** | Server ít connection nhất | Long-lived connections |
| **IP Hash** | Hash IP client → server | Session affinity |
| **Consistent Hash** | Vòng tròn hash | Stateful services |

---

## 4. Database Sharding

### Strategies
- **Range-based**: userId 1-1M → Shard1, 1M-2M → Shard2
- **Hash-based**: hash(userId) % numShards → ShardN
- **Directory-based**: Lookup table quyết định shard

### Challenges
- **Join across shards**: Rất khó → denormalize
- **Rebalancing**: Thêm shard → migrate data
- **Hot spots**: 1 shard quá tải

---

## 5. Caching Strategies

| Pattern | Read | Write | Use case |
|---------|------|-------|----------|
| **Cache-Aside** | Check cache → miss → DB → update cache | Write to DB, invalidate cache | General purpose |
| **Read-Through** | Cache tự fetch từ DB khi miss | — | Simplify app logic |
| **Write-Through** | — | Write cache + DB đồng thời | Data consistency |
| **Write-Behind** | — | Write cache, async write DB | High write throughput |

### Cache Invalidation
- **TTL**: Tự hết hạn sau N giây
- **Event-driven**: DB change → invalidate
- **Version-based**: Key chứa version number

---

## 6. Message Queue

### Khi nào dùng?
- Xử lý nặng (email, video encoding)
- Decouple services
- Rate limiting / buffering

### So sánh

| | Redis/BullMQ | Kafka | RabbitMQ |
|--|-------------|-------|----------|
| Throughput | Medium | Very High | Medium |
| Persistence | Optional | Built-in | Built-in |
| Use case | Job queue | Event streaming | Task routing |
| Order | Per-queue | Per-partition | Per-queue |

---

## 7. CAP Theorem

Distributed system chỉ đảm bảo 2/3:
- **C**onsistency: Tất cả nodes thấy cùng data
- **A**vailability: Mọi request đều nhận response
- **P**artition tolerance: Hệ thống vẫn hoạt động khi network partition

| Chọn | Database | Trade-off |
|------|----------|-----------|
| CP | MongoDB, Redis | Sacrifice availability khi partition |
| AP | Cassandra, DynamoDB | Eventual consistency |
| CA | PostgreSQL (single node) | Không chịu được partition |

---

## 8. Common System Design Patterns

```
                   ┌─── CDN (static)
Client ─── LB ────├─── API Gateway ─── Microservice A ─── DB A
                   │                └── Cache (Redis)
                   └─── API Gateway ─── Microservice B ─── DB B
                                    └── Message Queue ─── Worker
```

### Key components
1. **Load Balancer**: Phân tải
2. **API Gateway**: Auth, rate limit, routing
3. **Cache**: Giảm tải DB
4. **Message Queue**: Async processing
5. **CDN**: Static assets gần user
6. **Database**: SQL vs NoSQL tùy use case
