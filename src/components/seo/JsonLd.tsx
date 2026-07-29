type JsonLdProps = {
  /** A single schema object or an array of schema objects. */
  data: Record<string, unknown> | Record<string, unknown>[];
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
