/**
 * ĐÁP ÁN — Linked List Practice
 */

class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}
function createList(arr) {
  if (!arr.length) return null;
  const h = new ListNode(arr[0]); let c = h;
  for (let i = 1; i < arr.length; i++) { c.next = new ListNode(arr[i]); c = c.next; }
  return h;
}
function printList(h) { const v = []; while (h) { v.push(h.val); h = h.next; } return v.join("→"); }

// BÀI 1: Palindrome Linked List
function isPalindrome(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null;
  while (slow) { const n = slow.next; slow.next = prev; prev = slow; slow = n; }
  while (prev) {
    if (head.val !== prev.val) return false;
    head = head.next; prev = prev.next;
  }
  return true;
}

// BÀI 2: Add Two Numbers
function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    curr.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    curr = curr.next; l1 = l1?.next; l2 = l2?.next;
  }
  return dummy.next;
}

// BÀI 3: Reorder List
function reorderList(head) {
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) { const n = curr.next; curr.next = prev; prev = curr; curr = n; }
  let first = head, second = prev;
  while (second) {
    const t1 = first.next, t2 = second.next;
    first.next = second; second.next = t1;
    first = t1; second = t2;
  }
  return head;
}

// BÀI 4: Sort List (Merge Sort)
function sortList(head) {
  if (!head || !head.next) return head;
  let slow = head, fast = head.next;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  const mid = slow.next; slow.next = null;
  const merge = (l, r) => {
    const d = new ListNode(0); let c = d;
    while (l && r) {
      if (l.val <= r.val) { c.next = l; l = l.next; }
      else { c.next = r; r = r.next; }
      c = c.next;
    }
    c.next = l || r; return d.next;
  };
  return merge(sortList(head), sortList(mid));
}

console.log("=== Solutions: Linked List ===");
console.log(isPalindrome(createList([1,2,2,1])));  // true
console.log(printList(addTwoNumbers(createList([2,4,3]), createList([5,6,4])))); // 7→0→8
console.log(printList(sortList(createList([4,2,1,3]))));  // 1→2→3→4
