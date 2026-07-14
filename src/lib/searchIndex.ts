import { newsItems } from "@/data/news";
import { guidelineSections } from "@/data/guidelinesDocuments";
import { enablingProvisions } from "@/data/enablingProvisions";
import { nbmLetters } from "@/data/nbmLetters";
import { allReportSections } from "@/data/reportsDocuments";
import { vacancies, tenders } from "@/data/tendersVacancies";
import { stateContacts } from "@/data/contacts";
import { researchPapers } from "@/data/researchPapers";
import { stateMissionRows } from "@/data/stateMission";
import { nbmStructurePageTitle } from "@/data/nbmStructure";
import {
  implementingStatesOfficial,
  IMPLEMENTING_STATES_OFFICIAL_COUNT,
} from "@/data/implementingStates";
import {
  trainingModuleGroups,
  trainingModuleStats,
} from "@/data/trainingModules";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  url: string;
  category:
    | "News & Press"
    | "Guidelines"
    | "Reports"
    | "Tenders / Vacancies"
    | "Contacts"
    | "Research"
    | "Training";
};

function tokenise(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

export function scoreMatch(result: SearchResult, query: string): number {
  const q = tokenise(query);
  const terms = q.split(/\s+/).filter(Boolean);
  if (!terms.length) return 0;
  const haystack = tokenise(`${result.title} ${result.description}`);
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 2;
    if (tokenise(result.title).includes(term)) score += 3;
  }
  return score;
}

const newsResults: SearchResult[] = newsItems.map((n) => ({
  id: `news-${n.id}`,
  title: n.title,
  description: `${n.tag} · ${n.date} — ${n.excerpt}`,
  url: `/news/${n.id}`,
  category: "News & Press",
}));

const guidelineResults: SearchResult[] = guidelineSections.flatMap((sec) =>
  sec.items.map((d) => ({
    id: `guideline-${d.id}`,
    title: d.title,
    description: `${sec.title} · ${d.description}`,
    url: `/guidelines#${sec.id}-${d.id}`,
    category: "Guidelines" as const,
  }))
);

const enablingProvisionsHubResult: SearchResult = {
  id: "enabling-provisions-hub",
  title: "Enabling Provisions",
  description: `${enablingProvisions.length} regulatory provisions · official PDF notifications on nbm.da.gov.in`,
  url: "/guidelines#enabling-provisions",
  category: "Guidelines" as const,
};

const enablingProvisionResults: SearchResult[] = enablingProvisions.map((p) => ({
  id: `enabling-provision-${p.id}`,
  title: p.description,
  description: `Enabling Provision ${p.srNo}${p.pdfUrl ? " · PDF" : ""}`,
  url: `/guidelines/enabling-provisions#${p.id}`,
  category: "Guidelines" as const,
}));

const letterResults: SearchResult[] = nbmLetters.map((letter) => ({
  id: `letter-${letter.id}`,
  title: letter.title,
  description: `Letters · ${letter.date}`,
  url: `/guidelines#letters-${letter.id}`,
  category: "Guidelines" as const,
}));

const reportResults: SearchResult[] = allReportSections.flatMap((sec) =>
  sec.items.map((i) => ({
    id: `report-${i.id}`,
    title: i.title,
    description: `${sec.title} · ${i.description}`,
    url: `/reports#${sec.id}-${i.id}`,
    category: "Reports" as const,
  }))
);

const tenderResults: SearchResult[] = [
  ...vacancies.map((v) => ({
    id: `vacancy-${v.id}`,
    title: v.title,
    description: `Vacancy · Closing ${v.endDate} · ${v.documentSize}`,
    url: "/tenders-vacancies",
    category: "Tenders / Vacancies" as const,
  })),
  ...tenders.map((t) => ({
    id: `tender-${t.id}`,
    title: t.title,
    description: `Tender · Closing ${t.endDate} · ${t.documentSize}`,
    url: "/tenders-vacancies",
    category: "Tenders / Vacancies" as const,
  })),
];

