import { Units } from "../classes/units/Units";

export const productUnits = [
  new Units("g"),
  new Units("ml"),
];

export function getUnitKey(type: string): string {
  const name = type === "ml" ? "milliliters" : "grams";
  return `units.${name}`;
}

export function getUnitShortKey(type: string): string {
  const name = type === "ml" ? "milliliters" : "grams";
  return `units.${name}.short`;
}
