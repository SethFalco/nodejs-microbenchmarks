# Node.js Microbenchmarks

Just some benchmarks I've written during development both professionally and during open-source contributions. The repository is for me to scaffold benchmarks quickly, and to refer back to benchmark results later.

While the repository is public, the purpose is to share why I made certain decisions. This is not a collaborative effort to publish and maintain benchmarks together. If you're able to pitch a better solution to a problem covered in the repository, feel free to share it! However, pull requests adding benchmarks for new problems won't be accepted.

## Methodology

All tests cases are constructed the same way and use the same options.

For input, instead of testing a single set of arguments, we test an array of arguments. This is so we can get what is generally most performant, rather than what is most performant for a specific scenario.

The data array may need to be tweaked depending on the data you expect to encounter in the real-world. For example, two solutions could be correct, but perform differently based on the input received. Sometimes the solution that's generally slower, is better because the input it performs faster on is what you'll encounter 99% of the time in production.

For most benchmarks, we enforce that all functions must have identical input/output. However, there are a few exceptions due to quirks like floating point precision. Cases like these will have warnings documented at the top of the file, and you'll need to strike a balance between performance and precision on a case-by-case basis.
