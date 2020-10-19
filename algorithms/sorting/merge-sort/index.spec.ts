import mergeSort from './index';

describe('Merge sort algorithm', () => {
  const arrayToSort1 = [6, 5, 3, 1, 8, 7, 4, 2];
  const orderedArray1 = [1, 2, 3, 4, 5, 6, 7, 8];

  const arrayToSort2 = [6, 5, 3, 10, 1, 8, 11, 7, 4, 9, 2];
  const orderedArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const arrayToSort3 = [
    12,
    6,
    9,
    19,
    5,
    13,
    3,
    1,
    17,
    10,
    14,
    11,
    8,
    7,
    15,
    16,
    4,
    18,
    2,
  ];
  const orderedArray3 = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
  ];

  test('It orders the given list of numbers', () => {
    expect(mergeSort(arrayToSort1)).toEqual(orderedArray1);
    expect(mergeSort(arrayToSort2)).toEqual(orderedArray2);
    expect(mergeSort(arrayToSort3)).toEqual(orderedArray3);
  });
});
