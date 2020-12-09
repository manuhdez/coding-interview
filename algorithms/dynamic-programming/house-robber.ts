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
