import fibonacci from "./fibonacci";

describe("Memoized fibonacci", () => {
  it("memoizes the values previously calculated", () => {
    expect(fibonacci(30)).toEqual(832040);
  });
});
