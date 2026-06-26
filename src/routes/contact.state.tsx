import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { stateContacts } from "@/data/contacts";
import { MapPin, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/contact/state")({
  head: () => ({
    meta: [
      { title: "State Contacts — National Bamboo Mission" },
      {
        name: "description",
        content:
          "State-wise Mission Directors, nodal officers and concerned staff for the National Bamboo Mission across India.",
      },
    ],
  }),
  component: StateContactsPage,
});

function StateContactsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stateContacts;
    return stateContacts.filter(
      (row) =>
        row.stateName.toLowerCase().includes(q) ||
        row.missionDirector.toLowerCase().includes(q) ||
        row.concernedOfficer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHero
        title="State Contacts"
        subtitle="State Mission Directors, nodal officers and concerned staff for National Bamboo Mission implementation."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Sub-nav tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            to="/contact/head-quarter"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
          >
            Head Quarter
          </Link>
          <Link
            to="/contact/state"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground"
          >
            State
          </Link>
          <Link
            to="/rti"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
          >
            RTI
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-5 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-saffron" />
                <div>
                  <h2 className="font-semibold text-primary text-sm sm:text-base">
                    State Contacts
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {filtered.length} of {stateContacts.length} entries
                  </p>
                </div>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search state or officer…"
                  className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap w-40">
                    State Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold min-w-[320px]">
                    State Mission Director / Nodal Officer (NBM)
                  </th>
                  <th className="text-left px-4 py-3 font-semibold min-w-[240px]">
                    Concerned Officer / Staff
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
                      No contacts found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, idx) => (
                    <tr
                      key={row.stateName}
                      className={`border-b border-border align-top transition-colors hover:bg-primary/5 ${
                        idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                      }`}
                    >
                      <td className="px-4 py-3.5 font-semibold text-primary whitespace-nowrap align-top">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-saffron shrink-0" />
                          {row.stateName}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-foreground/90 leading-relaxed text-xs sm:text-sm">
                        {row.missionDirector}
                      </td>
                      <td className="px-4 py-3.5 text-foreground/90 leading-relaxed text-xs sm:text-sm">
                        {row.concernedOfficer || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground text-center">
          Source: National Bamboo Mission official state contact directory. Information is
          indicative for prototype purposes.
        </p>
      </section>
    </>
  );
}
