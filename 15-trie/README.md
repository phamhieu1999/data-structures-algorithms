# 🔤 Trie (Prefix Tree)

## Khái niệm

Trie là cấu trúc cây dùng để lưu trữ và tìm kiếm **chuỗi** hiệu quả.

```
        root
       / | \
      a  b  c
     /       \
    p         a
   / \         \
  p   r         t   ← "cat"
  |             |
  l             s   ← "cats"
  |
  e   ← "apple"
```

## Độ phức tạp

| Thao tác | Complexity |
|----------|-----------|
| Insert | O(m) |
| Search | O(m) |
| StartsWith | O(m) |

*m = độ dài chuỗi*

## Code minh họa

```javascript
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
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
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
```

## Ứng dụng

- **Autocomplete**: Gợi ý từ khi gõ
- **Spell checker**: Kiểm tra chính tả
- **IP routing**: Longest prefix matching
- **Word games**: Tìm từ trong bảng chữ cái

## Bài tập phổ biến

- Implement Trie
- Word Search II
- Design Add and Search Words
- Replace Words
