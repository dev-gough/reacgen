"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useId, useMemo, useState } from "react";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Major_Mono_Display,
} from "next/font/google";
import {
  initialState,
  submitWhitelist,
  type WhitelistFormState,
} from "@/app/actions/whitelist";

const display = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const BG = "#06080A";
const PANEL = "#0C1014";
const PANEL_2 = "#0A0D11";
const GRID = "#1A2128";
const TEXT = "#D4DDE0";
const MUTED = "#5A6770";
const DIM = "#3A434B";
const BRAND = "#3DA478";
const HOT = "#7CFFAE";
const WARN = "#F4B860";

type FieldKey =
  | "firstName" | "lastName" | "email"
  | "company" | "jobTitle" | "phone"
  | "line1" | "line2" | "city" | "region" | "postalCode" | "country"
  | "comments";

const FIELD_CODES: Record<FieldKey, string> = {
  firstName: "name.first",
  lastName: "name.last",
  email: "email",
  company: "org.company",
  jobTitle: "org.title",
  phone: "phone.tel",
  line1: "ship.line1",
  line2: "ship.line2",
  city: "ship.city",
  region: "ship.region",
  postalCode: "ship.postal",
  country: "ship.cc",
  comments: "notes.body",
};

const PANELS: { code: string; title: string; fields: FieldKey[]; optional?: boolean }[] = [
  { code: "01", title: "identity", fields: ["firstName", "lastName", "email"] },
  { code: "02", title: "affiliation", fields: ["company", "jobTitle", "phone"], optional: true },
  {
    code: "03",
    title: "shipping",
    fields: ["line1", "line2", "city", "region", "postalCode", "country"],
    optional: true,
  },
  { code: "04", title: "notes", fields: ["comments"], optional: true },
];

