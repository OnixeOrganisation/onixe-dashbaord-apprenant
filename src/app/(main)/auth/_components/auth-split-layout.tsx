"use client";

import * as React from "react";

interface AuthSplitLayoutProps {
  readonly children: React.ReactNode;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly headline: string;
  readonly description: string;
}

export function AuthSplitLayout({ children, imageSrc, imageAlt, headline, description }: AuthSplitLayoutProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="relative order-2 hidden h-full overflow-hidden rounded-3xl bg-muted lg:flex">
          {/* biome-ignore lint/performance/noImgElement: Static auth illustration served from public/images */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`h-full w-full object-cover transition-all duration-1000 ease-out motion-reduce:scale-100 motion-reduce:transition-none ${
              isVisible ? "scale-100 opacity-100" : "scale-105 opacity-90"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/30" />

          <div
            className={`absolute top-10 left-10 flex flex-col gap-1.5 text-white transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            {/* biome-ignore lint/performance/noImgElement: Static brand logo served from public/images */}
            <img src="/images/logo-long.png" alt="Logo Onixe" className="h-10 w-auto object-contain object-left" />
            <p className="text-white/80 text-xs">Espace Apprenant &amp; Formation</p>
          </div>

          <div className="absolute right-10 bottom-10 left-10 space-y-2 text-white">
            <h2
              className={`font-semibold text-2xl leading-snug transition-all delay-150 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {headline}
            </h2>
            <p
              className={`text-sm text-white/80 transition-all delay-300 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
