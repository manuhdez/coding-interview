/**
 * Sorts any given array of numbers with the merge sort algorithm.
 * Time complexity O(n log n)
 */
export default function mergeSort(array: number[]): number[] {
  const middlePosition = Math.ceil((array.length - 1) / 2);

  if (array.length <= 2) {
    return array.sort(sortNumbersAscending);
  }

  return merge(
    mergeSort(array.slice(0, middlePosition)),
    mergeSort(array.slice(middlePosition))
  );
}

const sortNumbersAscending = (a: number, b: number) => a - b;

const merge = (arr1: number[], arr2: number[]): number[] => {
  return arr1.concat(arr2).sort(sortNumbersAscending);
};
