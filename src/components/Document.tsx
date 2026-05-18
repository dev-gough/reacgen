"use client";

import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { track } from "@/lib/analytics";
import type { DocumentKind } from "@/lib/analytics";

export type DocumentVariant = "editorial" | "instrument" | "clinical";

export interface DocumentProps {
  /** Stable id for analytics — slug-like, e.g. "odx-1-datasheet-v3". */
  id: string;
  /** Document title shown to the user. */
  title: string;
  /** One-line description shown under the title. */
  description?: string;
  /** What to call this kind of doc for tracking + the badge label. */
  kind: DocumentKind;
  /** URL of the file (local /docs/... or external). */
  href: string;
  /** Optional metadata rendered in a chip strip. */
  meta?: {
    format?: string;
    size?: string;
    pages?: number;
    version?: string;
    updated?: string;
  };
  /** Open in a new tab. Defaults to true for external + PDF links. */
  newTab?: boolean;
  /** Visual treatment. */
  variant?: DocumentVariant;
  /** Mark the card with a small "new" / "updated" badge. */
  badge?: string;
  className?: string;
}

const KIND_LABEL: Record<DocumentKind, string> = {
  datasheet: "Datasheet",
  manual: "Manual",
  whitepaper: "Whitepaper",
  appnote: "Application note",
  other: "Document",
};

