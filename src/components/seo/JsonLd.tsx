// src/components/seo/JsonLd.tsx
interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
