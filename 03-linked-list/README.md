# 🔗 Linked List (Danh sách liên kết)

## Khái niệm

Linked List là cấu trúc dữ liệu mỗi phần tử (node) chứa **data** và **pointer** tới node tiếp theo.

## Các loại Linked List

### 1. Singly Linked List
```
[data|next] → [data|next] → [data|null]
```

### 2. Doubly Linked List
```
null ← [prev|data|next] ⇄ [prev|data|next] ⇄ [prev|data|next] → null
```

### 3. Circular Linked List
```
[data|next] → [data|next] → [data|next] ─┐
     ↑                                     │
     └─────────────────────────────────────┘
```

## Độ phức tạp

| Thao tác | Singly | Doubly |
|----------|--------|--------|
| Access | O(n) | O(n) |
| Search | O(n) | O(n) |
| Insert đầu | O(1) | O(1) |
| Insert cuối | O(n) / O(1)* | O(1) |
| Delete đầu | O(1) | O(1) |
| Delete cuối | O(n) | O(1) |

*O(1) nếu giữ tail pointer

## Code minh họa

```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Đảo ngược linked list - O(n) time, O(1) space
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// Tìm điểm giữa - Fast & Slow pointers
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// Phát hiện cycle - Floyd's Algorithm
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

## Bài tập phổ biến

- Reverse Linked List
- Merge Two Sorted Lists
- Linked List Cycle
- Remove Nth Node From End
- Reorder List
