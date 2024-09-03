import { BENCHMARK_OPTIONS } from '../utils/constants.js';
import { areFunctionsEqual, scaffoldBenchmark } from '../utils/utils.js';

/**
 * @typedef {(size: number) => number[]} Fn
 */

const data = [
  0,
  1,
  10,
  100
];

/** @type {Fn} */
function arrayInitialSize(size) {
  const array = new Array(size);

  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }

  return array;
}

/** @type {Fn} */
function arrayPush(size) {
  const array = [];

  for (let i = 1; i <= size; i++) {
    array.push(i);
  }

  return array;
}

/** @type {Fn} */
function arrayFillMap(size) {
  return new Array(size).fill(undefined).map((_, i) => i + 1);
}

areFunctionsEqual(
  data,
  arrayInitialSize,
  arrayPush,
  arrayFillMap,
);

scaffoldBenchmark()
  .add('array initial size', () => data.forEach((size) => arrayInitialSize(size)))
  .add('array push', () => data.forEach((size) => arrayPush(size)))
  .add('array fill map', () => data.forEach((size) => arrayFillMap(size)))
  .run(BENCHMARK_OPTIONS);
