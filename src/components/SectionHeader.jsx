export default function SectionHeader({ label, title, subtitle, centered = false }) {
  return (
    <div className={`space-y-3 ${centered ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="section-label">{label}</span>
        <div className="h-px flex-1 max-w-14" style={{ background: "var(--border-mid)" }} />
      </div>
      {title && (
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight"
          style={{ color: "var(--text)" }}
          dangerouslySetInnerHTML={{ __html: title }} />
      )}
      {subtitle && (
        <p 
          // Added a conditional mx-auto right here!
          className={`text-sm max-w-xl ${centered ? "mx-auto" : ""}`} 
          style={{ color: "var(--text-muted)", lineHeight: 1.75, fontFamily: "var(--font-body)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}