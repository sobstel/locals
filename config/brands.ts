import { S3 } from "aws-sdk";

const brands: { [key: string]: Brand } = {
  demo: {
    name: "Demo",
    spreadsheet: {
      id: "10aITrOIuPLwEn0kh_drNMUzJR4i1MxwqKH06gZX_XTs",
      range: "B18:C",
    },
  },
  niebanalna: {
    name: "Niebanalna",
    spreadsheet: {
      id: "1cmIgHjj2sUlPy81U8Dr0FPCSXjux-LXqyOCHCmC2FjI",
      range: "B36:C",
    },
    public: false,
  },
};

export default brands;
