import type { LucideIcon } from "lucide-react";

type FooterKpiCardProps = {
  label: string;
  value: string;
  sub: string;
  icon?: LucideIcon;
  href?: string;
};

export function FooterKpiCard({ label, value, sub, icon: Icon, href }: FooterKpiCardProps) {
  const content = (
    <>
      <p className="footer-eyebrow mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/55">
        {label}
      </p>
      <p className="footer-kpi-value text-gradient-mitra font-display font-bold">
        {value}
      </p>
      <p className="mt-1 text-[10px] text-white/50">{sub}</p>
    </>
  );

  if (href) {
    return (
      <a href={href} className="footer-kpi-card block">
        <div className="mb-1.5 flex items-center gap-1.5">
          {Icon && <Icon className="h-3.5 w-3.5 text-amber/90" aria-hidden />}
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/55">{label}</span>
        </div>
        <p className="footer-kpi-value text-gradient-mitra font-display font-bold">{value}</p>
        <p className="mt-1 text-[10px] text-white/50">{sub}</p>
      </a>
    );
  }

  return <div className="footer-kpi-card">{content}</div>;
}
