# 🏗️ Design Patterns (Mẫu thiết kế)

## Khái niệm

Design Patterns là các giải pháp tái sử dụng cho các vấn đề thường gặp trong thiết kế phần mềm.

## Các pattern thường gặp trong Interview

### 1. LRU Cache
- **Bài toán**: Cache có capacity, evict phần tử ít dùng nhất
- **Cấu trúc**: Hash Map + Doubly Linked List
- **Complexity**: O(1) cho get/put

### 2. LFU Cache
- **Bài toán**: Cache evict phần tử dùng ít lần nhất
- **Cấu trúc**: Hash Map + Min Heap hoặc Frequency Map

### 3. Iterator Pattern
- **Bài toán**: Duyệt collection mà không expose internal structure
- **Ví dụ**: Flatten Nested List Iterator, Peeking Iterator

### 4. Observer Pattern
- **Bài toán**: Object thay đổi → thông báo tất cả subscribers
- **Ví dụ**: Event Emitter, Pub/Sub

### 5. Producer-Consumer
- **Bài toán**: Decouple producing và consuming data
- **Ví dụ**: Message Queue, BullMQ, Kafka

### 6. Singleton
- **Bài toán**: Đảm bảo class chỉ có 1 instance
- **Ví dụ**: Database connection pool, Config manager

## Liên hệ LeetCode

| Pattern | LeetCode |
|---------|----------|
| LRU Cache | #146 |
| LFU Cache | #460 |
| Flatten Nested List | #341 |
| Design Twitter | #355 |
| Insert Delete GetRandom O(1) | #380 |
