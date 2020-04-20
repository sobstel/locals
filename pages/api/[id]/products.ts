import * as R from "remeda";
import { NowRequest, NowResponse } from "@now/node";
import { google } from "googleapis";
import getBrand from "../../../config/getBrand";

// TODO: catch error
export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const brand = getBrand(req.query.id as string);

  const sheets = google.sheets("v4");
  const result = await sheets.spreadsheets.values.get({
    auth: process.env.GOOGLE_API_KEY,
    spreadsheetId: brand.spreadsheet.id,
    range: brand.spreadsheet.range,
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
