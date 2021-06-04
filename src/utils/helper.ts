import moment from "moment";

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getDateString(date: Date): string {
  return moment(date).format("DMMYYY");
}

export function getDateOnly(date: Date): Date {
  return new Date(moment(date).format("L"));
}

export function dec2(number: number) {
  return +number.toFixed(2);
}

export function getPercentsOf(item: number, total: number): number {
  return (item * 100) / total;
}
