/**
 * Checks if two ranges have any overlap.
 *
 * @example
 * rangesOverlap([1, 5], [4, 8]) // Returns true
 * rangesOverlap([1, 3], [4, 6]) // Returns false
 *
 * Common use cases:
 * - Checking schedule conflicts
 * - Finding overlapping regions
 * - Detecting collisions
 */
export function rangesOverlap(
  [start1, end1]: [number, number],
  [start2, end2]: [number, number],
): boolean {
  return start1 <= end2 && start2 <= end1;
}

/**
 * Merges overlapping ranges into a minimal set of non-overlapping ranges.
 *
 * When to use:
 * - Overlapping intervals
 * - Time slot merging
 * - Range consolidation
 * - Coverage calculation
 *
 * When not to use:
 * - Non-overlapping ranges
 * - Need to preserve original ranges
 * - Need to track individual ranges
 * - Ranges have additional metadata
 *
 * @example
 * mergeRanges([[1,3], [2,6], [8,10], [15,18]])
 * // Returns [[1,6], [8,10], [15,18]]
 *
 * How it works:
 * 1. Sort ranges by start value
 * 2. Iterate through ranges
 * 3. If current range overlaps with last merged range:
 *    - Extend last range if needed
 * 4. If no overlap:
 *    - Add current range as new separate range
 *
 * Common use cases:
 * - Simplifying time intervals
 * - Combining overlapping regions
 * - Optimizing range-based data
 */
export function mergeRanges(ranges: [number, number][]): [number, number][] {
  if (ranges.length === 0) return [];

  const sorted = [...ranges].sort(([a], [b]) => a - b); // Sort by start value
  const merged: [number, number][] = [sorted[0]]; // Initialize with first range

  for (const [start, end] of sorted.slice(1)) {
    const lastEnd = merged[merged.length - 1][1];
    if (start <= lastEnd + 1) {
      // Current range overlaps or is adjacent to last merged range
      merged[merged.length - 1][1] = Math.max(lastEnd, end);
    } else {
      // Current range is separate
      merged.push([start, end]);
    }
  }

  return merged;
}
