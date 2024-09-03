/*
 * WARNING: These benchmarks do not have identical results. There are minor
 *          differences in precision. You should weigh performance vs
 *          precision according to your use-case.
 *
 * Context:
 * - https://github.com/svg/svgo/pull/1913
 */

import { BENCHMARK_OPTIONS } from '../utils/constants.js';
import { scaffoldBenchmark } from '../utils/utils.js';

/**
 * @typedef {(dx: number, dy: number) => number} Fn
 */

const data = [
  [3, 4],
  [10, 10],
  [134, 5235],
  [352523, 52352],
  [525.52352, 532625.5235235],
  [4245, 1352.2352],
];

/** @type {Fn} */
function sqrt(dx, dy) {
  return Math.sqrt(dx ** 2 + dy ** 2);
}

/** @type {Fn} */
function inverseSqrt(dx, dy) {
  return (dx ** 2 + dy ** 2) ** 0.5;
}

/** @type {Fn} */
function hypot(dx, dy) {
  return Math.hypot(dx, dy);
}

scaffoldBenchmark()
  .add('sqrt', () => data.forEach(([dx, dy]) => sqrt(dx, dy)))
  .add('inverse sqrt', () => data.forEach(([dx, dy]) => inverseSqrt(dx, dy)))
  .add('hypot', () => data.forEach(([dx, dy]) => hypot(dx, dy)))
  .run(BENCHMARK_OPTIONS);
