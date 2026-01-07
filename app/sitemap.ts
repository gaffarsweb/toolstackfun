import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.toolstack.fun";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools/json`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/jwt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/image`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const toolRoutes = [
    // JSON
    "/tools/json/json-formatter",
    "/tools/json/json-validator",
    "/tools/json/json-minifier",
    "/tools/json/json-to-xml",
    "/tools/json/json-to-csv",
    "/tools/json/json-diff",

    // JWT
    "/tools/jwt/jwt-decoder",
    "/tools/jwt/jwt-encoder",
    "/tools/jwt/jwt-expiry-checker",
    "/tools/jwt/jwt-verifier",
    "/tools/jwt/jwt-base64-decoder",
    "/tools/jwt/jwt-playground",

    // IMAGE
    "/tools/image/image-compressor",
    "/tools/image/image-resizer",
    "/tools/image/image-converter",
    "/tools/image/image-cropper",
    "/tools/image/image-watermark",
  ].map<MetadataRoute.Sitemap[number]>((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...toolRoutes];
}
