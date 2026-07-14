import grove from "@/assets/bamboo-grove.jpg";
import northeast from "@/assets/bamboo-northeast.jpg";
import artisan from "@/assets/bamboo-artisan.jpg";
import agarbatti from "@/assets/bamboo-agarbatti.jpg";
import plantation from "@/assets/bamboo-plantation.jpg";
import farmer from "@/assets/bamboo-farmer.jpg";

const OFFICIAL_BASE = "https://nbm.da.gov.in";

export type SuccessStoryPdf = {
  id: string;
  title: string;
  pdfUrl: string;
};

export type SuccessStoryPdfGroup = {
  id: string;
  title: string;
  subtitle: string;
  state: string;
  stories: SuccessStoryPdf[];
};

export type SuccessStoryVideo = {
  id: string;
  title: string;
  subtitle: string;
  state: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoSrc: string;
};

export const successStoryPdfGroups: SuccessStoryPdfGroup[] = [
  {
    id: "madhya-pradesh",
    title: "Madhya Pradesh State Bamboo Mission",
    subtitle: "Bamboo plantation brings hope — farmer livelihoods and common facility centres",
    state: "Madhya Pradesh",
    stories: [
      {
        id: "mp-farmers-income",
        title: "Double the farmers' income through cultivation of bamboo",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-MPSBMDoublethefarmers'incomethroughcultivationofbamboo.pdf`,
      },
      {
        id: "mp-baihar-cfc",
        title: "Success story of the Common Facility Centre, Baihar",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-MPSBMSuccessstoryoftheCommonfacilitycentre,Baihar.pdf`,
      },
      {
        id: "mp-farmer-hope",
        title: "Farmer taking up bamboo cultivation will never have to succumb to suicide",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-MPSBMFarmertakingupBamboocultivationwillneverhavesccumbtosucide.pdf`,
      },
      {
        id: "mp-sundrel",
        title: "Sundrel ki pahadi par baans ki hari bhoomi",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-MPSBMSundrelkipahadiparbaanskiharibhoomi.pdf`,
      },
    ],
  },
  {
    id: "maharashtra",
    title: "Maharashtra State Bamboo Mission",
    subtitle: "Multi-sectoral growth of bamboo — agarbatti, institutes and board activities",
    state: "Maharashtra",
    stories: [
      {
        id: "mh-gadchiroli-gap",
        title: "Gadchiroli Agarbatti Project (GAP) Maharashtra — Success Story",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-GadchiroliAgarbattiProject(GAP)Maharashtra-SuccessStory.pdf`,
      },
      {
        id: "mh-mbdb-2019",
        title: "MBDB Activity in 2019–20",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-MBDBActivityin2019-20.pdf`,
      },
      {
        id: "mh-lit",
        title: "Laxminarayan Institute of Technology",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SS-LAXMINARAYANINSTITUTEOFTECHNOLOGY.pdf`,
      },
    ],
  },
  {
    id: "assam",
    title: "State Bamboo Development Agency, Assam",
    subtitle: "Bamboo with a large root system — green economy and value chain development",
    state: "Assam",
    stories: [
      {
        id: "as-sbda",
        title: "Success Stories SBDA, Assam",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/SuceessStoriesSBDA,Assam.pdf`,
      },
    ],
  },
  {
    id: "others",
    title: "Other Success Stories",
    subtitle: "Markets, silvipasture systems and bamboo festivals across India",
    state: "Pan-India",
    stories: [
      {
        id: "ot-vairagi-market",
        title: "180 years old Vairagi Bamboo Market in Karnataka",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/180_years_in_Bamboo_Business.pdf`,
      },
      {
        id: "ot-silvipasture",
        title:
          "Bamboo and Anjan Grass Based Silvipasture System Enhanced the Productivity of Ravines",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/Success_Story_Bamboo_ICAR.pdf`,
      },
      {
        id: "ot-kerala-fest",
        title: "Kerala Bamboo Fests",
        pdfUrl: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/Kerala_Bamboo_Fest.pdf`,
      },
    ],
  },
];

export const successStoryVideos: SuccessStoryVideo[] = [
  {
    id: "assam-green-economy",
    title: "State Bamboo Development Agency — Mission towards Green Economy",
    subtitle: "Assam SBDA",
    state: "Assam",
    duration: "5:23",
    description:
      "Documentary on how the State Bamboo Development Agency in Assam is building a green bamboo economy through nurseries, organised cultivation and industry linkages.",
    thumbnail: grove,
    videoSrc: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/MissiontowardsGreenEconomy.mp4`,
  },
  {
    id: "assam-epch-training",
    title: "Product Development Programme by EPCH — SBDA",
    subtitle: "Export Promotion Council for Handicrafts",
    state: "Assam",
    duration: "1:10",
    description:
      "Training and product development initiative for bamboo artisans under the EPCH–SBDA partnership, strengthening handicraft value chains.",
    thumbnail: artisan,
    videoSrc: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/training_1.mp4`,
  },
  {
    id: "assam-skill-highlights",
    title: "SBDA Skill Development & Processing Highlights",
    subtitle: "Assam SBDA",
    state: "Assam",
    duration: "0:32",
    description:
      "Field glimpses of bamboo processing and skill development activities supported by the State Bamboo Development Agency, Assam.",
    thumbnail: northeast,
    videoSrc: `${OFFICIAL_BASE}/Documents/pdf/SuccessStories/training_2.mp4`,
  },
];

export const successStoryStats = {
  pdfCount: successStoryPdfGroups.reduce((n, g) => n + g.stories.length, 0),
  videoCount: successStoryVideos.length,
  stateCount: new Set([
    ...successStoryPdfGroups.map((g) => g.state),
    ...successStoryVideos.map((v) => v.state),
  ]).size,
};

/** Thumbnails mapped to PDF groups for visual variety */
export const groupAccentImages: Record<string, string> = {
  "madhya-pradesh": plantation,
  maharashtra: agarbatti,
  assam: grove,
  others: farmer,
};
