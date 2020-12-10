export default function houseRobber(houses: number[]): number {
  if (!houses || !houses.length) return 0;
  if (houses.length === 1) return houses[0];

  const totals: number[] = [];
  houses.forEach((house, idx) => {
    if (idx < 2) {
      totals.push(house);
    } else {
      const currentSerialTotal = house + totals[idx - 2];
      const prevTotal = totals[idx - 1];
      totals.push(Math.max(currentSerialTotal, prevTotal));
    }
  });

  return totals[totals.length - 1];
}

export function houseRobberTwo(houses: number[]): number {
  if (!houses || !houses.length) return 0;
  if (houses.length === 1) return houses[0];

  const totals: [number, number] = [0, 0];

  let idx: number = 0;
  for (let house of houses) {
    if (idx % 2 === 0) {
      totals[0] += house;
    } else {
      totals[1] += house;
    }

    idx += 1;
  }

  return Math.max(...totals);
}
