/**
 * Bit Manipulation — Examples
 */

/**
 * BÀI 1: Single Number
 * Link: https://leetcode.com/problems/single-number/
 *
 * Mảng có 1 số xuất hiện 1 lần, còn lại 2 lần. Tìm số đó.
 * Trick: a ^ a = 0, a ^ 0 = a → XOR hết lại
 *
 * Input:  [4, 1, 2, 1, 2]
 * Output: 4
 */
function singleNumber(nums) {
  return nums.reduce((xor, n) => xor ^ n, 0);
}

console.log("=== Single Number ===");
console.log(singleNumber([4, 1, 2, 1, 2]));  // 4
console.log(singleNumber([2, 2, 1]));         // 1

/**
 * BÀI 2: Number of 1 Bits (Hamming Weight)
 * Link: https://leetcode.com/problems/number-of-1-bits/
 *
 * Đếm số bit 1 trong biểu diễn nhị phân.
 * Trick: n & (n-1) xóa bit 1 phải nhất
 */
function hammingWeight(n) {
  let count = 0;
  while (n) {
    n &= (n - 1);
    count++;
  }
  return count;
}

console.log("\n=== Hamming Weight ===");
console.log(hammingWeight(11));   // 3 (1011)
console.log(hammingWeight(128));  // 1 (10000000)
console.log(hammingWeight(255));  // 8 (11111111)

/**
 * BÀI 3: Counting Bits
 * Link: https://leetcode.com/problems/counting-bits/
 *
 * Trả mảng: ans[i] = số bit 1 của i, với i từ 0 → n.
 *
 * Input:  5
 * Output: [0, 1, 1, 2, 1, 2]
 */
function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}

console.log("\n=== Counting Bits ===");
console.log(countBits(5));   // [0, 1, 1, 2, 1, 2]
console.log(countBits(2));   // [0, 1, 1]

/**
 * BÀI 4: Missing Number
 * Link: https://leetcode.com/problems/missing-number/
 *
 * Mảng [0..n] thiếu 1 số. Tìm số đó.
 * Trick: XOR tất cả index và value
 *
 * Input:  [3, 0, 1]
 * Output: 2
 */
function missingNumber(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}

console.log("\n=== Missing Number ===");
console.log(missingNumber([3, 0, 1]));     // 2
console.log(missingNumber([0, 1]));        // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8

/**
 * BÀI 5: Reverse Bits
 * Link: https://leetcode.com/problems/reverse-bits/
 *
 * Đảo ngược 32 bit.
 */
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>= 1;
  }
  return result >>> 0;
}

console.log("\n=== Reverse Bits ===");
console.log(reverseBits(0b00000010100101000001111010011100));
// 964176192 (0b00111001011110000010100101000000)

/**
 * BÀI 6: Sum of Two Integers (không dùng + hoặc -)
 * Link: https://leetcode.com/problems/sum-of-two-integers/
 *
 * Trick: XOR = sum without carry, AND << 1 = carry
 */
function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}

console.log("\n=== Sum Without + ===");
console.log(getSum(1, 2));    // 3
console.log(getSum(-1, 1));   // 0
console.log(getSum(7, 8));    // 15

/**
 * BÀI 7: Power of Two
 * Link: https://leetcode.com/problems/power-of-two/
 */
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

console.log("\n=== Power of Two ===");
console.log(isPowerOfTwo(1));    // true
console.log(isPowerOfTwo(16));   // true
console.log(isPowerOfTwo(6));    // false

/**
 * BÀI 8: Subsets using Bitmask
 *
 * Dùng bit mask để generate tất cả subsets.
 * Mask từ 0 → 2^n - 1, bit i = 1 → chọn nums[i]
 */
function subsetsBitmask(nums) {
  const result = [];
  const n = nums.length;
  const total = 1 << n; // 2^n

  for (let mask = 0; mask < total; mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) subset.push(nums[i]);
    }
    result.push(subset);
  }
  return result;
}

console.log("\n=== Subsets via Bitmask ===");
console.log(subsetsBitmask([1, 2, 3]));
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
