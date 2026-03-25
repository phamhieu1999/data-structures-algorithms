/**
 * ĐÁP ÁN — Heap Practice
 */

class MinHeap {
  constructor() { this.h = []; }
  size() { return this.h.length; }
  peek() { return this.h[0]; }
  push(v) {
    this.h.push(v); let i = this.h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (this.h[p] <= this.h[i]) break; [this.h[p], this.h[i]] = [this.h[i], this.h[p]]; i = p; }
  }
  pop() {
    const top = this.h[0]; const last = this.h.pop();
    if (this.h.length) { this.h[0] = last; let i = 0;
      while (true) { let s = i; const l = 2*i+1, r = 2*i+2;
        if (l < this.h.length && this.h[l] < this.h[s]) s = l;
        if (r < this.h.length && this.h[r] < this.h[s]) s = r;
        if (s === i) break; [this.h[s], this.h[i]] = [this.h[i], this.h[s]]; i = s; } }
    return top;
  }
}

class MaxHeap {
  constructor() { this.h = []; }
  size() { return this.h.length; }
  peek() { return this.h[0]; }
  push(v) {
    this.h.push(v); let i = this.h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (this.h[p] >= this.h[i]) break; [this.h[p], this.h[i]] = [this.h[i], this.h[p]]; i = p; }
  }
  pop() {
    const top = this.h[0]; const last = this.h.pop();
    if (this.h.length) { this.h[0] = last; let i = 0;
      while (true) { let s = i; const l = 2*i+1, r = 2*i+2;
        if (l < this.h.length && this.h[l] > this.h[s]) s = l;
        if (r < this.h.length && this.h[r] > this.h[s]) s = r;
        if (s === i) break; [this.h[s], this.h[i]] = [this.h[i], this.h[s]]; i = s; } }
    return top;
  }
}

// BÀI 1: Find Median from Data Stream
class MedianFinder {
  constructor() { this.lo = new MaxHeap(); this.hi = new MinHeap(); }
  addNum(num) {
    this.lo.push(num);
    this.hi.push(this.lo.pop());
    if (this.hi.size() > this.lo.size()) this.lo.push(this.hi.pop());
  }
  findMedian() {
    return this.lo.size() > this.hi.size()
      ? this.lo.peek()
      : (this.lo.peek() + this.hi.peek()) / 2;
  }
}

// BÀI 3: Task Scheduler
function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const maxFreq = freq[0];
  let idleSlots = (maxFreq - 1) * n;
  for (let i = 1; i < 26 && freq[i] > 0; i++) {
    idleSlots -= Math.min(freq[i], maxFreq - 1);
  }
  return Math.max(tasks.length, tasks.length + idleSlots);
}

// BÀI 4: Reorganize String
function reorganizeString(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] > Math.ceil(s.length / 2)) return '';
  const result = new Array(s.length);
  let idx = 0;
  for (const [char, count] of sorted) {
    for (let i = 0; i < count; i++) {
      if (idx >= s.length) idx = 1;
      result[idx] = char;
      idx += 2;
    }
  }
  return result.join('');
}

console.log("=== Solutions: Heap ===");
const mf = new MedianFinder();
mf.addNum(1); mf.addNum(2);
console.log("Median:", mf.findMedian()); // 1.5
mf.addNum(3);
console.log("Median:", mf.findMedian()); // 2
console.log("Task Scheduler:", leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log("Reorganize:", reorganizeString("aab")); // "aba"
console.log("Reorganize:", reorganizeString("aaab")); // ""
