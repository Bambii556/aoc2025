/**
 * Binary GCD Algorithm (Binary Euclidean Algorithm)
 * Finds the largest number that divides both inputs with no remainder
 *
 * Detailed explanation:
 * 1. Take absolute values of inputs (GCD is always positive)
 * 2. Remove common factors of 2 using bit shifting:
 *    - a >>= 1 means divide by 2
 *    - (a | b) & 1 checks if both numbers are even
 * 3. Keep track of removed 2s in 'shift'
 * 4. Remove remaining factors of 2 from each number
 * 5. Subtract smaller from larger until one becomes 0
 * 6. Multiply result by 2^shift to restore common factors
 *
 * Example walkthrough:
 * gcd(48, 18):
 * 1. 48 = 110000₂, 18 = 10010₂
 * 2. Both even: shift = 1, a = 24, b = 9
 * 3. a = 24 (even), a = 12, then 6, then 3
 * 4. Now: a = 3, b = 9
 * 5. Swap so a = 9, b = 3
 * 6. Subtract: b = 6, then 3, then 0
 * 7. Result: 3 * 2^1 = 6
 *
 * When to use:
 * - Finding common factors
 * - Reducing fractions
 * - Solving timing/cycle problems
 * - Need to simplify ratios
 *
 * When not to use:
 * - Working with floating point numbers
 * - Numbers outside safe integer range
 * - Need least common multiple (use lcm)
 * - Need all factors (use getPrimeFactors)
 *
 * @example
 * gcd(48, 18) // Returns 6
 * gcd(17, 5)  // Returns 1
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  // Use binary GCD algorithm
  let shift = 0;

  // Remove common factors of 2
  while (((a | b) & 1) === 0) {
    a >>= 1;
    b >>= 1;
    shift++;
  }

  // Remove remaining factors of 2 from a
  while ((a & 1) === 0) a >>= 1;

  while (b) {
    // Remove factors of 2 from b
    while ((b & 1) === 0) b >>= 1;

    // Swap if needed so a >= b
    if (a > b) [a, b] = [b, a];

    b -= a;
  }

  // Restore common factors of 2
  return a << shift;
}

/**
 * Least Common Multiple
 * Finds smallest number divisible by both inputs
 * Uses the relationship: LCM(a,b) = |a*b|/GCD(a,b)
 *
 * Detailed explanation:
 * 1. Multiply the numbers together
 * 2. Divide by their GCD
 * 3. Take absolute value for positive result
 *
 * Example walkthrough:
 * lcm(4, 6):
 * 1. Multiply: 4 * 6 = 24
 * 2. Find GCD(4, 6) = 2
 * 3. Result: 24/2 = 12
 *
 * Visual representation:
 * 4: |----|----|----| (marks at 4, 8, 12)
 * 6: |---------|---| (marks at 6, 12)
 * First common mark is at 12
 *
 * When to use:
 * - Finding common cycle lengths
 * - Synchronization problems
 * - Pattern repetition calculations
 * - When need smallest number divisible by both inputs
 * - Time-based cycle problems
 *
 * When not to use:
 * - Numbers outside safe integer range
 * - Need factors instead of multiples
 * - Working with floating point numbers
 * - Memory/performance critical (for very large numbers)
 *
 * @example
 * lcm(4, 6)   // Returns 12
 * lcm(15, 25) // Returns 75
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * LCM for multiple numbers
 * Calculates the LCM of an array of numbers by repeatedly applying lcm().
 * Useful when finding cycle lengths in puzzle patterns.
 *
 * Finds smallest number divisible by all inputs
 *
 * Detailed explanation:
 * Uses reduce to repeatedly apply LCM:
 * 1. Start with first number
 * 2. Find LCM with second number
 * 3. Take that result and find LCM with third number
 * 4. Continue until all numbers processed
 *
 * Example walkthrough:
 * lcmArray([4, 6, 8]):
 * 1. First pair: lcm(4, 6) = 12
 * 2. Result with next: lcm(12, 8) = 24
 *
 * Visual representation:
 * 4: |----|----|----|----|----|----|
 * 6: |---------|---------|---------|
 * 8: |-----------|-----------|
 * All align at 24
 *
 * When to use:
 * - Multiple cycle synchronization
 * - Finding common repeat intervals
 * - Need smallest number divisible by all inputs
 * - Pattern matching across multiple sequences
 * - Time-based problems with multiple cycles
 *
 * When not to use:
 * - Very large arrays (performance degrades)
 * - Numbers that could overflow when multiplied
 * - Need to preserve intermediate calculations
 * - When any input could be 0
 * - Need prime factorization
 *
 * @example
 * lcmArray([4, 6, 8]) // Returns 24
 */
