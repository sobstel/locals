import * as R from "remeda";
import { NowRequest, NowResponse } from "@now/node";
import { google } from "googleapis";

type GroupedProducts = {
  name: string;
  products: { name: string; price: number }[];
}[];

// TODO: catch error
export default async (req: NowRequest, res: NowResponse) => {
  const sheets = google.sheets("v4");
  const result = await sheets.spreadsheets.values.get({
    auth: process.env.GOOGLE_API_KEY,
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: process.env.GOOGLE_SPREADSHEET_RANGE,
  });

  const rows = result.data.values as string[][];

  const groupedProducts = R.pipe(
    rows,
    R.reduce((acc, row) => {
      const isGroupHeader = row.length === 1;
      const isProduct = row[1] && row[1].trim().match(/^\d+[,.]\d+$/);

      if (isGroupHeader) {
        acc.push({ name: row[0], products: [] });
      }

      if (isProduct) {
        const group = R.last(acc);
        if (group) {
          const name = row[0].trim();
          const price = parseFloat(row[1].trim().replace(",", "."));
          group.products.push({ name, price });
        }
      }

      return acc;
    }, [] as GroupedProducts),
    R.filter((group) => group.products.length > 0)
  );

  res.json(groupedProducts);
};
