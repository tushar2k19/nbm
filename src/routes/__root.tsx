import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AuthProvider } from "../lib/auth";
import { I18nextProvider } from "react-i18next";

import appCss from "../styles.css?url";
import i18n from "../i18n";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { initAppLocale, LOCALE_INIT_SCRIPT } from "../lib/locale";
import { initTextScale, TEXT_SCALE_INIT_SCRIPT } from "../lib/textScale";
import SiteLayout from "../components/SiteLayout";
import { Toaster } from "@/components/ui/sonner";
import BambooPageLoader from "../components/BambooPageLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const isChunkError =
    error?.message?.includes("Failed to fetch dynamically imported module") ||
    error?.message?.includes("Importing a module script failed");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="max-w-xl text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isChunkError
            ? "A newer version of the module was loaded. Please refresh to load the latest version."
            : "Something went wrong on our end. You can try refreshing or head back home."}
        </p>

        {error?.message && (
          <div className="mt-4 text-left bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-xs font-mono overflow-auto max-h-40">
            <strong>Error details:</strong> {error.message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Refresh page
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "National Bamboo Mission | Government of India" },
      {
        name: "description",
        content:
          "Official portal of the National Bamboo Mission — promoting holistic growth of the bamboo sector across India.",
      },
      { name: "author", content: "Ministry of Agriculture and Farmers Welfare, Government of India" },
      { property: "og:title", content: "National Bamboo Mission" },
      {
        property: "og:description",
        content:
          "Holistic development of bamboo sector — plantations, products, processing and livelihoods.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "National Bamboo Mission" },
      {
        name: "twitter:description",
        content:
          "Official portal of the National Bamboo Mission — promoting holistic growth of the bamboo sector across India.",
      },
      { property: "og:image", content: "/apple-touch-icon.png" },
      { name: "twitter:image", content: "/apple-touch-icon.png" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-font-theme="legacy" data-text-scale="2">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: TEXT_SCALE_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LOCALE_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initTextScale();
    initAppLocale();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BambooPageLoader />
          <SiteLayout />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}
