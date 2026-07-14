/** Annual Action Plan archive — sourced from nbm.da.gov.in/AAP (Archive tab) */

export type AnnualActionPlanEntry = {
  id: string;
  financialYear: string;
  pdfUrl: string;
};

const NBM_OFFICIAL = "https://nbm.da.gov.in";

/** Financial years listed on the official portal Archive tab (newest first). */
export const annualActionPlanArchive: AnnualActionPlanEntry[] = [
  { id: "aap-2020-21", financialYear: "2020-21", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2020-21.pdf` },
  { id: "aap-2019-20", financialYear: "2019-20", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2019-20.pdf` },
  { id: "aap-2018-19", financialYear: "2018-19", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2018-19.pdf` },
  { id: "aap-2015-16", financialYear: "2015-16", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2015-16.pdf` },
  { id: "aap-2014-15", financialYear: "2014-15", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2014-15.pdf` },
  { id: "aap-2013-14", financialYear: "2013-14", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2013-14.pdf` },
  { id: "aap-2012-13", financialYear: "2012-13", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2012-13.pdf` },
  { id: "aap-2011-12", financialYear: "2011-12", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2011-12.pdf` },
  { id: "aap-2010-11", financialYear: "2010-11", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2010-11.pdf` },
  { id: "aap-2009-10", financialYear: "2009-10", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2009-10.pdf` },
  { id: "aap-2008-09", financialYear: "2008-09", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2008-09.pdf` },
  { id: "aap-2007-08", financialYear: "2007-08", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2007-08.pdf` },
  { id: "aap-2006-07", financialYear: "2006-07", pdfUrl: `${NBM_OFFICIAL}/Documents/AAP/2006-07.pdf` },
];

export const annualActionPlanStats = {
  total: annualActionPlanArchive.length,
};

/** Items shown in header mega-menu preview (full list on /reports page). */
export const annualActionPlanMenuPreviewCount = 4;
