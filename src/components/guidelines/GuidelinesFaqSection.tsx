import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  faqByCategory,
  faqCategories,
  guidelinesFaq,
  type FaqCategory,
} from "@/data/guidelinesFaq";
import {
  CircleHelp,
  ChevronRight,
  Search,
  Sprout,
  Monitor,
  Wallet,
  Headphones,
  Phone,
  Mail,
  Info,
} from "lucide-react";

const categoryIcons: Record<FaqCategory, typeof Sprout> = {
  mission: Sprout,
  portal: Monitor,
  schemes: Wallet,
  support: Headphones,
};

function faqIdFromHash(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const hash = window.location.hash.replace("#", "");
  return hash.startsWith("faq-") ? hash.slice(4) : undefined;
}

export function GuidelinesFaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | undefined>(faqIdFromHash);

  useEffect(() => {
    const syncHash = () => setOpenFaqId(faqIdFromHash());
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const id = faqIdFromHash();
    if (!id) return;
    setActiveCategory("all");
    setQuery("");
    setOpenFaqId(id);
  }, []);

  const filteredItems = useMemo(() => {
    const byCategory = faqByCategory(activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q),
    );
  }, [activeCategory, query]);

  return (
    <section
      id="faq"
      className="scroll-mt-28 relative overflow-hidden border-t border-border bg-gradient-to-b from-secondary/70 via-secondary/40 to-background"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bamboo-texture-bg"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary shadow-soft">
              <CircleHelp className="h-3.5 w-3.5 text-saffron" aria-hidden />
              Frequently Asked Questions
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-1.5 rounded bg-saffron" />
              <h2 className="font-display text-2xl font-bold text-primary sm:text-[1.65rem]">
                Common queries about NBM &amp; this portal
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Quick answers on the Mission, scheme components, documents, dashboards and how to
              get help — curated for citizens, farmers and implementing agencies.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search FAQ"
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm shadow-soft outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "border border-border bg-card text-muted-foreground hover:border-primary/25 hover:text-primary"
            }`}
          >
            All ({guidelinesFaq.length})
          </button>
          {faqCategories.map((cat) => {
            const count = guidelinesFaq.filter((f) => f.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/25 hover:text-primary"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            {filteredItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card/80 px-6 py-10 text-center">
                <p className="text-sm font-medium text-foreground">No matching questions</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a different keyword or category filter.
                </p>
              </div>
            ) : (
              <Accordion
                type="single"
                collapsible
                value={openFaqId}
                onValueChange={setOpenFaqId}
                className="space-y-3"
              >
                {filteredItems.map((item, idx) => {
                  const Icon = categoryIcons[item.category];
                  const categoryLabel =
                    faqCategories.find((c) => c.id === item.category)?.label ?? item.category;

                  return (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      id={`faq-${item.id}`}
                      className="scroll-mt-28 overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-card"
                      style={{ animationDelay: `${idx * 35}ms` }}
                    >
                      <AccordionTrigger className="group px-5 py-4 hover:no-underline hover:bg-secondary/40 [&[data-state=open]]:bg-primary [&[data-state=open]]:text-primary-foreground">
                        <span className="flex items-start gap-3 text-left">
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-data-[state=open]:bg-primary-foreground/15 group-data-[state=open]:text-primary-foreground">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1 pr-2">
                            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-saffron group-data-[state=open]:text-accent-warm-on-dark">
                              {categoryLabel}
                            </span>
                            <span className="block text-sm font-semibold leading-snug sm:text-[0.95rem]">
                              {item.question}
                            </span>
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 pt-1 sm:pl-[4.25rem]">
                        <p className="text-sm leading-relaxed text-foreground/90">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>

          <aside className="space-y-5">
            <div className="sticky top-4 space-y-5">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-3 text-sm font-semibold text-primary">Jump to a question</h3>
                <ul className="max-h-[280px] space-y-1 overflow-y-auto pr-1">
                  {filteredItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#faq-${item.id}`}
                        className="flex items-start gap-1.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        <ChevronRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                        <span className="line-clamp-2">{item.question}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-primary/15 bg-primary p-5 text-primary-foreground shadow-card">
                <h3 className="text-sm font-semibold">Need more help?</h3>
                <p className="mt-2 text-xs leading-relaxed text-primary-foreground/85">
                  Our helpline can guide you on schemes, documents and portal navigation.
                </p>
                <a
                  href="tel:18001801551"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-accent-warm-on-dark hover:opacity-90"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  1800-180-1551
                </a>
                <a
                  href="mailto:nbm-agri@gov.in"
                  className="mt-2 inline-flex items-center gap-2 text-xs text-primary-foreground/90 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  nbm-agri@gov.in
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-2 text-sm font-semibold text-primary">Related pages</h3>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:text-saffron"
                    >
                      About NBM <ChevronRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/knowledge-center"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:text-saffron"
                    >
                      Knowledge Center <ChevronRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact/head-quarter"
                      className="inline-flex items-center gap-1 font-medium text-primary hover:text-saffron"
                    >
                      Contact headquarters <ChevronRight className="h-3 w-3" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-card/80 px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Answers on this page are for general orientation. For legally binding terms, subsidy
            rates and application procedures, always refer to the latest operational guidelines and
            cost norms available in the document sections above.
          </p>
        </div>
      </div>
    </section>
  );
}
