/**
 * BÀI 1: Reverse Linked List
 * Link: https://leetcode.com/problems/reverse-linked-list/
 *
 * Input:  1 → 2 → 3 → 4 → 5
 * Output: 5 → 4 → 3 → 2 → 1
 */

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper: tạo linked list từ mảng
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

// Helper: in linked list
function printList(head) {
  const vals = [];
  while (head) {
    vals.push(head.val);
    head = head.next;
  }
  return vals.join(" → ");
}

// ✅ Iterative - O(n) time, O(1) space
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// ✅ Recursive - O(n) time, O(n) space
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

console.log("=== Reverse Linked List ===");
let list1 = createList([1, 2, 3, 4, 5]);
console.log("Before:", printList(list1));
console.log("After: ", printList(reverseList(list1)));

/**
 * BÀI 2: Merge Two Sorted Lists
 * Link: https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * Input:  1 → 2 → 4,  1 → 3 → 4
 * Output: 1 → 1 → 2 → 3 → 4 → 4
 */
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}

console.log("\n=== Merge Two Sorted Lists ===");
const a = createList([1, 2, 4]);
const b = createList([1, 3, 4]);
console.log(printList(mergeTwoLists(a, b)));
// 1 → 1 → 2 → 3 → 4 → 4

/**
 * BÀI 3: Linked List Cycle Detection
 * Link: https://leetcode.com/problems/linked-list-cycle/
 *
 * Floyd's Cycle Detection (Tortoise & Hare)
 */
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

/**
 * BÀI 3b: Tìm vị trí bắt đầu cycle
 * Link: https://leetcode.com/problems/linked-list-cycle-ii/
 */
function detectCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // Tìm điểm bắt đầu cycle
      let start = head;
      while (start !== slow) {
        start = start.next;
        slow = slow.next;
      }
      return start;
    }
  }
  return null;
}

console.log("\n=== Linked List Cycle ===");
const cycleList = createList([3, 2, 0, -4]);
// Tạo cycle: -4 → 2 (node index 1)
let node1 = cycleList.next;
let tail = cycleList.next.next.next;
tail.next = node1;
console.log("Has cycle:", hasCycle(cycleList));      // true
console.log("Cycle starts at:", detectCycle(cycleList).val);  // 2

/**
 * BÀI 4: Remove Nth Node From End
 * Link: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 *
 * Input:  1 → 2 → 3 → 4 → 5, n=2
 * Output: 1 → 2 → 3 → 5
 */
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;

  // Fast đi trước n+1 bước
  for (let i = 0; i <= n; i++) fast = fast.next;

  // Di chuyển cả 2 cùng lúc
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
}

console.log("\n=== Remove Nth From End ===");
let list4 = createList([1, 2, 3, 4, 5]);
console.log(printList(removeNthFromEnd(list4, 2)));
// 1 → 2 → 3 → 5
