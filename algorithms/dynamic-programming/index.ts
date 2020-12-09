export default function memoizedAddTo80(): (n: number) => number {
  let cache = {};

  return (n: number): number => {
    if (n in cache) {
      return cache[n];
    } else {
      const result = n + 80;
      cache[n] = result;
      return result;
    }
  };
}
