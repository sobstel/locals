import React from "react";
import moment from "moment";
import Money from "../../utils/cents";
import { formatMoney } from "../../utils/accounting";
import config from "../../config";

export class OrderPrinter extends React.PureComponent<{ order: Order }> {
  render() {
    const { number, createdAt, client, items, summary } = this.props.order;

    const printAddress = (address: Address) =>
      address && (
        <>
          {address.addressLine1}
          <br />
          {address.addressLine2 && (
            <>
              {address.addressLine2}
              <br />
            </>
          )}
          {address.postal}, {address.city}
          <br />
          {address.state && <>{address.state},</>}
          {address.country}
        </>
      );

    return (
      <div className="invoice-wrap">
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tr className="top">
              <td colSpan={2}>
                <table>
                  <tr>
                    <td className="title">
                      <img src="" />
                    </td>

                    <td>
                      Zamówienie #: {number}
                      <br />
                      Data: {moment.unix(createdAt).format("LL")}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colSpan={2}>
                <table>
                  <tr>
                    <td>
                      {config.name}
                      <br />
                      {printAddress(config.address)}
                    </td>

                    <td>
                      {client.firstname}&nbsp;{client.lastname}
                      <br />
                      {printAddress(client.address)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table cellPadding={0} cellSpacing={0}>
            <tr className="heading">
              <td>Nazwa</td>

              <td>Cena jd.</td>

              <td>Ilość</td>

              <td>Wartość</td>
            </tr>

            {items.map((item) => (
              <tr key={`${item.name}`} className="item">
                <td>{item.name}</td>
                <td>{formatMoney(Money.cents(item.price))}</td>
                <td>{item.count}</td>
                <td>
                  {formatMoney(Money.cents(item.price).times(item.count))}
                </td>
              </tr>
            ))}

            <tr className="total">
              <td></td>
              <td colSpan={3}>
                <table>
                  <tr>
                    <td>Podsumowanie:</td>
                    <td>{formatMoney(Money.cents(summary.subtotal))}</td>
                  </tr>

                  {summary.shipping && (
                    <tr>
                      <td>Dostawa:</td>
                      <td>{formatMoney(Money.cents(summary.shipping))}</td>
                    </tr>
                  )}

                  {summary.tax && (
                    <tr>
                      <td>Podatek:</td>
                      <td>{formatMoney(Money.cents(summary.tax))}</td>
                    </tr>
                  )}

                  <tr>
                    <td>Do zapłaty:</td>
                    <td>{formatMoney(Money.cents(summary.total))}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
