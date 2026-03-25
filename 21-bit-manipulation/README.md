# 🔢 Bit Manipulation (Thao tác bit)

## Khái niệm

Thao tác trực tiếp trên các bit (0/1) của số nguyên. Rất nhanh — O(1) cho hầu hết phép toán.

## Operators cơ bản

| Operator | Ký hiệu | Ví dụ (5 = 101, 3 = 011) | Kết quả |
|----------|---------|--------------------------|---------|
| AND | `&` | `101 & 011` | `001` (1) |
| OR | `\|` | `101 \| 011` | `111` (7) |
| XOR | `^` | `101 ^ 011` | `110` (6) |
| NOT | `~` | `~101` | `...010` (-6) |
| Left Shift | `<<` | `101 << 1` | `1010` (10) |
| Right Shift | `>>` | `101 >> 1` | `10` (2) |

## Tricks quan trọng

| Trick | Code | Giải thích |
|-------|------|-----------|
| Kiểm tra chẵn/lẻ | `n & 1` | Bit cuối = 0 → chẵn |
| Nhân 2 | `n << 1` | Shift left = ×2 |
| Chia 2 | `n >> 1` | Shift right = ÷2 |
| Xóa bit cuối | `n & (n - 1)` | Xóa bit 1 phải nhất |
| Lấy bit cuối | `n & (-n)` | Isolate rightmost bit |
| Kiểm tra power of 2 | `n > 0 && (n & (n-1)) === 0` | Chỉ có 1 bit 1 |
| Swap không dùng temp | `a ^= b; b ^= a; a ^= b` | XOR swap |
| Tìm số unique | `XOR tất cả` | a ^ a = 0, a ^ 0 = a |

## Biểu diễn bit mask

```
Dùng số nguyên làm tập hợp:
bit i = 1 → phần tử i có trong tập

Set:    mask |= (1 << i)
Clear:  mask &= ~(1 << i)
Toggle: mask ^= (1 << i)
Check:  (mask >> i) & 1
```

## Bài tập phổ biến

- Single Number
- Number of 1 Bits
- Counting Bits
- Reverse Bits
- Missing Number
- Sum of Two Integers (không dùng +/-)
- Power of Two
