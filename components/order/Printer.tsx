import React from "react";
import Money from "../../utils/cents";
import { formatMoney } from "../../utils/accounting";
export class OrderPrinter extends React.PureComponent<{ order: Order }> {
  render() {
    const {
      number,
      createdAt,
      brand,
      client,
      items,
      summary,
    } = this.props.order;
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
                      Data: {createdAt}
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
                      Fabristic
                      <br />
                      The Pirate Cat
                      <br />
                      Pilsudskiego, 91/20
                      <br />
                      42400 Zawiercie, Poland
                      <br />
                      PL6492127754
                    </td>

                    <td>
                      {client.firstname}&nbsp;{client.lastname}
                      <br />
                      {client.addressLine1}
                      <br />
                      {client.addressLine2 && (
                        <>
                          {client.addressLine2}
                          <br />
                        </>
                      )}
                      {client.postal}, {client.city}
                      <br />
                      {client.state && <>{client.state},</>}
                      {client.country}
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
                <td>{formatMoney(item.price)}</td>
                <td>{item.count}</td>
                <td>{formatMoney(Money.from(item.price).times(item.count))}</td>
              </tr>
            ))}

            <tr className="total">
              <td></td>
              <td colSpan={3}>
                <table>
                  <tr>
                    <td>Podsumowanie:</td>
                    <td>{summary.subtotal}</td>
                  </tr>

                  {summary.shipping && (
                    <tr>
                      <td>Dostawa:</td>
                      <td>{summary.shipping}</td>
                    </tr>
                  )}

                  {summary.tax && (
                    <tr>
                      <td>Podatek:</td>
                      <td>{summary.tax}</td>
                    </tr>
                  )}

                  <tr>
                    <td>Do zapłaty:</td>
                    <td>{summary.total}</td>
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
