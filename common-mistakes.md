# ⚠️ Common Mistakes — Lỗi thường gặp khi code DSA

## 1. Off-by-One Error

```javascript
// ❌ SAI: bỏ sót phần tử cuối
for (let i = 0; i < arr.length - 1; i++) { ... }

// ✅ ĐÚNG
for (let i = 0; i < arr.length; i++) { ... }

// ❌ SAI: Binary Search
while (left < right)   // có thể miss khi left === right

// ✅ ĐÚNG (tùy template)
while (left <= right)  // inclusive range
while (left < right)   // exclusive right (tìm boundary)
```

## 2. Integer Overflow

```javascript
// ❌ SAI: mid có thể overflow
const mid = (left + right) / 2;

// ✅ ĐÚNG
const mid = left + Math.floor((right - left) / 2);

// ❌ SAI: tổng lớn
const sum = a * b;  // nếu a, b lớn → overflow trong ngôn ngữ khác

// ✅ JS dùng BigInt nếu cần
const sum = BigInt(a) * BigInt(b);
```

## 3. Mutate Input

```javascript
// ❌ SAI: sort thay đổi mảng gốc
function solve(arr) {
  arr.sort();  // side effect!
}

// ✅ ĐÚNG: copy trước
function solve(arr) {
  const sorted = [...arr].sort();
}
```

## 4. Shallow Copy vs Deep Copy

```javascript
// ❌ SAI: push reference
result.push(path);     // path thay đổi → result cũng thay đổi

// ✅ ĐÚNG: push copy
result.push([...path]);
// hoặc
result.push(path.slice());
```

## 5. Quên Base Case trong Recursion

```javascript
// ❌ SAI: infinite loop
function dfs(node) {
  dfs(node.left);
  dfs(node.right);
}

// ✅ ĐÚNG
function dfs(node) {
  if (!node) return;  // BASE CASE
  dfs(node.left);
  dfs(node.right);
}
```

## 6. Quên đánh dấu Visited trong Graph

```javascript
// ❌ SAI: infinite loop trong graph có cycle
function dfs(graph, node) {
  for (const neighbor of graph[node]) {
    dfs(graph, neighbor);  // quay lại node cũ!
  }
}

// ✅ ĐÚNG
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited);
  }
}
```

## 7. String Immutability

```javascript
// ❌ SAI: string không thể modify in-place
s[0] = 'A';  // KHÔNG CÓ HIỆU LỰC

// ✅ ĐÚNG
s = 'A' + s.slice(1);
// hoặc
const arr = [...s]; arr[0] = 'A'; s = arr.join('');
```

## 8. Map vs Object cho key lookup

```javascript
// ❌ SAI khi key là number
const obj = {};
obj[1] = 'one';
obj['1'] = 'one_string';  // GHI ĐÈ! key luôn là string

// ✅ ĐÚNG: dùng Map
const map = new Map();
map.set(1, 'one');
map.set('1', 'one_string');  // 2 entries khác nhau
```

## 9. Queue với Array.shift() chậm

```javascript
// ❌ CHẬM: shift() là O(n)
const queue = [1, 2, 3];
queue.shift();  // O(n) vì phải dịch tất cả

// ✅ TỐT HƠN: dùng index pointer
let front = 0;
const queue = [1, 2, 3];
const val = queue[front++];  // O(1)
```

## 10. So sánh Float

```javascript
// ❌ SAI
0.1 + 0.2 === 0.3  // false!

// ✅ ĐÚNG
Math.abs((0.1 + 0.2) - 0.3) < 1e-9
```

## 11. Quên return trong Recursive

```javascript
// ❌ SAI: không return kết quả recursive
function search(node, target) {
  if (node.val === target) return node;
  if (target < node.val) search(node.left, target);   // MISSING return
  else search(node.right, target);                      // MISSING return
}

// ✅ ĐÚNG
function search(node, target) {
  if (!node || node.val === target) return node;
  if (target < node.val) return search(node.left, target);
  return search(node.right, target);
}
```

## 12. Sử dụng sai comparator trong sort

```javascript
// ❌ SAI: sort mặc định là lexicographic
[10, 9, 2, 1].sort()  // [1, 10, 2, 9] !!!

// ✅ ĐÚNG
[10, 9, 2, 1].sort((a, b) => a - b)  // [1, 2, 9, 10]
```

---

## 💡 Tips tránh bugs

1. **Luôn test edge case**: empty, 1 element, duplicates, negative
2. **Dry run bằng tay** với input nhỏ trước khi submit
3. **Kiểm tra bounds**: `i >= 0`, `i < length`, `left <= right`
4. **Log intermediate values** khi debug
5. **Đọc kỹ return type**: trả index hay value? 0-indexed hay 1-indexed?
