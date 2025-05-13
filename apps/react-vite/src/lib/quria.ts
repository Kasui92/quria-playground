import { Quria } from "quria";

export const quriaCSR = new Quria({
  API_KEY: import.meta.env.VITE_QURIA_API_KEY || "",
  CLIENT_ID: import.meta.env.VITE_QURIA_CLIENT_ID || "",
  CLIENT_SECRET: import.meta.env.VITE_QURIA_CLIENT_SECRET || "",
});
