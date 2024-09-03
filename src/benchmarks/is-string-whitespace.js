/*
 * Context:
 * - https://github.com/svg/svgo/pull/1913
 * - https://github.com/svg/svgo/pull/2039
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
  ' ',
  '\t',
  '\n',
  '\r',
  ' ',
];

/** @type {Fn} */
function stringLiterals(c) {
  return (
    c === ' ' ||
    c === '\t' ||
    c === '\r' ||
    c === '\n'
  );
};

/** @type {Fn} */
function codePoints(c) {
  const codePoint = c.codePointAt(0);
  return (
    codePoint === 0x20 ||
    codePoint === 0x9 ||
    codePoint === 0xd ||
    codePoint === 0xa
  );
};

const set = new Set([' ', '\t', '\r', '\n']);
/** @type {Fn} */
function inSet(c) {
  return set.has(c);
};

const str = ' \t\r\n';
/** @type {Fn} */
function bitwiseIndex(c) {
  return !!~str.indexOf(c);
}

const pattern = /^[ \t\r\n]$/;
/** @type {Fn} */
function regex(c) {
  return pattern.test(c);
};

areFunctionsEqual(
  data,
  stringLiterals,
  codePoints,
  inSet,
  bitwiseIndex,
  regex
);

scaffoldBenchmark()
  .add('string literals', () => data.forEach(stringLiterals))
  .add('code points', () => data.forEach(codePoints))
  .add('in set', () => data.forEach(inSet))
  .add('bitwise index', () => data.forEach(bitwiseIndex))
  .add('regex', () => data.forEach(regex))
  .run(BENCHMARK_OPTIONS);
