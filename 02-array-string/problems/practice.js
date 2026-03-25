/**
 * BÀI TẬP TỰ LUYỆN — Array & String
 *
 * Hướng dẫn: Tự code trước, sau đó kiểm tra đáp án trong examples/
 * Chạy file: node problems/practice.js
 */

// ============================================================
// BÀI 1: Move Zeroes (Easy)
// Link: https://leetcode.com/problems/move-zeroes/
//
// Di chuyển tất cả số 0 về cuối mảng, giữ nguyên thứ tự các số khác.
// Yêu cầu: In-place, không copy mảng mới.
//
// Input:  [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]
// ============================================================
function moveZeroes(nums) {
  // TODO: Code ở đây
}

// ============================================================
// BÀI 2: Best Time to Buy and Sell Stock (Easy)
// Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
//
// Cho mảng giá cổ phiếu theo ngày. Tìm lợi nhuận max (mua 1, bán 1 lần).
//
// Input:  [7, 1, 5, 3, 6, 4]
// Output: 5  (mua ngày 2 giá 1, bán ngày 5 giá 6)
// Hint: Track min price so far
// ============================================================
function maxProfit(prices) {
  // TODO: Code ở đây
}

// ============================================================
// BÀI 3: Valid Palindrome (Easy)
// Link: https://leetcode.com/problems/valid-palindrome/
//
// Kiểm tra string có phải palindrome (bỏ qua non-alphanumeric, case-insensitive).
//
// Input:  "A man, a plan, a canal: Panama"
// Output: true
// Hint: Two pointers
// ============================================================
function isPalindrome(s) {
  // TODO: Code ở đây
}

// ============================================================
// BÀI 4: Trapping Rain Water (Hard)
// Link: https://leetcode.com/problems/trapping-rain-water/
//
// Cho mảng height, tính lượng nước mưa bị giữ lại.
//
// Input:  [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// Output: 6
// Hint: Two pointers hoặc Monotonic Stack
// ============================================================
function trap(height) {
  // TODO: Code ở đây
}

// ============================================================
// BÀI 5: Rotate Array (Medium)
// Link: https://leetcode.com/problems/rotate-array/
//
// Xoay mảng sang phải k bước.
//
// Input:  nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Hint: Reverse 3 lần
// ============================================================
function rotate(nums, k) {
  // TODO: Code ở đây
}

// ============================================================
// TEST (bỏ comment khi đã code xong)
// ============================================================
// console.log(moveZeroes([0, 1, 0, 3, 12]));
// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(isPalindrome("A man, a plan, a canal: Panama"));
// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
// console.log(rotate([1,2,3,4,5,6,7], 3));
