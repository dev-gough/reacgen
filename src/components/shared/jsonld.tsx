type JsonLdData = Record<string, unknown>

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  )
}
