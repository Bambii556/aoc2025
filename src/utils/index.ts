// src/utils/index.ts

// Export commonly used types
export type Point = [number, number];
export type Grid<T> = T[][];
export type NumberGrid = Grid<number>;
export type StringGrid = Grid<string>;

// Re-export everything from each module
export * from "./input.ts";
export * from "./math.ts";
export * from "./grid.ts";
export * from "./array.ts";
export * from "./utils.ts";
export * from "./pathfinding.ts";
export * from "./sets.ts";
export * from "./ranges.ts";
export * from "./number-theory.ts";
export * from "./memoize.ts";
export * from "./numbers.ts";
export * from "./logger.ts";
