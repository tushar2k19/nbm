export type NewsTag = "Press Release" | "News" | "Notification" | "Event";

export type NewsItem = {
  id: string;
  date: string;
  dateISO: string;
  title: string;
  tag: NewsTag;
  excerpt: string;
  refNo: string;
  issuedBy: string;
  ministry: string;
  location?: string;
  body: string[];
  attachment?: { title: string; size: string; type: string };
};

export const newsItems: NewsItem[] = [
  {
    id: "nbm-steering-committee-fy-2026-27",
    date: "12 Jun 2026",
    dateISO: "2026-06-12",
    title: "NBM Steering Committee approves ₹420 Cr action plan for FY 2026-27",
    tag: "Press Release",
    excerpt:
      "The National Bamboo Mission Steering Committee has approved a ₹420 crore annual action plan for FY 2026-27, covering plantation, processing, skilling and market linkage components across 26 States.",
    refNo: "NBM/PR/2026/042",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    location: "New Delhi",
    body: [
      "The Steering Committee of the National Bamboo Mission (NBM) met under the chairmanship of the Secretary, Department of Agriculture & Farmers Welfare, and approved the annual action plan for FY 2026-27 with an outlay of ₹420 crore.",
      "The plan prioritises expansion of accredited nurseries, establishment of primary processing units in bamboo-rich clusters, and strengthening of market linkages for artisans and entrepreneurs. Special emphasis has been placed on the North-Eastern region and aspirational districts.",
      "State Bamboo Missions have been advised to submit Detailed Project Reports (DPRs) by 30 June 2026 for components proposed under the central share. Funds will be released in two instalments based on physical and financial progress reported through the NBM MIS portal.",
    ],
    attachment: {
      title: "Approved Action Plan FY 2026-27 — Summary",
      size: "1.2 MB",
      type: "PDF",
    },
  },
  {
    id: "pm-bamboo-technology-park-jorhat",
    date: "04 Jun 2026",
    dateISO: "2026-06-04",
    title: "Hon'ble PM inaugurates Bamboo Technology Park at Jorhat, Assam",
    tag: "News",
    excerpt:
      "Prime Minister dedicates a state-of-the-art Bamboo Technology Park in Jorhat, Assam — a major milestone for bamboo-based livelihoods and green manufacturing in the North-East.",
    refNo: "NBM/NEWS/2026/031",
    issuedBy: "Press Information Bureau",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    location: "Jorhat, Assam",
    body: [
      "Hon'ble Prime Minister Shri Narendra Modi inaugurated the Bamboo Technology Park at Jorhat, Assam, marking a significant step in India's bamboo-led bioeconomy. The facility houses treatment plants, product development labs and artisan training centres.",
      "The park is expected to benefit over 12,000 bamboo growers and 800 artisans in the region, creating direct and indirect employment across the value chain from nursery to finished products.",
      "Speaking on the occasion, officials highlighted that the park aligns with the vision of transforming bamboo from a raw material into high-value products for domestic and export markets.",
    ],
  },
  {
    id: "revised-nursery-tissue-culture-guidelines",
    date: "28 May 2026",
    dateISO: "2026-05-28",
    title: "Revised guidelines for bamboo nurseries & tissue culture units released",
    tag: "Notification",
    excerpt:
      "Updated operational guidelines for accreditation of bamboo nurseries and tissue culture laboratories have been issued, with revised quality norms and empanelment procedures.",
    refNo: "NBM/NOTIF/2026/018",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    body: [
      "The Department of Agriculture & Farmers Welfare has released revised guidelines for accreditation of bamboo nurseries and tissue culture units under the National Bamboo Mission.",
      "Key changes include updated quality standards for planting material, mandatory geo-tagging of nurseries, and a streamlined empanelment process through the NBM portal. Labs must demonstrate minimum annual production capacity and maintain genetic fidelity records.",
      "Existing accredited units are required to re-apply within 90 days of the notification. State Bamboo Missions shall conduct field verification before forwarding applications to the National Cell.",
    ],
    attachment: {
      title: "Revised Nursery & Tissue Culture Guidelines 2026",
      size: "2.4 MB",
      type: "PDF",
    },
  },
  {
    id: "international-bamboo-day-artisan-awards",
    date: "19 May 2026",
    dateISO: "2026-05-19",
    title: "International Bamboo Day 2026 — Call for entries: Artisan Awards",
    tag: "Event",
    excerpt:
      "NBM invites artisans and craft clusters to submit entries for the National Bamboo Artisan Awards 2026, to be presented on International Bamboo Day, 18 September 2026.",
    refNo: "NBM/EVT/2026/009",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    location: "Pan India",
    body: [
      "The National Bamboo Mission has announced a call for entries for the National Bamboo Artisan Awards 2026, coinciding with International Bamboo Day on 18 September 2026.",
      "Categories include traditional crafts, innovative product design, eco-friendly packaging and youth artisan excellence. Entries may be submitted through State Bamboo Missions or directly via the NBM portal by 31 July 2026.",
      "Shortlisted artisans will be invited to a national exhibition at Pragati Maidan, New Delhi, where winners will receive certificates and support for market linkage under the Mission.",
    ],
  },
  {
    id: "nbm-inbar-mou-technology-exchange",
    date: "02 May 2026",
    dateISO: "2026-05-02",
    title: "MoU signed between NBM and INBAR for technology exchange",
    tag: "News",
    excerpt:
      "National Bamboo Mission and INBAR sign MoU to facilitate international technology exchange, research collaboration and capacity building in the bamboo sector.",
    refNo: "NBM/NEWS/2026/022",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    location: "New Delhi",
    body: [
      "The National Bamboo Mission and the International Bamboo and Rattan Organisation (INBAR) have signed a Memorandum of Understanding to strengthen cooperation in bamboo research, technology transfer and capacity building.",
      "The MoU covers joint workshops, exchange visits for scientists and artisans, and pilot projects on engineered bamboo products. INBAR will support NBM in developing training modules aligned with international best practices.",
      "Both parties expressed commitment to positioning India as a global leader in sustainable bamboo value chains while preserving traditional craft knowledge.",
    ],
  },
  {
    id: "artisan-training-programme-8-states",
    date: "18 Apr 2026",
    dateISO: "2026-04-18",
    title: "New batch of Bamboo Artisan Training Programme starts in 8 states",
    tag: "Notification",
    excerpt:
      "A fresh batch of the Bamboo Artisan Training Programme commences across 8 states, targeting 2,400 artisans with skills in product design, finishing and market readiness.",
    refNo: "NBM/NOTIF/2026/011",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    body: [
      "The National Bamboo Mission has launched a new batch of the Bamboo Artisan Training Programme in Assam, Tripura, Maharashtra, Karnataka, Odisha, Madhya Pradesh, Kerala and Uttarakhand.",
      "The 45-day residential programme covers bamboo selection, treatment, tool handling, product design and basic entrepreneurship. Trainees receive a toolkit and certificate upon successful completion.",
      "State Bamboo Missions have been allocated district-wise targets. Interested artisans may apply through the respective District Bamboo Committees before 30 April 2026.",
    ],
  },
  {
    id: "accredited-tissue-culture-labs-2026-27",
    date: "05 Apr 2026",
    dateISO: "2026-04-05",
    title: "NBM releases updated list of accredited tissue culture labs 2026-27",
    tag: "Press Release",
    excerpt:
      "The National Bamboo Mission publishes the updated empanelled list of tissue culture laboratories for FY 2026-27, valid for supply of quality planting material to beneficiary farmers.",
    refNo: "NBM/PR/2026/015",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    body: [
      "The National Bamboo Mission has published the updated list of accredited tissue culture laboratories for FY 2026-27. A total of 47 labs across 14 states have been empanelled after technical evaluation.",
      "Farmers and implementing agencies must procure planting material only from labs on the accredited list to be eligible for Mission support. The list is available on the NBM portal and State Bamboo Mission websites.",
      "Labs found supplying sub-standard material will be debarred for a minimum period of two years. Grievances may be lodged through the NBM helpline or state nodal officers.",
    ],
    attachment: {
      title: "Accredited Tissue Culture Labs List 2026-27",
      size: "680 KB",
      type: "PDF",
    },
  },
  {
    id: "world-water-day-bamboo-watershed",
    date: "22 Mar 2026",
    dateISO: "2026-03-22",
    title: "World Water Day — NBM highlights bamboo's role in watershed management",
    tag: "Event",
    excerpt:
      "On World Water Day, NBM showcases bamboo plantations along water bodies and bunds as a nature-based solution for soil conservation and groundwater recharge.",
    refNo: "NBM/EVT/2026/004",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    location: "Pan India",
    body: [
      "On the occasion of World Water Day, the National Bamboo Mission highlighted the role of bamboo in watershed management and climate-resilient agriculture.",
      "Bamboo plantations along irrigation canals, riverbanks and farm bunds help reduce soil erosion, improve water retention and provide supplementary income to farmers. NBM supports such plantations under the bund and block plantation component.",
      "State-level awareness camps were organised in Assam, Meghalaya, Maharashtra and Karnataka, demonstrating best practices for integrating bamboo into watershed development programmes.",
    ],
  },
  {
    id: "bamboo-artisan-mela-pragati-maidan",
    date: "10 Mar 2026",
    dateISO: "2026-03-10",
    title: "Bamboo Artisan Mela at Pragati Maidan — 22–26 August 2026",
    tag: "Event",
    excerpt:
      "National Bamboo Artisan Mela scheduled at Pragati Maidan, New Delhi from 22 to 26 August 2026. Artisans, buyers and exporters invited to participate.",
    refNo: "NBM/EVT/2026/003",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    location: "New Delhi",
    body: [
      "The National Bamboo Mission will organise the Bamboo Artisan Mela at Pragati Maidan, New Delhi, from 22 to 26 August 2026. The event will bring together artisans, entrepreneurs, buyers and export houses on a single platform.",
      "Stall allocation will prioritise registered artisan clusters and SHGs supported under NBM. E-commerce partners and design institutes will conduct live demonstrations and buyer-seller meets.",
      "Registration opens on 1 June 2026 through the NBM portal. Early-bird registration closes on 15 July 2026.",
    ],
  },
  {
    id: "mis-portal-upgrade-beneficiary-tracking",
    date: "24 Feb 2026",
    dateISO: "2026-02-24",
    title: "NBM MIS portal upgraded with real-time beneficiary tracking",
    tag: "News",
    excerpt:
      "The NBM Management Information System has been upgraded to enable real-time tracking of beneficiary applications, fund releases and physical progress at district level.",
    refNo: "NBM/NEWS/2026/008",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    body: [
      "The National Bamboo Mission has rolled out an upgraded Management Information System (MIS) with enhanced dashboards for states, districts and beneficiaries.",
      "New features include SMS alerts on application status, geo-tagged photo uploads for plantation verification, and automated fund release triggers based on milestone completion.",
      "State nodal officers have been trained through a series of virtual workshops. User manuals and video tutorials are available on the NBM portal under the Knowledge Centre section.",
    ],
  },
  {
    id: "empanelment-tissue-culture-labs-extension",
    date: "08 Feb 2026",
    dateISO: "2026-02-08",
    title: "Empanelment of Tissue Culture Labs — last date extended to 15 July 2026",
    tag: "Notification",
    excerpt:
      "Last date for empanelment applications from tissue culture laboratories has been extended to 15 July 2026 in response to requests from several states.",
    refNo: "NBM/NOTIF/2026/004",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    body: [
      "In view of representations received from State Bamboo Missions and laboratory associations, the last date for submission of empanelment applications for tissue culture labs has been extended from 30 June 2026 to 15 July 2026.",
      "Applications must be submitted online through the NBM portal along with requisite documents as per the revised guidelines issued on 28 May 2026. Incomplete applications will not be considered.",
      "Technical evaluation will be conducted by a committee constituted by the National Cell. Empanelled labs will be notified by 31 August 2026.",
    ],
  },
  {
    id: "annual-report-fy-2024-25-released",
    date: "15 Jan 2026",
    dateISO: "2026-01-15",
    title: "NBM Annual Report FY 2024-25 released",
    tag: "Press Release",
    excerpt:
      "The National Bamboo Mission releases its Annual Report for FY 2024-25, documenting achievements in plantation, processing units, skilling and fund utilisation across implementing states.",
    refNo: "NBM/PR/2026/002",
    issuedBy: "Bamboo Mission Cell, DA&FW",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    body: [
      "The National Bamboo Mission has published its Annual Report for Financial Year 2024-25, summarising physical and financial achievements under all Mission components.",
      "Highlights include establishment of 186 new nurseries, 94 primary processing units, training of over 18,000 artisans and entrepreneurs, and release of ₹312 crore as central share to states.",
      "The report is available for download on the NBM portal and has been shared with all State Bamboo Missions for dissemination among stakeholders.",
    ],
    attachment: {
      title: "NBM Annual Report FY 2024-25",
      size: "8.6 MB",
      type: "PDF",
    },
  },
];

export const newsTags: NewsTag[] = ["Press Release", "News", "Notification", "Event"];

export function getNewsById(id: string): NewsItem | undefined {
  return newsItems.find((item) => item.id === id);
}

export function getRelatedNews(currentId: string, limit = 3): NewsItem[] {
  const current = getNewsById(currentId);
  if (!current) return newsItems.slice(0, limit);
  return newsItems
    .filter((item) => item.id !== currentId && item.tag === current.tag)
    .slice(0, limit);
}