export function Document(props: DocumentProps) {
  const {
    id,
    title,
    description,
    kind,
    href,
    meta,
    variant = "clinical",
    badge,
    className,
  } = props;

  const isDownload = /\.(pdf|zip|csv|xlsx?|docx?)(\?|$)/i.test(href);
  const newTab = props.newTab ?? (isDownload || /^https?:/i.test(href));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Stub hrefs ("#", "#anything") shouldn't jump the page when there's no
    // real document attached yet — analytics still fires.
    if (href === "#" || href.startsWith("#")) e.preventDefault();
    track({
      name: "Document View",
      props: { id, kind, title, format: meta?.format, version: meta?.version },
    });
    if (isDownload) {
      track({
        name: "Document Download",
        props: { id, kind, title, format: meta?.format, version: meta?.version },
      });
    }
  };

  const styles = STYLES[variant];

  const linkProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${styles.root} ${className ?? ""}`}
      style={styles.rootStyle}
      data-doc-id={id}
      data-doc-kind={kind}
      {...linkProps}
    >
      {variant === "instrument" ? <InstrumentCorners /> : null}

      <div className={styles.header}>
        <span className={styles.kind} style={styles.kindStyle}>
          {variant === "instrument" ? "// " : ""}
          {KIND_LABEL[kind]}
          {badge ? (
            <span className={styles.badge} style={styles.badgeStyle}>
              {badge}
            </span>
          ) : null}
        </span>
        <span className={styles.icon} style={styles.iconStyle}>
          {isDownload ? (
            <ArrowDownToLine size={18} strokeWidth={1.5} />
          ) : (
            <ArrowUpRight size={18} strokeWidth={1.5} />
          )}
        </span>
      </div>

      <div className={styles.body}>
        <FileText
          size={variant === "editorial" ? 22 : 20}
          strokeWidth={1.4}
          className={styles.fileIcon}
          style={styles.fileIconStyle}
        />
        <div className="flex-1">
          <h3 className={styles.title} style={styles.titleStyle}>
            {title}
          </h3>
          {description ? (
            <p className={styles.desc} style={styles.descStyle}>
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {meta ? (
        <dl className={styles.meta} style={styles.metaStyle}>
          {meta.format ? <MetaChip variant={variant} label="Format" value={meta.format} /> : null}
          {meta.size ? <MetaChip variant={variant} label="Size" value={meta.size} /> : null}
          {meta.pages ? <MetaChip variant={variant} label="Pages" value={String(meta.pages)} /> : null}
          {meta.version ? <MetaChip variant={variant} label="Version" value={meta.version} /> : null}
          {meta.updated ? <MetaChip variant={variant} label="Updated" value={meta.updated} /> : null}
        </dl>
      ) : null}
    </Link>
  );
}

function MetaChip({
  variant,
  label,
  value,
}: {
  variant: DocumentVariant;
  label: string;
  value: string;
}) {
  const s = STYLES[variant];
  return (
    <div className={s.chip} style={s.chipStyle}>
      <dt className={s.chipLabel} style={s.chipLabelStyle}>
        {label}
      </dt>
      <dd className={s.chipValue} style={s.chipValueStyle}>
        {value}
      </dd>
    </div>
  );
}

function InstrumentCorners() {
  return (
    <>
      <span
        aria-hidden
        className="absolute top-0 left-0 size-3 border-t border-l"
        style={{ borderColor: "#3DA478" }}
      />
      <span
        aria-hidden
        className="absolute top-0 right-0 size-3 border-t border-r"
        style={{ borderColor: "#3DA478" }}
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-0 size-3 border-b border-l"
        style={{ borderColor: "#3DA478" }}
      />
      <span
        aria-hidden
        className="absolute bottom-0 right-0 size-3 border-b border-r"
        style={{ borderColor: "#3DA478" }}
      />
    </>
  );
}

// Thin wrappers so call sites don't need to remember `kind` strings.
export function Datasheet(props: Omit<DocumentProps, "kind">) {
  return <Document {...props} kind="datasheet" />;
}
export function Manual(props: Omit<DocumentProps, "kind">) {
  return <Document {...props} kind="manual" />;
}
export function Whitepaper(props: Omit<DocumentProps, "kind">) {
  return <Document {...props} kind="whitepaper" />;
}
export function AppNote(props: Omit<DocumentProps, "kind">) {
  return <Document {...props} kind="appnote" />;
}

// ----- per-variant styling -----

type StyleSet = {
  root: string;
  rootStyle: React.CSSProperties;
  header: string;
  kind: string;
  kindStyle: React.CSSProperties;
  badge: string;
  badgeStyle: React.CSSProperties;
  icon: string;
  iconStyle: React.CSSProperties;
  body: string;
  fileIcon: string;
  fileIconStyle: React.CSSProperties;
  title: string;
  titleStyle: React.CSSProperties;
  desc: string;
  descStyle: React.CSSProperties;
  meta: string;
  metaStyle: React.CSSProperties;
  chip: string;
  chipStyle: React.CSSProperties;
  chipLabel: string;
  chipLabelStyle: React.CSSProperties;
  chipValue: string;
  chipValueStyle: React.CSSProperties;
};

const EDITORIAL: StyleSet = {
  root: "group relative flex flex-col gap-5 border p-6 transition-colors hover:bg-[rgba(255,255,255,0.4)] no-underline",
  rootStyle: { borderColor: "rgba(26,24,20,0.22)", color: "#1A1814", background: "transparent" },
  header: "flex items-baseline justify-between",
  kind: "text-[10px] tracking-[0.28em] uppercase inline-flex items-baseline gap-3",
  kindStyle: { color: "#2E7D5B", fontFamily: "var(--font-mono, ui-monospace)" },
  badge: "text-[9px] tracking-[0.18em] uppercase border px-1.5 py-0.5",
  badgeStyle: { borderColor: "rgba(26,24,20,0.25)", color: "rgba(26,24,20,0.7)" },
  icon: "opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
  iconStyle: { color: "#1A1814" },
  body: "flex items-start gap-4",
  fileIcon: "mt-1 shrink-0",
  fileIconStyle: { color: "#2E7D5B" },
  title: "text-[1.4rem] leading-tight",
  titleStyle: {
    fontFamily: "var(--font-display, serif)",
    fontVariationSettings: '"opsz" 36',
  },
  desc: "mt-2 text-[0.95rem] leading-[1.55] opacity-80",
  descStyle: { fontFamily: "var(--font-body, serif)" },
  meta: "flex flex-wrap gap-x-6 gap-y-2 border-t pt-4",
  metaStyle: { borderColor: "rgba(26,24,20,0.18)", fontFamily: "var(--font-mono, ui-monospace)" },
  chip: "flex flex-col",
  chipStyle: {},
  chipLabel: "text-[9px] tracking-[0.22em] uppercase opacity-60",
  chipLabelStyle: { color: "#1A1814" },
  chipValue: "text-[0.85rem] mt-0.5",
  chipValueStyle: { color: "#1A1814" },
};

const INSTRUMENT: StyleSet = {
  root: "group relative flex flex-col gap-5 border p-6 transition-colors hover:bg-[#0A1410] no-underline",
  rootStyle: {
    borderColor: "#1A2128",
    background: "linear-gradient(180deg, #0C1014 0%, #0A0D11 100%)",
    color: "#D4DDE0",
  },
  header: "flex items-baseline justify-between",
  kind: "text-[10.5px] tracking-[0.22em] uppercase inline-flex items-baseline gap-3",
  kindStyle: { color: "#3DA478", fontFamily: "var(--font-mono, ui-monospace)" },
  badge: "text-[9px] tracking-[0.18em] uppercase border px-1.5 py-0.5",
  badgeStyle: { borderColor: "#3DA478", color: "#7CFFAE" },
  icon: "transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
  iconStyle: { color: "#7CFFAE" },
  body: "flex items-start gap-4",
  fileIcon: "mt-1 shrink-0",
  fileIconStyle: { color: "#3DA478" },
  title: "text-[1.2rem] leading-tight tracking-[-0.01em]",
  titleStyle: { fontFamily: "var(--font-sans, sans-serif)", fontWeight: 400 },
  desc: "mt-2 text-[0.9rem] leading-[1.55]",
  descStyle: { color: "rgba(212,221,224,0.72)" },
  meta: "grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4 md:grid-cols-3",
  metaStyle: { borderColor: "#1A2128", fontFamily: "var(--font-mono, ui-monospace)" },
  chip: "flex flex-col",
  chipStyle: {},
  chipLabel: "text-[9.5px] tracking-[0.22em] uppercase",
  chipLabelStyle: { color: "#5A6770" },
  chipValue: "text-[0.85rem] mt-0.5",
  chipValueStyle: { color: "#D4DDE0" },
};

const CLINICAL: StyleSet = {
  root: "group relative flex flex-col gap-5 rounded-sm border bg-white p-7 transition-colors hover:border-[rgba(47,143,102,0.5)] no-underline",
  rootStyle: { borderColor: "#E5E5DC", color: "#0F1311" },
  header: "flex items-baseline justify-between",
  kind: "text-[11px] tracking-[0.22em] uppercase inline-flex items-baseline gap-3",
  kindStyle: { color: "#2F8F66", fontFamily: "var(--font-mono, ui-monospace)" },
  badge: "text-[10px] tracking-[0.12em] uppercase rounded-full bg-[#2F8F66] text-white px-2 py-0.5",
  badgeStyle: {},
  icon: "transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
  iconStyle: { color: "#0F1311" },
  body: "flex items-start gap-4",
  fileIcon: "mt-1 shrink-0",
  fileIconStyle: { color: "#2F8F66" },
  title: "text-[1.2rem] leading-tight tracking-[-0.01em]",
  titleStyle: { fontFamily: "var(--font-sans, sans-serif)", fontWeight: 500 },
  desc: "mt-2 text-[14.5px] leading-[1.55]",
  descStyle: { color: "#67726B" },
  meta: "grid grid-cols-2 gap-x-5 gap-y-3 border-t pt-4 md:grid-cols-3",
  metaStyle: { borderColor: "#E5E5DC", fontFamily: "var(--font-mono, ui-monospace)" },
  chip: "flex flex-col",
  chipStyle: {},
  chipLabel: "text-[10px] tracking-[0.18em] uppercase",
  chipLabelStyle: { color: "#67726B" },
  chipValue: "text-[0.9rem] mt-0.5",
  chipValueStyle: { color: "#0F1311" },
};

const STYLES: Record<DocumentVariant, StyleSet> = {
  editorial: EDITORIAL,
  instrument: INSTRUMENT,
  clinical: CLINICAL,
};
