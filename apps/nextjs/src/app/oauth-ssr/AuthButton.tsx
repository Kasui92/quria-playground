"use client";

import clsx from "clsx";
import { useState } from "react";
import { generateAuthUrl } from "./actions";

export const AuthButton = () => {
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = async () => {
    try {
      setLoading(true);
      await generateAuthUrl();
    } catch (error) {
      console.error("Error checking authentication:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAuthenticate}
      className={clsx(
        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out cursor-pointer",
        "flex items-center justify-center",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
      disabled={loading}
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
      ) : (
        <span className="text-sm">Authenticate</span>
      )}
    </button>
  );
};