export default function V2WhitelistPage() {
  const [state, formAction, pending] = useActionState<WhitelistFormState, FormData>(
    submitWhitelist,
    initialState,
  );

  const [values, setValues] = useState<Record<FieldKey, string>>({
    firstName: "", lastName: "", email: "",
    company: "", jobTitle: "", phone: "",
    line1: "", line2: "", city: "", region: "", postalCode: "", country: "",
    comments: "",
  });

  const setField = (k: FieldKey) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const sessionId = useMemo(() => {
    const hex = "0123456789abcdef";
    let s = "";
    for (let i = 0; i < 16; i++) {
      s += hex[Math.floor(Math.random() * 16)];
      if (i === 3 || i === 7 || i === 11) s += "-";
    }
    return s;
  }, []);

  const [now, setNow] = useState<string>("—");
  useEffect(() => {
    const tick = () => setNow(new Date().toISOString().replace(/\.\d{3}Z$/, "Z"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`${display.variable} ${mono.variable} ${sans.variable} min-h-screen`}
      style={{ background: BG, color: TEXT, fontFamily: "var(--font-sans)" }}
    >
      <BackdropGrid />

      <header
        className="relative z-10 flex flex-wrap items-center justify-between gap-y-2 border-b px-6 py-3 text-[10.5px] tracking-[0.16em] uppercase md:px-10"
        style={{
          borderColor: GRID,
          fontFamily: "var(--font-mono)",
          color: MUTED,
        }}
      >
        <div className="flex items-center gap-6">
          <Link href="/v2" className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="Reacgen" width={20} height={20} />
            <span style={{ color: TEXT }}>Reacgen / ODX-1 / admit</span>
          </Link>
          <span className="hidden md:inline">FW 2.4.1</span>
          <span className="hidden md:inline">SN 00-A4-7C-13</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">queue.write() · pending</span>
          <div className="flex items-center gap-2">
            <span
              className="inline-block size-2 rounded-full"
              style={{ background: HOT, boxShadow: `0 0 8px ${HOT}` }}
            />
            <span style={{ color: HOT }}>ready</span>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[92rem] px-6 pt-12 pb-10 md:px-10 md:pt-20">
        <p
          className="text-[11px] tracking-[0.32em] uppercase"
          style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
        >
          // admit · queue.write() · batch=founders
        </p>
        <h1
          className="mt-6 max-w-4xl leading-[0.96] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)",
          }}
        >
          Reserve a probe in
          <br />
          the <span style={{ color: BRAND }}>Founders</span> Wave.
        </h1>
        <p
          className="mt-6 max-w-2xl text-[1.05rem] leading-[1.55]"
          style={{ color: "rgba(212,221,224,0.78)" }}
        >
          Hundred units · live since 2026-05-17. The form commits a row to{" "}
          <code style={{ color: BRAND, fontFamily: "var(--font-mono)" }}>
            whitelist_entries(status=pending)
          </code>
          . When your slot opens we&rsquo;ll send a redemption token to the
          email below.
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-[92rem] px-6 pb-32 md:px-10">
        {state.status === "success" || state.status === "duplicate" ? (
          <Console state={state} />
        ) : (
          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <form action={formAction} noValidate className="space-y-6">
                {PANELS.map((p) => (
                  <Panel
                    key={p.code}
                    code={p.code}
                    title={p.title}
                    optional={p.optional}
                    valid={countValid(p.fields, values, state.errors)}
                    total={p.fields.length}
                  >
                    {p.code === "01" && (
                      <FieldGrid cols={2}>
                        <FieldRow
                          k="firstName"
                          label="given name"
                          value={values.firstName}
                          onChange={setField("firstName")}
                          required
                          error={state.errors?.firstName}
                          autoComplete="given-name"
                        />
                        <FieldRow
                          k="lastName"
                          label="family name"
                          value={values.lastName}
                          onChange={setField("lastName")}
                          required
                          error={state.errors?.lastName}
                          autoComplete="family-name"
                        />
                        <FieldRow
                          k="email"
                          label="email address"
                          value={values.email}
                          onChange={setField("email")}
                          required
                          type="email"
                          error={state.errors?.email}
                          autoComplete="email"
                          colSpan={2}
                        />
                      </FieldGrid>
                    )}
                    {p.code === "02" && (
                      <FieldGrid cols={2}>
                        <FieldRow
                          k="company"
                          label="institution / company"
                          value={values.company}
                          onChange={setField("company")}
                          error={state.errors?.company}
                          autoComplete="organization"
                          colSpan={2}
                        />
                        <FieldRow
                          k="jobTitle"
                          label="role / title"
                          value={values.jobTitle}
                          onChange={setField("jobTitle")}
                          error={state.errors?.jobTitle}
                          autoComplete="organization-title"
                        />
                        <FieldRow
                          k="phone"
                          label="telephone"
                          value={values.phone}
                          onChange={setField("phone")}
                          type="tel"
                          error={state.errors?.phone}
                          autoComplete="tel"
                        />
                      </FieldGrid>
                    )}
                    {p.code === "03" && (
                      <FieldGrid cols={6}>
                        <FieldRow
                          k="line1"
                          label="street, line 1"
                          value={values.line1}
                          onChange={setField("line1")}
                          error={state.errors?.line1}
                          autoComplete="address-line1"
                          colSpan={6}
                        />
                        <FieldRow
                          k="line2"
                          label="street, line 2"
                          value={values.line2}
                          onChange={setField("line2")}
                          error={state.errors?.line2}
                          autoComplete="address-line2"
                          colSpan={6}
                        />
                        <FieldRow
                          k="city"
                          label="city"
                          value={values.city}
                          onChange={setField("city")}
                          error={state.errors?.city}
                          autoComplete="address-level2"
                          colSpan={3}
                        />
                        <FieldRow
                          k="region"
                          label="region / state"
                          value={values.region}
                          onChange={setField("region")}
                          error={state.errors?.region}
                          autoComplete="address-level1"
                          colSpan={2}
                        />
                        <FieldRow
                          k="postalCode"
                          label="postal"
                          value={values.postalCode}
                          onChange={setField("postalCode")}
                          error={state.errors?.postalCode}
                          autoComplete="postal-code"
                          colSpan={1}
                        />
                        <FieldRow
                          k="country"
                          label="cc (ISO α-2)"
                          value={values.country}
                          onChange={(v) => setField("country")(v.toUpperCase())}
                          error={state.errors?.country}
                          autoComplete="country"
                          maxLength={2}
                          placeholder="US"
                          colSpan={2}
                        />
                      </FieldGrid>
                    )}
                    {p.code === "04" && (
                      <NotesField
                        value={values.comments}
                        onChange={setField("comments")}
                        error={state.errors?.comments}
                      />
                    )}
                  </Panel>
                ))}

                {state.status === "error" && state.message ? (
                  <p
                    className="border-l-2 pl-4 text-[0.95rem]"
                    style={{ borderColor: WARN, color: WARN, fontFamily: "var(--font-mono)" }}
                  >
                    {state.message}
                  </p>
                ) : null}

                <div
                  className="relative overflow-hidden border p-6"
                  style={{
                    borderColor: GRID,
                    background: `linear-gradient(180deg, ${PANEL} 0%, ${PANEL_2} 100%)`,
                  }}
                >
                  <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
                  <div
                    className="mb-4 text-[10.5px] tracking-[0.22em] uppercase"
                    style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                  >
                    // commit
                  </div>
                  <button
                    type="submit"
                    disabled={pending}
                    className="group relative flex w-full items-center justify-between border px-6 py-5 text-left transition-all disabled:opacity-60 hover:bg-[#0A1410]"
                    style={{
                      borderColor: BRAND,
                      fontFamily: "var(--font-mono)",
                      color: BRAND,
                    }}
                  >
                    <span className="text-[1rem]">
                      <span style={{ color: HOT }}>{pending ? "$" : ">"}</span>{" "}
                      commit{" "}
                      <span style={{ color: TEXT }}>--batch=</span>founders{" "}
                      <span style={{ color: TEXT }}>--status=</span>pending
                    </span>
                    <span
                      className="text-[1.2rem] transition-transform group-hover:translate-x-1"
                      style={{ color: pending ? WARN : HOT }}
                    >
                      {pending ? "···" : "↵"}
                    </span>
                  </button>
                  <p
                    className="mt-3 text-[10.5px] tracking-[0.16em] uppercase"
                    style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                  >
                    response &lt; 2 working days · no marketing list · TLS 1.3
                  </p>
                </div>
              </form>
            </div>

            <aside className="col-span-12 lg:col-span-4">
              <Telemetry
                sessionId={sessionId}
                now={now}
                values={values}
                errors={state.errors}
              />
            </aside>
          </div>
        )}
      </section>

      <footer
        className="relative z-10 mx-auto flex max-w-[92rem] flex-col gap-3 border-t px-6 pb-10 pt-6 text-[10.5px] tracking-[0.22em] uppercase md:flex-row md:items-center md:justify-between md:px-10"
        style={{ borderColor: GRID, color: MUTED, fontFamily: "var(--font-mono)" }}
      >
        <span>© 2026 Reacgen Biosystems · ODX-1</span>
        <span>probe@reacgen.bio</span>
        <Link href="/v2">← back to instrument</Link>
      </footer>
    </div>
  );
}

function BackdropGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        opacity: 0.45,
      }}
    />
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  }[pos];
  return (
    <span
      aria-hidden
      className={`absolute size-3 ${cls}`}
      style={{ borderColor: BRAND }}
    />
  );
}

function Panel({
  code,
  title,
  optional,
  valid,
  total,
  children,
}: {
  code: string;
  title: string;
  optional?: boolean;
  valid: number;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <section
      className="relative border"
      style={{
        borderColor: GRID,
        background: `linear-gradient(180deg, ${PANEL} 0%, ${PANEL_2} 100%)`,
      }}
    >
      <Corner pos="tl" />
      <Corner pos="br" />
      <header
        className="flex flex-wrap items-baseline justify-between gap-y-2 border-b px-6 py-3 text-[10.5px] tracking-[0.22em] uppercase"
        style={{ borderColor: GRID, fontFamily: "var(--font-mono)" }}
      >
        <div className="flex items-baseline gap-3">
          <span style={{ color: BRAND }}>// {code}</span>
          <span style={{ color: TEXT }}>/ {title}</span>
          {optional ? <span style={{ color: MUTED }}>· optional</span> : null}
        </div>
        <span style={{ color: MUTED }}>
          {valid}/{total} <span style={{ color: BRAND }}>●</span>
        </span>
      </header>
      <div className="px-6 py-7">{children}</div>
    </section>
  );
}

