/* eslint-disable @typescript-eslint/no-use-before-define */
// NOTE: Temprary copy of https://github.com/malczak/cents.js

const defaults = {
  separator: ",",
  decimal: ".",
  errorOnInvalid: false,
  precision: 2,
};

const powersOf10 = [
  1,
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  10000000,
  100000000,
  1000000000,
];

const pow10 = (p: number) => powersOf10[p] || Math.pow(10, p);

const round = Math.round;

const trunc = Math.trunc;

const parseFloat = Number.parseFloat;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumber = (value: any) =>
  typeof value === "number" && Number.isFinite(value) && !Number.isNaN(value);

let settings = Object.assign({}, defaults);

/**
 *
 * By default
 *  -> constructor should be in 'cents'
 *  -> Money.parse (or .from) assumes a full value
 *
 */

class Money {
  readonly cents: number;

  constructor(value?: Money | string | number) {
    this.cents = asCents(value);
  }

  /**
   * Returns value in cents
   */
  get amount(): number {
    return parseFloat(this.toString());
  }

  /**
   * Returns new negated value.
   */
  negated() {
    return Money.cents(-this.cents);
  }

  /**
   * Adds values together.
   */
  add(number: number | Money): Money {
    return add(this, number);
  }

  /**
   * Adds values together. (alias for `add`)
   */
  plus(number: number | Money) {
    return add(this, number);
  }

  /**
   * Subtracts value.
   */
  subtract(number: number | Money) {
    return subtract(this, number);
  }

  /**
   * Subtracts value. (alias for `subtract`)
   */
  minus(number: number | Money) {
    return subtract(this, number);
  }

  /**
   * Multiplies values.
   */
  multiply(number: number) {
    return multiply(this, number);
  }

  /**
   * Multiplies values. (alias for `multiply`)
   */
  times(number: number) {
    return multiply(this, number);
  }

  /**
   * Divides value.
   */
  divide(number: number) {
    return divide(this, number);
  }

  /**
   * Divides value. (alias for `divide`)
   */
  dividedBy(number: number) {
    return divide(this, number);
  }

  /**
   * Checks if values are equal
   */
  equals(value: Money | string | number) {
    return equal(this, value);
  }

  /**
   * Checks if value is 0
   */
  isZero() {
    return this.cents == 0;
  }

  /**
   * Checks if value is negative
   */
  isNegative() {
    return this.cents < 0;
  }

  /**
   * Checks if value is possitive
   */
  isPositive() {
    return this.cents > 0;
  }

  /**
   * Checks if value is less then given value.
   */
  lessThan(value: Money | string | number) {
    return lessThan(this, value);
  }

  /**
   * Checks if value is less then or equal to given value.
   */
  lessThanOrEqualTo(value: Money | string | number) {
    return lessThanOrEqual(this, value);
  }

  /**
   * Checks if value is greater then given value.
   */
  greaterThan(value: Money | string | number) {
    return greaterThan(this, value);
  }

  /**
   * Checks if value is greater then or equal to given value.
   */
  greaterThanOrEqualTo(value: Money | string | number) {
    return greaterThanOrEqual(this, value);
  }

  /**
   * Calculates a percent value
   */
  percent(value: number) {
    return percent(this, value);
  }

  /**
   * Asserts value is a valid number
   */
  assertFinate() {
    if (!isFinite(this.cents)) throw new Error("Invalid value");
    return this;
  }

  /**
   * Returns string representation in format (-)xx.xx
   */
  toString() {
    const precision = Money.settings.precision;
    return floatToAmountStr(this.cents / pow10(precision));
  }

  /**
   * Alias for `toString`
   */
  toFixed() {
    return this.toString();
  }

  /**
   * Alias for `value`
   */
  toFloat() {
    return this.amount;
  }

  /**
   * Alias for `amount`
   */
  toAmount() {
    return this.amount;
  }

  /**
   * @returns {Money}
   */
  clone(): Money {
    return Money.fromAmount(this);
  }

  /**
   * New instance from value in cents
   * @returns {boolean}
   */
  static cents(value: Money | string | number) {
    return new Money(asCents(value));
  }

  /**
   * New value from numeric value
   */
  static fromAmount(value: Money | string | number) {
    return new Money(toCents(value));
  }

