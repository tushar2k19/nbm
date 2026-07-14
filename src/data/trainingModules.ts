import plantation from "@/assets/bamboo-plantation.jpg";
import artisan from "@/assets/bamboo-artisan.jpg";
import northeast from "@/assets/bamboo-northeast.jpg";
import grove from "@/assets/bamboo-grove.jpg";

const OFFICIAL_BASE = "https://nbm.da.gov.in";

export type TrainingModulePdf = {
  id: string;
  title: string;
  pdfUrl: string;
};

export type TrainingModuleGroup = {
  id: string;
  title: string;
  shortTitle: string;
  partner: string;
  location: string;
  description: string;
  about: string;
  officialDetailsSlug: string;
  documents: TrainingModulePdf[];
  bannerImage: string;
};

export const trainingModuleGroups: TrainingModuleGroup[] = [
  {
    id: "baihar-balaghat-mp",
    title: "Bamboo Entrepreneurship Development Foundation Baihar Balaghat MP",
    shortTitle: "BEDF Baihar, Balaghat MP",
    partner: "Bamboo Entrepreneurship Development Foundation",
    location: "Baihar, Balaghat, Madhya Pradesh",
    description:
      "Entrepreneurship development, common facility centre resources and webinar series for bamboo-based enterprises in Madhya Pradesh.",
    about:
      "The Bamboo Entrepreneurship Development Foundation at Baihar, Balaghat supports farmers and micro-entrepreneurs through training flyers, expert profiles and programme catalogues aligned with the State Bamboo Mission.",
    officialDetailsSlug: "BambooEntrepreneurshipDevelopmentFoundationBaiharBalaghatMP",
    bannerImage: plantation,
    documents: [
      {
        id: "akbhattacharya-profile",
        title: "AKBhattacharya Profile Bamboo Expert 22-11-19",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/AKBhattacharya-Profile-BambooExpert-22-11-19.pdf`,
      },
      {
        id: "catalogue-baihar-cfc",
        title: "Catalogue Baihar Bamboo CFC 01-06-21",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/Catalogue-Baihar-Bamboo-CFC-01-06-21.pdf`,
      },
      {
        id: "training-program-flyer",
        title: "Training Program Baihar Flyer 24-06-21",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/Training-Program-Baihar-Flyer-24-06-21.pdf`,
      },
      {
        id: "webinar-series-flyer",
        title: "Webinar Series Bamboo Flyer 25th-June Final",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/Webinar-Series-Bamboo-Flyer-25th-June-Final.pdf`,
      },
    ],
  },
  {
    id: "nid-cs-susanth",
    title: "National Institute of Design CS SUSANTH",
    shortTitle: "NID — CS SUSANTH",
    partner: "National Institute of Design",
    location: "Ahmedabad, Gujarat",
    description:
      "Design-led bamboo product development manuals and workshop resources from NID under the Madhya Pradesh State Bamboo Mission.",
    about:
      "The National Institute of Design contributes design training manuals and JICA-supported product development workshops, equipping artisans and entrepreneurs with contemporary bamboo product skills.",
    officialDetailsSlug: "NationalInstituteofDesignCSSUSANTH",
    bannerImage: artisan,
    documents: [
      {
        id: "nid-jica-tripura",
        title: "NID JICA Product Manual Tripura Workshop",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/NID-JICA-Product-Manual-Tripura-Workshop.pdf`,
      },
      {
        id: "nid-mpsbm-manual",
        title: "NID MPSBM Design Training Manual June,2015",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/NID-MPSBM-Design-Training-Manual-June,2015.pdf`,
      },
    ],
  },
  {
    id: "necbdc",
    title: "Training Module NECBDC",
    shortTitle: "NECBDC Training Modules",
    partner: "North East Cane and Bamboo Development Council",
    location: "Guwahati, Assam",
    description:
      "Cluster development, housing, propagation and general training modules from NECBDC for the North Eastern region.",
    about:
      "NECBDC provides specialised training material covering cluster development, housing and construction applications, propagation techniques and general bamboo enterprise training for the North East.",
    officialDetailsSlug: "TrainingModuleNECBDC",
    bannerImage: northeast,
    documents: [
      {
        id: "cluster-development",
        title: "Cluster development 20210610_0001",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/clusterdevelopment_20210610_0001.pdf`,
      },
      {
        id: "housing-construction",
        title: "Housing and Construction 20210610_0001",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/housingandconstruction_20210610_0001.pdf`,
      },
      {
        id: "propagation",
        title: "Propogation 20210610_0001",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/propogationn1_20210610_0001.pdf`,
      },
      {
        id: "training-general",
        title: "Training 20210610_0001",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/training_20210610_0001.pdf`,
      },
    ],
  },
  {
    id: "icfri",
    title: "Training Module ICFRI",
    shortTitle: "ICFRI Training Modules",
    partner: "Indian Council of Forestry Research and Education",
    location: "Dehradun, Uttarakhand",
    description:
      "Forestry research institute training calendars, manuals and bamboo training modules from ICFRI and partner forest research units.",
    about:
      "ICFRI and affiliated forest research institutes publish training calendars, technical manuals and bamboo-specific training modules for field functionaries, scientists and implementing agencies.",
    officialDetailsSlug: "TrainingModuleICFRI",
    bannerImage: grove,
    documents: [
      {
        id: "fri-2020",
        title: "Fri-2020",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/fri-2020.pdf`,
      },
      {
        id: "iwst-manual",
        title: "IWST Training Manual 27 Jan - 1 Feb 2020",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/IWST-Training-Manual-27-Jan-1-Feb-2020.pdf`,
      },
      {
        id: "link-for-training",
        title: "Link for training",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/link-for-training.pdf`,
      },
      {
        id: "rfri-calendar",
        title: "RFRI Training Calender",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/RFRI-Training-Calender.pdf`,
      },
      {
        id: "tfri-module",
        title: "TFRI bamboo Training Module",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/TFRI-bamboo-Training-Module.pdf`,
      },
      {
        id: "ifp-calendar",
        title: "Training calander ifp",
        pdfUrl: `${OFFICIAL_BASE}/Documents/Training/Training-calander-ifp.pdf`,
      },
    ],
  },
];

export const trainingModuleStats = {
  programCount: trainingModuleGroups.length,
  documentCount: trainingModuleGroups.reduce((sum, g) => sum + g.documents.length, 0),
  partnerCount: trainingModuleGroups.length,
};

export const groupBannerImages: Record<string, string> = Object.fromEntries(
  trainingModuleGroups.map((g) => [g.id, g.bannerImage])
);

export function getTrainingModuleGroup(id: string): TrainingModuleGroup | undefined {
  return trainingModuleGroups.find((g) => g.id === id);
}

export const OFFICIAL_TRAINING_MODULE_URL = `${OFFICIAL_BASE}/Training-Module`;
