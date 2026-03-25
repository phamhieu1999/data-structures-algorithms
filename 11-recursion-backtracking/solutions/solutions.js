/**
 * ĐÁP ÁN — Backtracking Practice
 */

// BÀI 1: Letter Combinations of Phone Number
function letterCombinations(digits) {
  if (!digits) return [];
  const map = { 2:'abc', 3:'def', 4:'ghi', 5:'jkl', 6:'mno', 7:'pqrs', 8:'tuv', 9:'wxyz' };
  const result = [];
  function bt(idx, path) {
    if (idx === digits.length) { result.push(path); return; }
    for (const c of map[digits[idx]]) bt(idx + 1, path + c);
  }
  bt(0, '');
  return result;
}

// BÀI 2: Generate Parentheses
function generateParenthesis(n) {
  const result = [];
  function bt(open, close, path) {
    if (path.length === 2 * n) { result.push(path); return; }
    if (open < n) bt(open + 1, close, path + '(');
    if (close < open) bt(open, close + 1, path + ')');
  }
  bt(0, 0, '');
  return result;
}

// BÀI 4: Palindrome Partitioning
function partition(s) {
  const result = [];
  function isPalin(str, l, r) { while (l < r) { if (str[l++] !== str[r--]) return false; } return true; }
  function bt(start, path) {
    if (start === s.length) { result.push([...path]); return; }
    for (let end = start; end < s.length; end++) {
      if (isPalin(s, start, end)) {
        path.push(s.substring(start, end + 1));
        bt(end + 1, path);
        path.pop();
      }
    }
  }
  bt(0, []);
  return result;
}

console.log("=== Solutions: Backtracking ===");
console.log(letterCombinations("23"));
console.log(generateParenthesis(3));
console.log(partition("aab"));
