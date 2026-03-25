/**
 * Ví dụ phân tích Complexity
 *
 * Mỗi hàm kèm phân tích Time & Space Complexity chi tiết.
 */

// ============================================================
// VÍ DỤ 1: O(1) - Constant Time
// ============================================================

/**
 * Kiểm tra số chẵn/lẻ
 * Time: O(1) - chỉ 1 phép tính bất kể input
 * Space: O(1) - không dùng bộ nhớ phụ
 */
function isEven(n) {
  return n % 2 === 0;
}

console.log("--- O(1) ---");
console.log(isEven(4));  // true
console.log(isEven(7));  // false

// ============================================================
// VÍ DỤ 2: O(n) - Linear Time
// ============================================================

/**
 * Tính tổng mảng
 * Time: O(n) - duyệt qua n phần tử
 * Space: O(1) - chỉ dùng 1 biến sum
 */
function sumArray(arr) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum;
}

console.log("\n--- O(n) ---");
console.log(sumArray([1, 2, 3, 4, 5]));  // 15

// ============================================================
// VÍ DỤ 3: O(n²) - Quadratic Time
// ============================================================

/**
 * In tất cả cặp phần tử
 * Time: O(n²) - 2 vòng lặp lồng nhau
 * Space: O(1)
 */
function printAllPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
}

console.log("\n--- O(n²) ---");
console.log(printAllPairs([1, 2, 3]));
// [[1,2], [1,3], [2,3]]

// ============================================================
// VÍ DỤ 4: O(log n) - Logarithmic Time
// ============================================================

/**
 * Đếm số lần chia đôi cho đến khi = 1
 * Time: O(log n) - mỗi bước chia đôi n
 * Space: O(1)
 */
function countHalves(n) {
  let count = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    count++;
  }
  return count;
}

console.log("\n--- O(log n) ---");
console.log(countHalves(16));  // 4 (16→8→4→2→1)
console.log(countHalves(1000)); // 9

// ============================================================
// VÍ DỤ 5: O(n log n)
// ============================================================

/**
 * Sắp xếp mảng (JS built-in dùng TimSort ~ O(n log n))
 * Time: O(n log n)
 * Space: O(n)
 */
function sortArray(arr) {
  return [...arr].sort((a, b) => a - b);
}

console.log("\n--- O(n log n) ---");
console.log(sortArray([5, 3, 8, 1, 2]));  // [1, 2, 3, 5, 8]

// ============================================================
// VÍ DỤ 6: O(2^n) - Exponential
// ============================================================

/**
 * Fibonacci đệ quy (KHÔNG tối ưu)
 * Time: O(2^n) - mỗi lần gọi 2 lần đệ quy
 * Space: O(n) - chiều sâu call stack
 *
 * Cây đệ quy:
 *           fib(5)
 *          /      \
 *       fib(4)    fib(3)
 *       /   \      /   \
 *    fib(3) fib(2) fib(2) fib(1)
 *    ...
 */
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

console.log("\n--- O(2^n) ---");
console.log(fibSlow(10));  // 55

// ============================================================
// SO SÁNH THỰC TẾ
// ============================================================

/**
 * Demo: cùng input n=1000, đo số operations
 */
function compareComplexity(n) {
  let ops;

  // O(1)
  ops = 1;
  console.log(`O(1):       ${ops} operations`);

  // O(log n)
  ops = Math.floor(Math.log2(n));
  console.log(`O(log n):   ${ops} operations`);

  // O(n)
  ops = n;
  console.log(`O(n):       ${ops} operations`);

  // O(n log n)
  ops = n * Math.floor(Math.log2(n));
  console.log(`O(n log n): ${ops} operations`);

  // O(n²)
  ops = n * n;
  console.log(`O(n²):      ${ops} operations`);
}

console.log("\n--- So sánh với n = 1000 ---");
compareComplexity(1000);