export function lcmArray(numbers: number[]): number {
  return numbers.reduce((a, b) => lcm(a, b));
}

/**
 * Generate all permutations of an array
 * Optimized version using Heap's Algorithm
 *
 * Performance characteristics:
 * - Time: O(n!) - can't avoid this as it's generating all permutations
 * - Space: O(n) - better than O(n!) of recursive version
 *
 * When to use:
 * - Need all possible arrangements
 * - Array size <= 8 (8! = 40320 permutations)
 * - Order matters
 * - Performance is critical
 *
 * When not to use:
 * - Arrays longer than 8 elements
 * - Only need some permutations
 * - Order doesn't matter
 *
 * @example
 * getPermutations([1, 2]) // Returns [[1,2], [2,1]]
 *
 * How it works:
 * 1. Base case: array of 1 or 0 elements returns itself
 * 2. For each element:
 *   - Take it as the first element
 *   - Get permutations of remaining elements
 *   - Add current element to front of each sub-permutation
 */
export function getPermutations<T>(array: T[]): T[][] {
  if (array.length <= 1) return [array.slice()];
  if (array.length > 8) {
    // throw new Error("Array too large, permutations would exceed 40320");
    return getPermutationsLarger(array);
  }

  const result: T[][] = [];
  const len = array.length;
  const c = new Array(len).fill(0);

  // Add first permutation
  result.push(array.slice());

  let i = 0;
  while (i < len) {
    if (c[i] < i) {
      // Swap elements
      const k = i % 2 && c[i];
      const temp = array[i];
      array[i] = array[k];
      array[k] = temp;

      // Add new permutation
      result.push(array.slice());

      // Increment count
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }

  return result;
}

function getPermutationsLarger<T>(array: T[]): T[][] {
  if (array.length <= 1) return [array];

  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const current = array[i]; // Element to put first
    const remaining = [ // All other elements
      ...array.slice(0, i),
      ...array.slice(i + 1),
    ];
    // Recursively get permutations of remaining elements
    const permutations = getPermutations(remaining);

    // Add current element to front of each sub-permutation
    for (const permutation of permutations) {
      result.push([current, ...permutation]);
    }
  }
  return result;
}

/**
 * Convert binary string to decimal number
 *
 * When to use:
 * - Binary string conversion problems
 * - Bit manipulation puzzles
 * - Binary pattern matching
 *
 * When not to use:
 * - Already have number type
 * - Non-binary strings
 * - Numbers exceeding safe integer
 *
 * @example
 * binaryToDecimal('1101') // Returns 13
 * binaryToDecimal('00001111') // Returns 15
 *
 * // Use in pattern matching
 * const patterns = ['1010', '1100', '1111'];
 * const values = patterns.map(binaryToDecimal);
 */
export function binaryToDecimal(binary: string): number {
  let result = 0;
  for (let i = 0; i < binary.length; i++) {
    result = (result << 1) | (binary[i] === "1" ? 1 : 0);
  }
  return result;
  // Faster than parseInt(binary, 2) for longer strings
}

/**
 * Optimized mode (most frequent value) calculator
 *
 * When to use:
 * - Need most common element
 * - Frequency analysis
 * - Single pass required
 * - Memory available for Map
 *
 * When not to use:
 * - Need all frequencies
 * - Need to handle ties
 * - Memory constrained
 * - Need to track frequency order
 *
 * @example
 * mode([1, 2, 2, 3, 4, 2]) // Returns 2
 *
 * // Find most common character
 * mode('abracadabra'.split('')) // Returns 'a'
 */
export function mode<T>(arr: T[]): T {
  const freq = new Map<T, number>();
  let maxFreq = 0;
  let maxItem: T = arr[0];

  // Single pass through array
  for (const item of arr) {
    const count = (freq.get(item) || 0) + 1;
    freq.set(item, count);

    if (count > maxFreq) {
      maxFreq = count;
      maxItem = item;
    }
  }

  return maxItem;
}
