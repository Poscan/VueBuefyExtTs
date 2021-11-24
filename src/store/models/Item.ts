export default class Item {
  constructor(
    id: number,
    name: string,
    scheduleDuration: number,
    scheduleOffset: number,
    lastDayAvailableSlider: number,
    sortIndex: number
  ) {
    this.id = id;
    this.name = name;
    this.scheduleDuration = scheduleDuration;
    this.scheduleOffset = scheduleOffset;
    this.lastDayAvailableSlider = lastDayAvailableSlider;
    this.sortIndex = sortIndex;
  }

  id: number;
  scheduleDuration: number;
  name: string;
  scheduleOffset: number;
  lastDayAvailableSlider: number;
  sortIndex: number;
}
