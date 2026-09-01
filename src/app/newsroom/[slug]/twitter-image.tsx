import OpengraphImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
  generateStaticParams as ogGenerateStaticParams,
} from "./opengraph-image";

// Node runtime, matching opengraph-image.tsx (no `runtime = "edge"`).

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;
export const generateStaticParams = ogGenerateStaticParams;

export default OpengraphImage;
