import { UnitsType } from "../classes/units/UnitsType";

export const productUnits: UnitsType[] = ["g", "ml"];

export function getUnitKey(type: string): string {
  const name = type === "ml" ? "milliliters" : "grams";
  return `units.${name}`;
}

export function getUnitShortKey(type: string): string {
  const name = type === "ml" ? "milliliters" : "grams";
  return `units.${name}.short`;
}
