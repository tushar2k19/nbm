/** Official DO letters — sourced from nbm.da.gov.in/Letters */

export type NbmLetter = {
  id: string;
  /** Description text as shown on the official portal */
  title: string;
  /** Issue date as shown on the official portal */
  date: string;
  pdfUrl: string;
};

const NBM_OFFICIAL = "https://nbm.da.gov.in";

/** Four letters listed on the official Letters page (newest first). */
export const nbmLetters: NbmLetter[] = [
  {
    id: "tech-committee-ii-2019",
    date: "4th June 2019",
    title:
      "Re-constitution of Technical Committee II under the National Bamboo Mission (NBM)- reg.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/Letters/RevisedTechCommitteeIIJune2019.pdf`,
  },
  {
    id: "credit-linked-subsidy-2019",
    date: "24th May 2019",
    title: "Guidelines for Credit Linked Back Ended Subsidy under NBM - Reg.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/Letters/Guidelines_for_Credit_Linked.pdf`,
  },
  {
    id: "procurement-pmayg-2018",
    date: "10th Dec 2018",
    title: "Procurement of Bamboo by States/UTs for use in PMAY-G Construction-Reg.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/Letters/Procurement_of_Bamboo.pdf`,
  },
  {
    id: "bis-bamboo-mat-2018",
    date: "15th May 2018",
    title:
      'Adoption of "BIS Certified & Energy Efficient" Bamboo Mat Based Products in projects/ construction works in all the Hilly Areas and sloped roof.',
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/MinistryofTourism_GoIAdvisory.pdf`,
  },
];

export const nbmLettersStats = {
  total: nbmLetters.length,
};
