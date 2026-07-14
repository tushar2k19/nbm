/** Enabling provisions — sourced from nbm.da.gov.in/Enabling-Provisions */

export type EnablingProvision = {
  id: string;
  srNo: number;
  description: string;
  pdfUrl?: string;
};

const NBM_OFFICIAL = "https://nbm.da.gov.in";

export const enablingProvisions: EnablingProvision[] = [
  {
    id: "agarbatti-import-restriction",
    srNo: 1,
    description: "Agarbatti Import Restriction Notification of DGFT",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/AgarbattiImportRestrictionNotificationofDGFT.pdf`,
  },
  {
    id: "ifa-amendment",
    srNo: 2,
    description:
      "Sec 2 (7) of the Indian Forest Act, 1927 amended to omit bamboo outside the forest from the definition of tree.",
  },
  {
    id: "states-exempted-felling-transit",
    srNo: 3,
    description: "22 States/UTs have exempted bamboo from felling-transit rules.",
  },
  {
    id: "pan-india-transit",
    srNo: 4,
    description:
      "MoEFCC directions to States/UTs for issue of Pan India Card/transit permit for inter State movement of bamboo throughout the country.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Pan_India_Transit_for_bamboo.pdf`,
  },
  {
    id: "iso-nbc-standards",
    srNo: 5,
    description: "ISO 2004 and National Building Code 2016 standards prescribed.",
  },
  {
    id: "cpwd-sor",
    srNo: 6,
    description: "Bamboo material included in SOR of CPWD.",
  },
  {
    id: "ne-industrial-policy",
    srNo: 7,
    description: "NE Industrial Development Policy, 2017.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/NE_Industrial_Development_Policy.pdf`,
  },
  {
    id: "bis-bamboo-mat-products",
    srNo: 8,
    description:
      'Adoption of "BIS Certified & Energy Efficient" Bamboo Mat Based Products in projects/ construction works in all the Hilly Areas and sloped roof.',
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/MinistryofTourism_GoIAdvisory.pdf`,
  },
  {
    id: "felling-transit-non-forest",
    srNo: 9,
    description:
      "Guidelines for Felling and Transit Regulations for Tree Species Grown on Non-Forest/Private Lands.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Guidelines_for_Felling_and_Transit_of_trees_species.pdf`,
  },
  {
    id: "primary-processing-license",
    srNo: 10,
    description: "Clarification on requirement of licenses for primary processing of bamboo units.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Clarification_exemption_of_primary_processing_unit_on_Bamboo_from_license.pdf`,
  },
  {
    id: "royalty-finished-products",
    srNo: 11,
    description: "Royalty on home grown bamboo and transit permit on finished bamboo products.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Royalty_and_bamboo_finished_product.pdf`,
  },
  {
    id: "exempt-bamboo-units-licensing",
    srNo: 12,
    description:
      "All State/UTs Government to consider exempting units which are exclusively using bamboo as raw material from obtaining license/NoC from Forest Department.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Consider_exempting_bamboo_units_from_licensing.pdf`,
  },
  {
    id: "regulatory-barriers-removal",
    srNo: 13,
    description:
      "Relaxation/removal of regulatory barriers in production, transit, marketing and processing of bamboo across the country.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Removing_regulatory_barriers_in_production_felling_transit_processing_and_marketing_of_bamboo.pdf`,
  },
  {
    id: "assam-forest-regulation-2018",
    srNo: 14,
    description: "THE ASSAM FOREST REGULATION (AMENDMENT) ACT,2018.",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/AFR_Act_2018_Bamboo.pdf`,
  },
  {
    id: "tripura-forest-transit-2019",
    srNo: 15,
    description: "The Tripura Forest Transit (5th Amendment) Rules, 2019",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/TFT_Rule_2019.pdf`,
  },
  {
    id: "tripura-export-duty",
    srNo: 16,
    description: "Revised export duty on export of green bamboo outside State, Tripura",
    pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/export_of_green_bamboo_outside_State_Tripura.pdf`,
  },
];

export const enablingProvisionsStats = {
  total: enablingProvisions.length,
  pdfCount: enablingProvisions.filter((p) => p.pdfUrl).length,
};
