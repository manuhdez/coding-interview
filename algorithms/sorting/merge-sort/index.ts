/**
 * Sorts any given array of numbers with the merge sort algorithm.
 * - Time complexity O(n log n)
 * - Space complexity O(n)
 */
export default function mergeSort(array: number[]): number[] {
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  if (array.length === 1) {
    return array;
  }

  return merge(mergeSort(left), mergeSort(right));
}

const sortNumbersAscending = (a: number, b: number) => a - b;

const merge = (arr1: number[], arr2: number[]): number[] => {
  return arr1.concat(arr2).sort(sortNumbersAscending);
};
