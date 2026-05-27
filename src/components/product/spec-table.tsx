import { PRODUCT } from "@/lib/product"

export function SpecTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/75">
      <table className="w-full text-sm">
        <caption className="sr-only">Reacgen sensor specifications</caption>
        <tbody className="divide-y divide-border/60">
          {PRODUCT.specs.map((spec) => (
            <tr key={spec.label} className="grid grid-cols-3 gap-4 px-4 py-3 sm:px-6">
              <th scope="row" className="text-left text-muted-foreground font-medium">
                {spec.label}
              </th>
              <td className="col-span-2 font-mono text-[13px] tabular-nums">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
