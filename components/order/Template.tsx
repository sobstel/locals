import React from "react";
import { OrderPrinter } from "./Printer";

const BodyStyling = `
    @media (min-width: 1000px) {
        .invoice-wrap {
            max-width: 600px;
        }
    }
`;

const DefaultStyling = `
    .invoice-box {
        margin: auto;
        padding: 30px;
        border: none;
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
    }

    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }

    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
        text-align: right;
    }

    .invoice-box table tr td:first-child {
        text-align: left;
    }

    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }

    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }

    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }

    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.item td{
        border-bottom: none;
    }

    .invoice-box table tr.total \> td:nth-child(2) {
        border-top: 2px solid #eee;
    }

    .invoice-box table tr.total \> td:nth-child(2) td:first-child {
        text-align: right;
    }

    .invoice-box table tr.total table td {
        padding: 0;
    }

    .invoice-box table tr.total table tr:last-child {
        font-weight: bold;
    }

    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }

        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }

    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    }

    .rtl table {
        text-align: right;
    }

    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
`;

type Props = {
  order: Order;
  variant: "html" | "node";
};

export class OrderTemplate extends React.PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    variant: "html",
  };

  render() {
    const { order, variant, ...otherProps } = this.props;
    switch (variant) {
      case "html":
        return (
          // `dangerouslySetInnerHTML` is required to skip internal string sanitization in `renderToStaticMarkup`
          <html>
            <head>
              <meta charSet="utf-8" />
              <title>Zamowienie {order.number}</title>
              <style dangerouslySetInnerHTML={{ __html: BodyStyling }} />
              <style dangerouslySetInnerHTML={{ __html: DefaultStyling }} />
            </head>
            <body>
              <OrderPrinter order={order} />
            </body>
          </html>
        );
      case "node":
        return (
          <div {...otherProps}>
            <OrderPrinter order={order} />
            <style>{DefaultStyling}</style>
          </div>
        );
      default:
        return null;
    }
  }
}
