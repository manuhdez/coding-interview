function fibonnacci(): (n: number) => number {
  let cache: {[key: number]: number | null} = {};

  return function fib(n: number): number {
    // if there is a cached value return the cached value
    if (n in cache) return cache[n];

    if (n < 2) return n;

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }
}

export default fibonnacci()
