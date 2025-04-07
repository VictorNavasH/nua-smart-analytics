
import React from "react";

export const AuthHeader = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="relative flex flex-1 items-center gap-4 md:gap-8">
        <nav className="flex flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <img
            src="/lovable-uploads/b59e57f7-7256-4917-a532-2863925ef4f1.png"
            alt="NÜA Logo"
            className="h-6 w-auto"
          />
        </nav>
      </div>
    </header>
  );
};
