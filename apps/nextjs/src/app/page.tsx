import Link from "next/link";
import Image from "next/image";
import { routes } from "@/data/routes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="text-center mb-12 max-w-2xl">
        <p className="text-xl text-white/80 mb-4">
          Welcome to the Next.js Quria Playground. Please select one of the test
          pages below to explore different features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {routes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className="group bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit">
                <Image
                  src={route.icon}
                  alt={route.title}
                  width={32}
                  height={32}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{route.title}</h2>
              <p className="text-white/70 flex-grow">{route.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-sm font-medium text-white/50 group-hover:text-white/90 transition-colors duration-300 flex items-center">
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
