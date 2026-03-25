/**
 * BÀI TẬP TỰ LUYỆN — Linked List
 */

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function createList(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}

function printList(head) {
  const vals = [];
  while (head) { vals.push(head.val); head = head.next; }
  return vals.join(" → ");
}

// ============================================================
// BÀI 1: Palindrome Linked List (Easy)
// Link: https://leetcode.com/problems/palindrome-linked-list/
//
// Input:  1 → 2 → 2 → 1
// Output: true
// Hint: Fast/Slow pointers + reverse nửa sau
// ============================================================
function isPalindrome(head) {
  // TODO
}

// ============================================================
// BÀI 2: Add Two Numbers (Medium)
// Link: https://leetcode.com/problems/add-two-numbers/
//
// Hai số biểu diễn bằng linked list (reversed). Trả tổng dạng list.
//
// Input:  2→4→3 + 5→6→4  (342 + 465)
// Output: 7→0→8           (807)
// ============================================================
function addTwoNumbers(l1, l2) {
  // TODO
}

// ============================================================
// BÀI 3: Reorder List (Medium)
// Link: https://leetcode.com/problems/reorder-list/
//
// L0 → L1 → ... → Ln  ⟹  L0 → Ln → L1 → Ln-1 → ...
//
// Input:  1 → 2 → 3 → 4 → 5
// Output: 1 → 5 → 2 → 4 → 3
// ============================================================
function reorderList(head) {
  // TODO
}

// ============================================================
// BÀI 4: Sort List (Medium)
// Link: https://leetcode.com/problems/sort-list/
//
// Sắp xếp linked list trong O(n log n) time, O(1) space.
//
// Input:  4 → 2 → 1 → 3
// Output: 1 → 2 → 3 → 4
// Hint: Merge Sort trên linked list
// ============================================================
function sortList(head) {
  // TODO
}

// TEST
// console.log(isPalindrome(createList([1,2,2,1])));
// console.log(printList(addTwoNumbers(createList([2,4,3]), createList([5,6,4]))));
