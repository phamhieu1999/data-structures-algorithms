/**
 * Math — Examples
 */

/**
 * BÀI 1: GCD & LCM (Euclidean Algorithm)
 *
 * GCD(48, 18) = 6
 * LCM(48, 18) = 144
 */
function gcd(a, b) {
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

console.log("=== GCD & LCM ===");
console.log("GCD(48, 18):", gcd(48, 18));  // 6
console.log("LCM(48, 18):", lcm(48, 18));  // 144
console.log("GCD(12, 8):", gcd(12, 8));    // 4

/**
 * BÀI 2: Count Primes (Sieve of Eratosthenes)
 * Link: https://leetcode.com/problems/count-primes/
 *
 * Đếm số primes < n.
 *
 * Input:  10
 * Output: 4  (2, 3, 5, 7)
 */
function countPrimes(n) {
  if (n < 2) return 0;
  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return isPrime.filter(Boolean).length;
}

console.log("\n=== Count Primes ===");
console.log(countPrimes(10));    // 4
console.log(countPrimes(100));   // 25
console.log(countPrimes(2));     // 0

/**
 * BÀI 3: Check Prime
 */
function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

console.log("\n=== Is Prime ===");
console.log(isPrime(17));   // true
console.log(isPrime(15));   // false
console.log(isPrime(2));    // true

/**
 * BÀI 4: Fast Power (a^n mod m)
 *
 * Input:  base=2, exp=10, mod=1000
 * Output: 24  (1024 % 1000)
 */
function fastPow(base, exp, mod = Infinity) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp & 1) result = (result * base) % mod;
    exp >>= 1;
    base = (base * base) % mod;
  }
  return result;
}

console.log("\n=== Fast Power ===");
console.log(fastPow(2, 10));         // 1024
console.log(fastPow(2, 10, 1000));   // 24
console.log(fastPow(3, 20, 1000));   // 486 (3^20 = 3486784401)

/**
 * BÀI 5: Factorial Trailing Zeroes
 * Link: https://leetcode.com/problems/factorial-trailing-zeroes/
 *
 * Đếm số 0 ở cuối n!
 * Trick: đếm số lần chia cho 5 (vì 5×2 = 10, 2 luôn dư)
 *
 * Input:  25
 * Output: 6  (25! có 6 trailing zeros)
 */
function trailingZeroes(n) {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}

console.log("\n=== Trailing Zeroes ===");
console.log(trailingZeroes(5));    // 1
console.log(trailingZeroes(25));   // 6
console.log(trailingZeroes(100));  // 24

/**
 * BÀI 6: Sqrt(x) — Binary Search
 * Link: https://leetcode.com/problems/sqrtx/
 */
function mySqrt(x) {
  if (x < 2) return x;
  let lo = 1, hi = Math.floor(x / 2);
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid === x) return mid;
    if (mid * mid < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return hi;
}

console.log("\n=== Sqrt(x) ===");
console.log(mySqrt(4));    // 2
console.log(mySqrt(8));    // 2
console.log(mySqrt(100));  // 10

/**
 * BÀI 7: Happy Number
 * Link: https://leetcode.com/problems/happy-number/
 *
 * Tổng bình phương các chữ số lặp lại → nếu = 1 thì happy.
 *
 * Input:  19
 * 1² + 9² = 82 → 8² + 2² = 68 → ... → 1 ✅
 */
function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }
  return n === 1;
}

function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const d = n % 10;
    sum += d * d;
    n = Math.floor(n / 10);
  }
  return sum;
}

console.log("\n=== Happy Number ===");
console.log(isHappy(19));   // true
console.log(isHappy(2));    // false

/**
 * BÀI 8: Pascal's Triangle / nCk
 * Link: https://leetcode.com/problems/pascals-triangle/
 */
function generate(numRows) {
  const result = [[1]];
  for (let i = 1; i < numRows; i++) {
    const prev = result[i - 1];
    const row = [1];
    for (let j = 1; j < i; j++) {
      row.push(prev[j - 1] + prev[j]);
    }
    row.push(1);
    result.push(row);
  }
  return result;
}

console.log("\n=== Pascal's Triangle ===");
console.log(generate(5));
