const normalizeBaseUrl = (url: string) => (url.endsWith("/") ? url.slice(0, -1) : url);

export const siteConfig = {
  name: "Tourvisto",
  description: "AI-powered travel itinerary planner with curated trips, smart generation, and easy booking.",
  url: normalizeBaseUrl(import.meta.env.VITE_BASE_URL || "http://localhost:5173"),
  ogImage: "/android-chrome-512x512.png",
};

const ensureLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

export const toAbsoluteUrl = (value: string) => {
  if (!value) return siteConfig.url;

  try {
    return new URL(value).toString();
  } catch {
    return new URL(ensureLeadingSlash(value), siteConfig.url).toString();
  }
};

export const getCanonicalUrl = (pathname: string, search = "") =>
  toAbsoluteUrl(`${pathname || "/"}${search || ""}`);

const truncate = (value: string, maxLength = 160) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
};

const resolveDescription = (value?: string) => {
  const text = value?.trim() ? value.trim() : siteConfig.description;
  return truncate(text);
};

export type SeoMetaInput = {
  title: string;
  description?: string;
  pathname?: string;
  search?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export const getSeoMeta = ({
  title,
  description,
  pathname,
  search,
  image,
  type = "website",
  noIndex = false,
}: SeoMetaInput) => {
  const resolvedDescription = resolveDescription(description);
  const canonicalUrl = pathname ? getCanonicalUrl(pathname, search) : undefined;
  const ogImage = toAbsoluteUrl(image ?? siteConfig.ogImage);

  return [
    { title },
    { name: "description", content: resolvedDescription },
    ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    { property: "og:site_name", content: siteConfig.name },
    { property: "og:title", content: title },
    { property: "og:description", content: resolvedDescription },
    { property: "og:type", content: type },
    ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: resolvedDescription },
    { name: "twitter:image", content: ogImage },
  ];
};

export const getSeoLinks = (pathname?: string, search?: string) => {
  if (!pathname) return [];
  return [{ rel: "canonical", href: getCanonicalUrl(pathname, search) }];
};
