/**
 * BÀI 1: Permutations
 * Link: https://leetcode.com/problems/permutations/
 *
 * Input:  [1, 2, 3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
function permute(nums) {
  const result = [];

  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

console.log("=== Permutations ===");
console.log(permute([1, 2, 3]));

/**
 * BÀI 2: Combination Sum
 * Link: https://leetcode.com/problems/combination-sum/
 *
 * Cho candidates và target, tìm tất cả tổ hợp có tổng = target.
 * Mỗi số có thể dùng NHIỀU lần.
 *
 * Input:  candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3], [7]]
 */
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, path, remaining) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, path, remaining - candidates[i]); // i, không phải i+1 (dùng lại)
      path.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}

console.log("\n=== Combination Sum ===");
console.log(combinationSum([2, 3, 6, 7], 7));
// [[2,2,3], [7]]
console.log(combinationSum([2, 3, 5], 8));
// [[2,2,2,2], [2,3,3], [3,5]]

/**
 * BÀI 3: N-Queens
 * Link: https://leetcode.com/problems/n-queens/
 *
 * Đặt n quân hậu trên bàn cờ n×n sao cho không quân nào tấn công nhau.
 */
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => '.'.repeat(n));

  function isValid(row, col) {
    // Kiểm tra cột
    for (let r = 0; r < row; r++) {
      if (board[r][col] === 'Q') return false;
    }
    // Chéo trái-trên
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (board[r][c] === 'Q') return false;
    }
    // Chéo phải-trên
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++) {
      if (board[r][c] === 'Q') return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      result.push([...board]);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;
      board[row] = board[row].substring(0, col) + 'Q' + board[row].substring(col + 1);
      backtrack(row + 1);
      board[row] = board[row].substring(0, col) + '.' + board[row].substring(col + 1);
    }
  }

  backtrack(0);
  return result;
}

console.log("\n=== N-Queens (n=4) ===");
const solutions = solveNQueens(4);
console.log(`Found ${solutions.length} solutions`);
solutions.forEach((sol, i) => {
  console.log(`\nSolution ${i + 1}:`);
  sol.forEach(row => console.log(row));
});

/**
 * BÀI 4: Word Search
 * Link: https://leetcode.com/problems/word-search/
 *
 * Input:
 *   board = [["A","B","C","E"],
 *            ["S","F","C","S"],
 *            ["A","D","E","E"]]
 *   word = "ABCCED"
 * Output: true
 */
function exist(board, word) {
  const rows = board.length, cols = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[idx]) return false;

    const temp = board[r][c];
    board[r][c] = '#'; // đánh dấu

    const found = dfs(r+1, c, idx+1) || dfs(r-1, c, idx+1) ||
                  dfs(r, c+1, idx+1) || dfs(r, c-1, idx+1);

    board[r][c] = temp; // backtrack
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

console.log("\n=== Word Search ===");
const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(board, "ABCCED"));  // true
console.log(exist(board, "SEE"));     // true
console.log(exist(board, "ABCB"));    // false
