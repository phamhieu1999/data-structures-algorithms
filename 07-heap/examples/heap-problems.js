/**
 * BÀI 1: Kth Largest Element
 * Link: https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Input:  nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 */
class MinHeap {
  constructor() { this.heap = []; }
  size() { return this.heap.length; }
  peek() { return this.heap[0]; }

  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
        if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;
        if (smallest === i) break;
        [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
        i = smallest;
      }
    }
    return min;
  }
}

function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

console.log("=== Kth Largest ===");
console.log(findKthLargest([3,2,1,5,6,4], 2));      // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4

/**
 * BÀI 2: Last Stone Weight
 * Link: https://leetcode.com/problems/last-stone-weight/
 *
 * Input:  [2, 7, 4, 1, 8, 1]
 * Output: 1
 */
class MaxHeap {
  constructor() { this.heap = []; }
  size() { return this.heap.length; }
  peek() { return this.heap[0]; }

  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] >= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        let largest = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < this.heap.length && this.heap[l] > this.heap[largest]) largest = l;
        if (r < this.heap.length && this.heap[r] > this.heap[largest]) largest = r;
        if (largest === i) break;
        [this.heap[largest], this.heap[i]] = [this.heap[i], this.heap[largest]];
        i = largest;
      }
    }
    return max;
  }
}

function lastStoneWeight(stones) {
  const heap = new MaxHeap();
  for (const s of stones) heap.push(s);

  while (heap.size() > 1) {
    const y = heap.pop();
    const x = heap.pop();
    if (y !== x) heap.push(y - x);
  }
  return heap.size() ? heap.peek() : 0;
}

console.log("\n=== Last Stone Weight ===");
console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));  // 1

/**
 * BÀI 3: K Closest Points to Origin
 * Link: https://leetcode.com/problems/k-closest-points-to-origin/
 *
 * Input:  points = [[1,3],[-2,2]], k = 1
 * Output: [[-2,2]]
 */
function kClosest(points, k) {
  // Sort by distance (no need sqrt for comparison)
  points.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
  return points.slice(0, k);
}

console.log("\n=== K Closest Points ===");
console.log(kClosest([[1,3],[-2,2]], 1));       // [[-2,2]]
console.log(kClosest([[3,3],[5,-1],[-2,4]], 2)); // [[3,3],[-2,4]]