function FieldGrid({
  cols,
  children,
}: {
  cols: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid gap-x-6 gap-y-5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

function FieldRow({
  k, label, value, onChange,
  required, error, type = "text",
  autoComplete, maxLength, placeholder, colSpan = 1,
}: {
  k: FieldKey;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  colSpan?: number;
}) {
  const id = useId();
  const status = error ? "error" : value ? "filled" : "empty";
  const dotColor = status === "error" ? WARN : status === "filled" ? BRAND : DIM;
  const dotGlyph = status === "error" ? "◆" : status === "filled" ? "●" : "○";

  return (
    <div style={{ gridColumn: `span ${colSpan} / span ${colSpan}` }}>
      <label htmlFor={id} className="block">
        <div
          className="flex items-baseline justify-between gap-3 text-[10.5px] tracking-[0.18em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: MUTED }}
        >
          <span>
            <span style={{ color: BRAND, marginRight: "0.5em" }}>
              [{FIELD_CODES[k]}]
            </span>
            {label}
            {required ? <span style={{ color: HOT }}> *</span> : null}
          </span>
          <span style={{ color: dotColor }}>{dotGlyph}</span>
        </div>
        <div
          className="mt-2 flex items-stretch border transition-colors"
          style={{ borderColor: error ? WARN : status === "filled" ? BRAND : GRID }}
        >
          <span
            aria-hidden
            className="flex w-8 items-center justify-center text-[10px]"
            style={{ color: dotColor, fontFamily: "var(--font-mono)", borderRight: `1px solid ${GRID}` }}
          >
            {dotGlyph}
          </span>
          <input
            id={id}
            type={type}
            name={k}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            maxLength={maxLength}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="w-full bg-transparent px-3 py-2.5 text-[0.95rem] outline-none"
            style={{ fontFamily: "var(--font-mono)", color: TEXT }}
          />
        </div>
        {error ? (
          <p
            className="mt-1 text-[10.5px] tracking-[0.18em] uppercase"
            style={{ color: WARN, fontFamily: "var(--font-mono)" }}
          >
            ! {error}
          </p>
        ) : null}
      </label>
    </div>
  );
}

function NotesField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = useId();
  const lines = Math.max(8, value.split("\n").length + 1);
  const lineNumbers = useMemo(
    () => Array.from({ length: lines }, (_, i) => String(i + 1).padStart(2, "0")).join("\n"),
    [lines],
  );

  return (
    <div>
      <label htmlFor={id} className="block">
        <div
          className="mb-2 flex items-baseline justify-between text-[10.5px] tracking-[0.18em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: MUTED }}
        >
          <span>
            <span style={{ color: BRAND, marginRight: "0.5em" }}>
              [{FIELD_CODES.comments}]
            </span>
            questions · intended application · anything we should know
          </span>
          <span style={{ color: value ? BRAND : DIM }}>
            {value.length}/4000
          </span>
        </div>
        <div
          className="flex border transition-colors"
          style={{ borderColor: error ? WARN : value ? BRAND : GRID }}
        >
          <pre
            aria-hidden
            className="m-0 px-3 py-3 text-right text-[0.85rem] leading-[1.6] select-none"
            style={{
              color: DIM,
              fontFamily: "var(--font-mono)",
              borderRight: `1px solid ${GRID}`,
              background: "rgba(255,255,255,0.01)",
              whiteSpace: "pre",
            }}
          >
            {lineNumbers}
          </pre>
          <textarea
            id={id}
            name="comments"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={lines}
            maxLength={4000}
            className="flex-1 resize-none bg-transparent px-4 py-3 text-[0.95rem] leading-[1.6] outline-none"
            style={{ fontFamily: "var(--font-mono)", color: TEXT }}
          />
        </div>
      </label>
      {error ? (
        <p
          className="mt-1 text-[10.5px] tracking-[0.18em] uppercase"
          style={{ color: WARN, fontFamily: "var(--font-mono)" }}
        >
          ! {error}
        </p>
      ) : null}
    </div>
  );
}

function countValid(
  fields: FieldKey[],
  values: Record<FieldKey, string>,
  errors?: WhitelistFormState["errors"],
): number {
  return fields.filter((f) => values[f] && !errors?.[f]).length;
}

function Telemetry({
  sessionId,
  now,
  values,
  errors,
}: {
  sessionId: string;
  now: string;
  values: Record<FieldKey, string>;
  errors?: WhitelistFormState["errors"];
}) {
  const totalFields = (Object.keys(values) as FieldKey[]).length;
  const filledCount = (Object.keys(values) as FieldKey[]).filter((k) => values[k]).length;
  const errorCount = errors ? Object.keys(errors).length : 0;

  const payload = useMemo(() => {
    const clean: Record<string, unknown> = {};
    for (const k of Object.keys(values) as FieldKey[]) {
      clean[k] = values[k] || null;
    }
    return JSON.stringify(clean, null, 2);
  }, [values]);

  return (
    <div
      className="sticky top-6 space-y-4"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <TelemPanel title="// session">
        <Row k="id" v={sessionId} mono />
        <Row k="ts" v={now} mono />
        <Row k="endpoint" v="POST /api/whitelist" mono dim />
        <Row k="schema" v="v1.0.0" mono dim />
        <Row k="batch" v="founders" />
        <Row k="env" v="prod" dim />
      </TelemPanel>

      <TelemPanel title="// fields">
        <Row k="filled" v={`${filledCount}/${totalFields}`} accent={filledCount >= 3 ? BRAND : MUTED} />
        <Row k="errors" v={String(errorCount)} accent={errorCount > 0 ? WARN : BRAND} />
        <Row k="identity" v={dotsFor(["firstName", "lastName", "email"], values, errors)} mono />
        <Row k="affil" v={dotsFor(["company", "jobTitle", "phone"], values, errors)} mono />
        <Row k="shipping" v={dotsFor(["line1", "line2", "city", "region", "postalCode", "country"], values, errors)} mono />
        <Row k="notes" v={dotsFor(["comments"], values, errors)} mono />
      </TelemPanel>

      <TelemPanel title="// payload (live)">
        <pre
          className="m-0 max-h-72 overflow-auto text-[11px] leading-[1.55]"
          style={{ color: TEXT }}
        >
{payload}
        </pre>
      </TelemPanel>
    </div>
  );
}

function dotsFor(
  keys: FieldKey[],
  values: Record<FieldKey, string>,
  errors?: WhitelistFormState["errors"],
) {
  return keys
    .map((k) => (errors?.[k] ? "◆" : values[k] ? "●" : "○"))
    .join(" ");
}

function TelemPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden border"
      style={{
        borderColor: GRID,
        background: `linear-gradient(180deg, ${PANEL} 0%, ${PANEL_2} 100%)`,
      }}
    >
      <Corner pos="tl" />
      <Corner pos="br" />
      <header
        className="border-b px-4 py-2 text-[10.5px] tracking-[0.22em] uppercase"
        style={{ borderColor: GRID, color: BRAND }}
      >
        {title}
      </header>
      <div className="px-4 py-3 space-y-1.5">{children}</div>
    </div>
  );
}

