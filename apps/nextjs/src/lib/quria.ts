import { Quria } from "quria";

export const quria = new Quria({
  API_KEY: process.env.QURIA_API_KEY || "",
  CLIENT_ID: process.env.QURIA_CLIENT_ID || "",
  CLIENT_SECRET: process.env.QURIA_CLIENT_SECRET || "",
});
