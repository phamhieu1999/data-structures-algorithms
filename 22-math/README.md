# 🔢 Math (Toán học cho lập trình)

## Các chủ đề quan trọng

### 1. GCD & LCM

```
GCD(a, b) — Ước chung lớn nhất (Euclidean Algorithm)
LCM(a, b) = (a × b) / GCD(a, b)
```

### 2. Số nguyên tố (Prime)

| Thuật toán | Complexity | Mục đích |
|-----------|-----------|----------|
| Trial Division | O(√n) | Kiểm tra 1 số |
| Sieve of Eratosthenes | O(n log log n) | Liệt kê primes đến n |

### 3. Modular Arithmetic

```
(a + b) % m = ((a % m) + (b % m)) % m
(a × b) % m = ((a % m) × (b % m)) % m
(a - b) % m = ((a % m) - (b % m) + m) % m
```

### 4. Lũy thừa nhanh (Fast Power)

Tính a^n mod m trong O(log n).

### 5. Tổ hợp (Combinatorics)

```
C(n, k) = n! / (k! × (n-k)!)
Pascal's Triangle: C(n, k) = C(n-1, k-1) + C(n-1, k)
```

## Bài tập phổ biến

- Count Primes
- Power of Three
- Factorial Trailing Zeroes
- Sqrt(x) (Binary Search)
- Happy Number
- Plus One
- Fizz Buzz