function Row({
  k,
  v,
  mono,
  dim,
  accent,
}: {
  k: string;
  v: string;
  mono?: boolean;
  dim?: boolean;
  accent?: string;
}) {
  return (
    <div
      className="flex items-baseline justify-between gap-3 text-[11px] tracking-[0.04em]"
      style={{
        fontFamily: mono ? "var(--font-mono)" : undefined,
        color: dim ? MUTED : TEXT,
      }}
    >
      <span style={{ color: MUTED }}>{k}</span>
      <span style={{ color: accent ?? (dim ? MUTED : TEXT) }}>{v}</span>
    </div>
  );
}

function Console({ state }: { state: WhitelistFormState }) {
  const r = state.receipt;
  const isDup = state.status === "duplicate";

  const lines: { label: string; v: string; tone: "info" | "ok" | "warn" }[] = isDup
    ? [
        { label: "validate.identity", v: "ok", tone: "ok" },
        { label: "validate.address", v: "ok", tone: "ok" },
        { label: "upsert.user", v: "updated", tone: "info" },
        { label: "insert.whitelist_entry", v: "skipped (duplicate)", tone: "warn" },
        { label: "status", v: "already on list", tone: "warn" },
      ]
    : r
    ? [
        { label: "validate.identity", v: "ok", tone: "ok" },
        { label: "validate.address", v: "ok", tone: "ok" },
        { label: "upsert.user", v: r.userId.slice(0, 8) + "…", tone: "info" },
        { label: "insert.whitelist_entry", v: r.entryId.slice(0, 8) + "…", tone: "ok" },
        { label: "batch", v: r.batchSlug, tone: "info" },
        { label: "status", v: "pending", tone: "ok" },
        { label: "position", v: r.position ? `#${String(r.position).padStart(3, "0")}` : "—", tone: "info" },
        { label: "next", v: "await admin approval", tone: "info" },
      ]
    : [];

  const ts = r?.timestamp ?? new Date().toISOString();

  return (
    <div
      className="relative overflow-hidden border"
      style={{
        borderColor: BRAND,
        background:
          `radial-gradient(circle at 20% 0%, rgba(61,164,120,0.16) 0%, transparent 60%), ${PANEL}`,
      }}
    >
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <header
        className="flex items-center justify-between border-b px-6 py-3 text-[10.5px] tracking-[0.22em] uppercase"
        style={{ borderColor: GRID, color: MUTED, fontFamily: "var(--font-mono)" }}
      >
        <span style={{ color: BRAND }}>// commit · queue.write()</span>
        <span style={{ color: isDup ? WARN : HOT }}>
          ● {isDup ? "duplicate" : "committed"}
        </span>
      </header>

      <div
        className="space-y-1.5 px-6 py-6"
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.92rem" }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex items-baseline gap-3"
            style={{ animation: `rg-fade-up 500ms ease-out ${i * 90}ms both` }}
          >
            <span style={{ color: MUTED, minWidth: "12ch" }}>
              [{ts.slice(11, 19)}]
            </span>
            <span
              style={{
                color: line.tone === "warn" ? WARN : line.tone === "ok" ? HOT : BRAND,
                minWidth: "5ch",
              }}
            >
              {line.tone === "warn" ? "WARN" : line.tone === "ok" ? "OK  " : "INFO"}
            </span>
            <span style={{ color: TEXT }}>{line.label.padEnd(28, " ")}</span>
            <span style={{ color: MUTED }}>···</span>
            <span style={{ color: line.tone === "warn" ? WARN : BRAND }}>
              {line.v}
            </span>
          </div>
        ))}
        <div
          className="flex items-baseline gap-2 pt-3"
          style={{ animation: "rg-fade-in 700ms ease-out 900ms both" }}
        >
          <span style={{ color: HOT }}>$</span>
          <span style={{ color: TEXT }}>
            {isDup
              ? "we'll re-send your previous invite when the batch opens."
              : "saved. we'll email you when your slot opens."}
            <span
              className="ml-1 inline-block"
              style={{
                color: HOT,
                animation: "rg-fade-in 800ms ease-out 1.6s infinite alternate",
              }}
            >
              _
            </span>
          </span>
        </div>
      </div>

      <footer
        className="flex flex-wrap items-center justify-between gap-4 border-t px-6 py-4 text-[10.5px] tracking-[0.22em] uppercase"
        style={{ borderColor: GRID, color: MUTED, fontFamily: "var(--font-mono)" }}
      >
        <span>response &lt; 2 working days</span>
        <Link href="/v2">← back to instrument</Link>
      </footer>
    </div>
  );
}
