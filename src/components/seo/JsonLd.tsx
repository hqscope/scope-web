type JsonLdProps = {
  /** A single schema object or an array of schema objects. */
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Serialise a schema block for an inline script. `<` is escaped so a string
 * that reaches the schema from content (newsroom bodies flow into
 * BlogPosting.articleBody) can never close the script tag — the pattern the
 * Next.js JSON-LD guide documents.
 */
function serialize(block: Record<string, unknown>): string {
  return JSON.stringify(block).replace(/</g, "\\u003c");
}

/**
 * Renders one or more JSON-LD structured-data blocks.
 * Mirrors the inline pattern previously used on the homepage.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(block) }}
        />
      ))}
    </>
  );
}
