import { Quria } from "quria";

export const quriaSSR = new Quria({
  API_KEY: process.env.QURIA_API_KEY || "",
  CLIENT_ID: process.env.QURIA_CLIENT_ID || "",
  CLIENT_SECRET: process.env.QURIA_CLIENT_SECRET || "",
});

export const quriaCSR = new Quria({
  API_KEY: process.env.NEXT_PUBLIC_QURIA_API_KEY || "",
  CLIENT_ID: process.env.NEXT_PUBLIC_QURIA_CLIENT_ID || "",
  CLIENT_SECRET: process.env.NEXT_PUBLIC_QURIA_CLIENT_SECRET || "",
});
