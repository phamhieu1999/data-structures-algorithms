/**
 * ĐÁP ÁN — Array & String Practice
 * So sánh với code bạn tự viết trong problems/practice.js
 */

// BÀI 1: Move Zeroes
function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];
      insertPos++;
    }
  }
  return nums;
}

// BÀI 2: Best Time to Buy and Sell Stock
function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}

// BÀI 3: Valid Palindrome
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++; r--;
  }
  return true;
}

// BÀI 4: Trapping Rain Water
function trap(height) {
  let l = 0, r = height.length - 1;
  let lMax = 0, rMax = 0, water = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      lMax = Math.max(lMax, height[l]);
      water += lMax - height[l];
      l++;
    } else {
      rMax = Math.max(rMax, height[r]);
      water += rMax - height[r];
      r--;
    }
  }
  return water;
}

// BÀI 5: Rotate Array
function rotate(nums, k) {
  k %= nums.length;
  const rev = (l, r) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
  };
  rev(0, nums.length - 1);
  rev(0, k - 1);
  rev(k, nums.length - 1);
  return nums;
}

// VERIFY
console.log("=== Solutions: Array & String ===");
console.log(moveZeroes([0, 1, 0, 3, 12]));                     // [1,3,12,0,0]
console.log(maxProfit([7, 1, 5, 3, 6, 4]));                    // 5
console.log(isPalindrome("A man, a plan, a canal: Panama"));    // true
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));      // 6
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));                 // [5,6,7,1,2,3,4]
