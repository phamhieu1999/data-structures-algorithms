/**
 * ĐÁP ÁN — Greedy Practice
 */

// BÀI 1: Meeting Rooms II
function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  let rooms = 0, maxRooms = 0, e = 0;
  for (let s = 0; s < starts.length; s++) {
    if (starts[s] < ends[e]) rooms++;
    else e++;
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}

// BÀI 2: Hand of Straights
function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;
  const freq = new Map();
  for (const h of hand) freq.set(h, (freq.get(h) || 0) + 1);
  const sorted = [...freq.keys()].sort((a, b) => a - b);
  for (const start of sorted) {
    const count = freq.get(start) || 0;
    if (count === 0) continue;
    for (let i = 0; i < groupSize; i++) {
      const card = start + i;
      if ((freq.get(card) || 0) < count) return false;
      freq.set(card, freq.get(card) - count);
    }
  }
  return true;
}

// BÀI 3: Partition Labels
function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const result = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) { result.push(end - start + 1); start = end + 1; }
  }
  return result;
}

console.log("=== Solutions: Greedy ===");
console.log(minMeetingRooms([[0,30],[5,10],[15,20]]));  // 2
console.log(isNStraightHand([1,2,3,6,2,3,4,7,8], 3));  // true
console.log(partitionLabels("ababcbacadefegdehijhklij")); // [9,7,8]
