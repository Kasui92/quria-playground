interface Route {
  title: string;
  description: string;
  path: string;
  icon: string;
}

export const routes: Route[] = [
  {
    title: "OAuth SSR",
    description: "Server-side rendering for OAuth",
    path: "/oauth-ssr",
    icon: "/file.svg",
  },
  {
    title: "OAuth CSR",
    description: "Client-side rendering for OAuth",
    path: "/oauth-csr",
    icon: "/file.svg",
  },
];
