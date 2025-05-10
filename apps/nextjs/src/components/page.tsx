"use client";

import { routes } from "@/data/routes";
import { usePathname } from "next/navigation";

const PageHead = () => {
  const pathname = usePathname();

  const page = routes.find((route) => route.path === pathname);

  return (
    <div className="flex flex-col items-center mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        {page?.title || "Page Not Found"}
      </h1>
      <p className="text-lg text-white/70">
        {page?.description || "This page does not exist."}
      </p>
    </div>
  );
};

export { PageHead };
