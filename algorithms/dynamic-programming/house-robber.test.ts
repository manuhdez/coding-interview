/**
 * You are a professional robber planning to rob houses along a street.
 * Each house has a certain amount of money stashed, the only constraint stopping you from robbing
 * each of them is that adjacent houses have security system connected and it will automatically
 * contact the police if two adjacent houses were broken into on the same night.
 *
 * Given a list of non-negative integers representing the amount of money of each house,
 * determine the maximum amount of money you can rob tonight without alerting the police.
 */
import houseRobber from "./house-robber";

describe("House Robber", () => {
  let houses: number[];
  beforeEach(() => {
    houses = [1, 2, 3, 1];
  });

  test("If the list of houses is empty the result should be 0", () => {
    houses = [];
    expect(houseRobber(houses)).toEqual(0);

    houses = null;
    expect(houseRobber(houses)).toEqual(0);
  });

  test("If the list only has one house the result should equal the amount of that house", () => {
    houses = [12];
    expect(houseRobber(houses)).toEqual(12);
  });

  test("Returns the maximum amount of money you can steal given the list of houses", () => {
    expect(houseRobber(houses)).toEqual(4);

    houses = [2, 7, 9, 3, 1];
    expect(houseRobber(houses)).toEqual(12);

    houses = [1];
    expect(houseRobber(houses)).toEqual(1);

    houses = [0];
    expect(houseRobber(houses)).toEqual(0);

    houses = [1, 2, 1, 1];
    expect(houseRobber(houses)).toEqual(3);
  });
});