const contactResults: SearchResult[] = stateContacts.map((c) => ({
  id: `contact-${c.stateName}`,
  title: `${c.stateName} — State Contact`,
  description: `${c.missionDirector}${c.concernedOfficer ? ` · ${c.concernedOfficer}` : ""}`,
  url: "/contact/state",
  category: "Contacts" as const,
}));

const researchResults: SearchResult[] = researchPapers.map((p) => ({
  id: `research-${p.id}`,
  title: p.title,
  description: `${p.author} · ${p.date} · ${p.fileSize}`,
  url: `/knowledge-center/research-papers#${p.id}`,
  category: "Research" as const,
}));

const stateMissionHubResult: SearchResult = {
  id: "state-mission-hub",
  title: "State Mission",
  description: `${stateMissionRows.length} implementing states · SLEC PDF documents and production data`,
  url: "/knowledge-center/state-mission",
  category: "Research" as const,
};

const stateMissionResults: SearchResult[] = stateMissionRows.map((row) => ({
  id: `state-mission-${row.id}`,
  title: `${row.stateName} — State Mission`,
  description: `${row.nodalDepartment} · ${row.missionDirector}`,
  url: `/knowledge-center/state-mission#${row.id}`,
  category: "Research" as const,
}));

const structureResult: SearchResult = {
  id: "nbm-structure",
  title: nbmStructurePageTitle,
  description:
    "National, State and District governance — Executive Committee, NBMC, BTSG, SLEC, BDA",
  url: "/contact/structure",
  category: "Contacts" as const,
};

const implementingStatesHubResult: SearchResult = {
  id: "implementing-states-hub",
  title: "Implementing States",
  description: `${IMPLEMENTING_STATES_OFFICIAL_COUNT} States implementing the National Bamboo Mission · state map gallery`,
  url: "/implementing-states",
  category: "Contacts" as const,
};

const implementingStateResults: SearchResult[] = implementingStatesOfficial.map((s) => ({
  id: `implementing-state-${s.id}`,
  title: `${s.name} — NBM Implementing State`,
  description: s.tagline,
  url: `/implementing-states#state-${s.id}`,
  category: "Contacts" as const,
}));

const trainingHubResult: SearchResult = {
  id: "training-hub",
  title: "Training Modules",
  description: `${trainingModuleStats.programCount} partner programmes · ${trainingModuleStats.documentCount} official PDF documents`,
  url: "/training-module",
  category: "Training",
};

const trainingGroupResults: SearchResult[] = trainingModuleGroups.map((g) => ({
  id: `training-group-${g.id}`,
  title: g.title,
  description: `${g.partner} · ${g.location} · ${g.documents.length} PDFs`,
  url: `/training-module/${g.id}`,
  category: "Training" as const,
}));

const trainingDocResults: SearchResult[] = trainingModuleGroups.flatMap((g) =>
  g.documents.map((d) => ({
    id: `training-doc-${d.id}`,
    title: d.title,
    description: `${g.shortTitle} · Training module PDF`,
    url: `/training-module/${g.id}`,
    category: "Training" as const,
  }))
);

export const searchIndex: SearchResult[] = [
  ...newsResults,
  ...guidelineResults,
  ...letterResults,
  enablingProvisionsHubResult,
  ...enablingProvisionResults,
  ...reportResults,
  ...tenderResults,
  ...contactResults,
  structureResult,
  implementingStatesHubResult,
  ...implementingStateResults,
  ...researchResults,
  stateMissionHubResult,
  ...stateMissionResults,
  trainingHubResult,
  ...trainingGroupResults,
  ...trainingDocResults,
];

export function searchSite(query: string, limit = 40): SearchResult[] {
  const q = query.trim();
  if (!q || q.length < 2) return [];
  return searchIndex
    .map((r) => ({ result: r, score: scoreMatch(r, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ result }) => result);
}

export const SEARCH_CATEGORIES = [
  "News & Press",
  "Guidelines",
  "Reports",
  "Tenders / Vacancies",
  "Contacts",
  "Research",
  "Training",
] as const;
