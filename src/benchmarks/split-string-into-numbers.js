/*
 * Context:
 * - https://github.com/svg/svgo/pull/2036
 */

import { BENCHMARK_OPTIONS } from '../utils/constants.js';
import { areFunctionsEqual, scaffoldBenchmark } from '../utils/utils.js';

/**
 * @typedef {(viewbox: string) => number[]} Fn
 */

const data = [
  '0 0 120 120',
  '0 0 230 120',
  '110 0 120 120',
  '0 0 200.28423 200.28423',
  '20.000001 -19.99999 17.123456 70.708090',
  ' 0 0      150 100 ',
  '  0  0  0.5  .5  ',
];

/** @type {Fn} */
function splitAndFilter(viewbox) {
  return viewbox
    .split(/(?:\s,?|,)\s*/g)
    .filter(v => v.length != 0)
    .map(Number);
};

/** @type {Fn} */
function trimAndSplit(viewbox) {
  return viewbox
    .trim()
    .split(/(?:\s,?|,)\s*/g)
    .map(Number);
};

/** @type {Fn} */
function splitWithComplexRegex(viewbox) {
  return viewbox
    .split(/\b(?:(?:\s+,?|\s*,)\s*)(?=[-.\d])/g)
    .map(Number);
};

/** @type {Fn} */
function splitWithComplexRegexV2(viewbox) {
  return viewbox
    .split(/\b(?:\s+,?|\s*,)\s*(?=[^\s])/g)
    .map(Number);
};

/** @type {Fn} */
function splitWithComplexRegexV3(viewbox) {
  return viewbox
    .split(/\b(?:\s+,?|\s*,)\s*(?=\S)/g)
    .map(Number);
};

areFunctionsEqual(
  data,
  splitAndFilter,
  trimAndSplit,
  splitWithComplexRegex,
  splitWithComplexRegexV2,
  splitWithComplexRegexV3
);

scaffoldBenchmark()
  .add('split and filter', () => data.forEach(splitAndFilter))
  .add('trim and split', () => data.forEach(trimAndSplit))
  .add('split with complex regex v1', () => data.forEach(splitWithComplexRegex))
  .add('split with complex regex v2', () => data.forEach(splitWithComplexRegexV2))
  .add('split with complex regex v3', () => data.forEach(splitWithComplexRegexV3))
  .run(BENCHMARK_OPTIONS);
