"use client";

import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-secondary/10">
      <div className="flex flex-col items-center md:items-end">
        <Image src="/images/logo.svg" alt="Logo" width={147} height={72} />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      </div>
    </div>
  );
};

export default Loading;
