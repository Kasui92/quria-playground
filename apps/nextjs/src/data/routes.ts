interface Route {
  title: string;
  description: string;
  path: string;
  icon: string;
}

export const routes: Route[] = [
  {
    title: "btoa SSR",
    description: "Server-side rendering for OAuth with btoa",
    path: "/btoa-ssr",
    icon: "/file.svg",
  },
  {
    title: "btoa CSR",
    description: "Client-side rendering for OAuth with btoa",
    path: "/btoa-csr",
    icon: "/file.svg",
  },
];
