# 🤑 Greedy Algorithm (Thuật toán tham lam)

## Khái niệm

Greedy luôn chọn **phương án tối ưu cục bộ** tại mỗi bước, hy vọng đạt tối ưu toàn cục.

### Khi nào dùng Greedy?
- Bài toán có **greedy choice property** (chọn tối ưu cục bộ dẫn đến tối ưu toàn cục)
- Bài toán có **optimal substructure**

## Code minh họa

### Activity Selection (Chọn hoạt động)
```javascript
function activitySelection(activities) {
  // Sort theo thời gian kết thúc
  activities.sort((a, b) => a.end - b.end);

  const selected = [activities[0]];
  let lastEnd = activities[0].end;

  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastEnd) {
      selected.push(activities[i]);
      lastEnd = activities[i].end;
    }
  }
  return selected;
}
```

### Jump Game
```javascript
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}
```

### Merge Intervals
```javascript
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}
```

## Bài tập phổ biến

- Jump Game / Jump Game II
- Merge Intervals
- Non-overlapping Intervals
- Gas Station
- Hand of Straights
