/**
 * So sánh các thuật toán sắp xếp với demo trực quan
 */

// ============================================================
// BUBBLE SORT - O(n²)
// ============================================================
function bubbleSort(arr) {
  arr = [...arr];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // optimization: đã sorted
  }
  return arr;
}

// ============================================================
// SELECTION SORT - O(n²)
// ============================================================
function selectionSort(arr) {
  arr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

// ============================================================
// INSERTION SORT - O(n²), tốt khi gần sorted
// ============================================================
function insertionSort(arr) {
  arr = [...arr];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// ============================================================
// MERGE SORT - O(n log n), stable
// ============================================================
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// ============================================================
// QUICK SORT - O(n log n) avg, O(n²) worst
// ============================================================
function quickSort(arr) {
  arr = [...arr];
  _quickSort(arr, 0, arr.length - 1);
  return arr;
}

function _quickSort(arr, lo, hi) {
  if (lo >= hi) return;
  const pivot = partition(arr, lo, hi);
  _quickSort(arr, lo, pivot - 1);
  _quickSort(arr, pivot + 1, hi);
}

function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

// ============================================================
// COUNTING SORT - O(n+k), chỉ dùng cho số nguyên
// ============================================================
function countingSort(arr) {
  if (!arr.length) return [];
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const count = new Array(max - min + 1).fill(0);

  for (const num of arr) count[num - min]++;

  const result = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      result.push(i + min);
      count[i]--;
    }
  }
  return result;
}

// ============================================================
// DEMO & BENCHMARK
// ============================================================
const testArr = [64, 34, 25, 12, 22, 11, 90, 1, 55, 38];

console.log("Original: ", testArr);
console.log("Bubble:   ", bubbleSort(testArr));
console.log("Selection:", selectionSort(testArr));
console.log("Insertion:", insertionSort(testArr));
console.log("Merge:    ", mergeSort(testArr));
console.log("Quick:    ", quickSort(testArr));
console.log("Counting: ", countingSort(testArr));

// Benchmark với mảng lớn
function benchmark(name, sortFn, arr) {
  const start = performance.now();
  sortFn(arr);
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms`);
}

console.log("\n=== Benchmark (10000 elements) ===");
const bigArr = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
benchmark("Merge Sort   ", mergeSort, bigArr);
benchmark("Quick Sort   ", quickSort, bigArr);
benchmark("Counting Sort", countingSort, bigArr);
benchmark("Insertion Sort", insertionSort, bigArr);