  /**
   * Alias for `fromAmount`
   */
  static amount(value: Money | string | number) {
    return new Money(toCents(value));
  }

  /**
   * Settings
   * @returns {boolean}
   */
  static get settings() {
    return settings;
  }

  /**
   * Settings
   * @param {object}
   */
  static set settings(value) {
    settings = Object.assign({}, defaults, value);
  }
}

type ThingThatLooksLikeNumbr = number | string;
type ThingThatLooksLikeMoneeeeey = ThingThatLooksLikeNumbr | Money;

function toNumber(value: ThingThatLooksLikeNumbr) {
  return isNumber(value)
    ? (value as number)
    : parseFloat(typeof value === "string" ? value : value.toString());
}
/**
 * Converts amount value to cents
 * @param {number|Money} value
 */
function toCents(value: ThingThatLooksLikeMoneeeeey) {
  if (value instanceof Money) {
    return value.cents;
  }

  const { errorOnInvalid, precision } = settings;

  let v = 0;
  if (isNumber(value)) {
    v = value as number;
  } else if (typeof value === "string") {
    v = parseAmount(value as string);
  } else {
    if (errorOnInvalid) {
      throw Error("Invalid Input");
    }
    v = 0;
  }

  return centsWithPrecision(v, precision);
}

/**
 * Converts money-like value to cents
 * For floating-point numbers decimal places are truncated
 * @param value money-like value
 */
function asCents(value: ThingThatLooksLikeMoneeeeey) {
  if (value instanceof Money) {
    return value.cents;
  }

  if (isNumber(value)) {
    return trunc(value as number);
  }

  if (typeof value === "string") {
    return trunc(parseAmount(value as string));
  }

  const { errorOnInvalid } = settings;
  if (errorOnInvalid) {
    throw Error("Invalid Input");
  }

  return 0;
}

/**
 * Parse string as floating point amount
 * @param value aount string
 */
function parseAmount(value: string) {
  const { decimal } = settings;
  const regex = new RegExp("[^-\\d" + decimal + "]", "g"),
    decimalString = new RegExp("\\" + decimal, "g");
  const clearedValue = value
    .replace(/\((.*)\)/, "-$1") // allow negative e.g. (1.99)
    .replace(regex, "") // replace any non numeric values
    .replace(decimalString, "."); // convert any decimal values // scale number to integer value
  return (clearedValue || 0) as number;
}

/**
 * Converts numeric value to cents rounding on most significant cent value.
 * eq. 12.315 => 1232
 * @param {number} value
 * @param {number} precision
 */
function centsWithPrecision(value: ThingThatLooksLikeNumbr, precision: number) {
  const subprecisionMultiplier = pow10(precision + 1);
  return round(trunc(toNumber(value) * subprecisionMultiplier) / 10);
}

// Money [+/-] Money
function add(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return Money.cents(asCents(lhs) + asCents(rhs));
}

function subtract(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return Money.cents(asCents(lhs) - asCents(rhs));
}

// Money - Number
function multiply(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeNumbr
) {
  return Money.cents(asCents(lhs) * toNumber(rhs));
}

function divide(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeNumbr
) {
  return Money.cents(round(asCents(lhs) / toNumber(rhs)));
}

function percent(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeNumbr
) {
  return Money.cents(round(asCents(lhs) * (toNumber(rhs) / 100)));
}

function equal(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return asCents(lhs) == asCents(rhs);
}

function lessThan(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return asCents(lhs) < asCents(rhs);
}

function lessThanOrEqual(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return asCents(lhs) <= asCents(rhs);
}

function greaterThan(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return asCents(lhs) > asCents(rhs);
}

function greaterThanOrEqual(
  lhs: ThingThatLooksLikeMoneeeeey,
  rhs: ThingThatLooksLikeMoneeeeey
) {
  return asCents(lhs) >= asCents(rhs);
}

function floatToAmountStr(f: number) {
  return ("" + Math.round(f * 100.0) / 100.0)
    .replace(/^-(\d+)$/, "-$1.00") //-xx
    .replace(/^(\d+)$/, "$1.00") //xx
    .replace(/^-(\d+)\.(\d)$/, "-$1.$20") //-xx.xx
    .replace(/^(\d+)\.(\d)$/, "$1.$20"); //xx.xx
}

export default Money;
