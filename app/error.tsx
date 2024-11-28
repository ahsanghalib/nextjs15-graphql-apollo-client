"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full h-screen flex-col gap-2 items-center justify-center">
      <h2>Something went wrong!</h2>
      <h3 className="text-pretty">{error.message}</h3>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
