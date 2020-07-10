import Money from "./cents";

export function formatMoney(money: Money): string;

export function formatMoney(money: number): string;

export function formatMoney(money: Money, locale: string): string;

export function formatMoney(money: number, locale: string): string;

export function formatMoney(money: any, locale = "pl-PL") {
  if (!(money instanceof Money)) {
    money = Money.cents(money);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "PLN",
  }).format(money.toFixed());
}
