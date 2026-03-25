/**
 * ĐÁP ÁN — Trie Practice
 */

class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}

// BÀI 1: Word Search II
function findWords(board, words) {
  const root = new TrieNode();
  for (const w of words) {
    let node = root;
    for (const c of w) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.word = w;
  }

  const rows = board.length, cols = board[0].length;
  const result = new Set();

  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const char = board[r][c];
    if (char === '#' || !node.children[char]) return;

    node = node.children[char];
    if (node.word) result.add(node.word);

    board[r][c] = '#';
    dfs(r+1, c, node); dfs(r-1, c, node);
    dfs(r, c+1, node); dfs(r, c-1, node);
    board[r][c] = char;
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dfs(r, c, root);

  return [...result];
}

// BÀI 2: Replace Words
function replaceWords(dictionary, sentence) {
  const root = new TrieNode();
  for (const word of dictionary) {
    let node = root;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.isEnd = true;
  }

  return sentence.split(' ').map(word => {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) break;
      node = node.children[word[i]];
      if (node.isEnd) return word.substring(0, i + 1);
    }
    return word;
  }).join(' ');
}

console.log("=== Solutions: Trie ===");
console.log(findWords(
  [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
  ["oath","pea","eat","rain"]
));  // ["oath","eat"]
console.log(replaceWords(["cat","bat","rat"], "the cattle was rattled by the battery"));
// "the cat was rat by the bat"
