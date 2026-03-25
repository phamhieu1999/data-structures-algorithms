/**
 * ĐÁP ÁN — Bit Manipulation Practice
 */

// BÀI 1: Single Number II (mỗi số xuất hiện 3 lần, 1 số 1 lần)
function singleNumberII(nums) {
  let ones = 0, twos = 0;
  for (const n of nums) {
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
}

// BÀI 2: Bitwise AND of Numbers Range
function rangeBitwiseAnd(left, right) {
  let shift = 0;
  while (left !== right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
}

console.log("=== Solutions: Bit Manipulation ===");
console.log(singleNumberII([2, 2, 3, 2]));     // 3
console.log(singleNumberII([0, 1, 0, 1, 0, 1, 99])); // 99
console.log(rangeBitwiseAnd(5, 7));              // 4
console.log(rangeBitwiseAnd(1, 2147483647));     // 0
