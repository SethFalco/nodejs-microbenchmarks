/*
 * Context:
 * - https://github.com/svg/svgo/pull/1961
 */

import { BENCHMARK_OPTIONS } from '../utils/constants.js';
import { areFunctionsEqual, scaffoldBenchmark } from '../utils/utils.js';

/**
 * @typedef {(c: string) => boolean} Fn
 */

const data = [
  '0',
  '1',
  '-',
  '.',
];

/** @type {Fn} */
function betweenCodePoints(c) {
  const codePoint = c.codePointAt(0);
  if (codePoint == null) {
    return false;
  }
  return 48 <= codePoint && codePoint <= 57;
}

/** @type {Fn} */
function betweenChars(c) {
  return c >= '0' && c <= '9';
}

const DIGITS = '0123456789';
/** @type {Fn} */
function stringIncludes(c) {
  return DIGITS.includes(c);
}

/** @type {Fn} */
function checkIfNan(c) {
  return !isNaN(parseInt(c));
}

areFunctionsEqual(
  data,
  betweenCodePoints,
  betweenChars,
  stringIncludes,
  checkIfNan,
);

scaffoldBenchmark()
  .add('between code points', () => data.forEach(betweenCodePoints))
  .add('between chars', () => data.forEach(betweenChars))
  .add('string includes', () => data.forEach(stringIncludes))
  .add('check if nan', () => data.forEach(checkIfNan))
  .run(BENCHMARK_OPTIONS);
