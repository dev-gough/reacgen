import { Check } from "lucide-react"

import { PRODUCT } from "@/lib/product"
import { cn } from "@/lib/utils"

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/75">
      <table className="w-full text-sm">
        <caption className="sr-only">Reacgen sensor vs incumbent comparison</caption>
        <thead>
          <tr className="border-b border-border/75 bg-muted/40">
            {PRODUCT.comparison.headers.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6",
                  i === 1 && "text-primary"
                )}
              >
                {h || ""}
                {i === 1 ? (
                  <Check
                    className="ml-1 inline-block size-3.5 text-primary"
                    aria-hidden
                  />
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {PRODUCT.comparison.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-3 sm:px-6",
                    j === 0 && "font-medium text-muted-foreground",
                    j === 1 && "font-mono nums text-foreground",
                    j === 2 && "font-mono nums text-muted-foreground"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
