export function countToCustomString(
  value: number,
  valueUnitEnd1: string,
  valueUnitEnd2Or3Or3: string,
  valueUnitEndDefault: string
): string {
  const val = value % 100 > 20 ? value % 10 : value % 20;
  switch (val) {
    case 1:
      return `${value} ${valueUnitEnd1}`;
    case 2:
    case 3:
    case 4:
      return `${value} ${valueUnitEnd2Or3Or3}`;
    default:
      return `${value} ${valueUnitEndDefault}`;
  }
}
