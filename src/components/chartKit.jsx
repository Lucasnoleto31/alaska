// Peças visuais comuns dos painéis de gráfico.

export function TooltipBox({ title, rows }) {
  return (
    <div className="float min-w-44 px-3.5 py-3">
      <p className="mb-2 text-footnote text-muted">{title}</p>
      <dl className="flex flex-col gap-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-6">
            <dt className="text-footnote text-muted">{r.label}</dt>
            <dd className={`text-footnote font-semibold tabular-nums ${r.className || 'text-foreground'}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function PanelHeader({ title, caption, aside, asideCaption, asideClassName = '' }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4 md:mb-5">
      <div className="min-w-0">
        <h2 className="text-headline font-semibold">{title}</h2>
        {caption && <p className="mt-0.5 text-footnote text-muted">{caption}</p>}
      </div>
      {aside && (
        <div className="shrink-0 text-right">
          <p className={`text-headline font-semibold tabular-nums ${asideClassName}`}>{aside}</p>
          {asideCaption && <p className="mt-0.5 text-footnote text-muted">{asideCaption}</p>}
        </div>
      )}
    </div>
  )
}
