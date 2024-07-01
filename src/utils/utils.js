import Benchmark from 'benchmark';
import assert from 'assert';

/**
 * @typedef {import('benchmark').Suite} Suite
 */

/**
 * @returns {Suite}
 */
export function scaffoldBenchmark() {
  return new Benchmark.Suite()
    .on('cycle', (event) => console.log(String(event.target)));
}

/**
 * @param {unknown[]} data Array of args to pass to function, pass an array of
 *                         arrays if the function takes multiple arguments.
 * @param {Function[]} fns
 * @returns {true} If the functions have identical outputs for the given data.
 * @throws {AssertionError} If functions don't have identical outputs.
 */
export function areFunctionsEqual(data, ...fns) {
  const results = data.map(d => fns.map(fn => {
    return Array.isArray(d) ? fn(...d) : fn(d);
  }));

  for (const result of results) {
    for (let i = 1; i < fns.length; i++) {
      assert.deepStrictEqual(result[i], result[0]);
    }
  }

  return true;
}
