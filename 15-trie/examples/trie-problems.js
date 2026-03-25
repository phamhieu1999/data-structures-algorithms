/**
 * BÀI 1: Implement Trie
 * Link: https://leetcode.com/problems/implement-trie-prefix-tree/
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this._traverse(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this._traverse(prefix) !== null;
  }

  _traverse(str) {
    let node = this.root;
    for (const char of str) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }
}

console.log("=== Implement Trie ===");
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));     // true
console.log(trie.search("app"));       // false
console.log(trie.startsWith("app"));   // true
trie.insert("app");
console.log(trie.search("app"));       // true

/**
 * BÀI 2: Design Add and Search Words
 * Link: https://leetcode.com/problems/design-add-and-search-words-data-structure/
 *
 * Hỗ trợ '.' wildcard match bất kỳ ký tự.
 */
class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }

  search(word) {
    return this._dfs(word, 0, this.root);
  }

  _dfs(word, idx, node) {
    if (idx === word.length) return node.isEnd;
    const char = word[idx];

    if (char === '.') {
      for (const child of Object.values(node.children)) {
        if (this._dfs(word, idx + 1, child)) return true;
      }
      return false;
    }

    if (!node.children[char]) return false;
    return this._dfs(word, idx + 1, node.children[char]);
  }
}

console.log("\n=== Word Dictionary ===");
const dict = new WordDictionary();
dict.addWord("bad");
dict.addWord("dad");
dict.addWord("mad");
console.log(dict.search("pad"));   // false
console.log(dict.search("bad"));   // true
console.log(dict.search(".ad"));   // true
console.log(dict.search("b.."));   // true

/**
 * BÀI 3: Autocomplete System
 *
 * Gợi ý từ khi gõ prefix.
 */
class AutoComplete {
  constructor(words) {
    this.trie = new Trie();
    for (const word of words) this.trie.insert(word);
  }

  suggest(prefix) {
    const node = this.trie._traverse(prefix);
    if (!node) return [];
    const results = [];
    this._collect(node, prefix, results);
    return results;
  }

  _collect(node, prefix, results) {
    if (node.isEnd) results.push(prefix);
    for (const [char, child] of Object.entries(node.children)) {
      this._collect(child, prefix + char, results);
    }
  }
}

console.log("\n=== Autocomplete ===");
const ac = new AutoComplete(["apple", "app", "application", "apply", "banana", "band"]);
console.log(ac.suggest("app")); // ["app", "apple", "application", "apply"]
console.log(ac.suggest("ban")); // ["banana", "band"]
console.log(ac.suggest("xyz")); // []
