/** Governance structure content — sourced from nbm.da.gov.in/Structure */

export type StructureTableRow = {
  office: string;
  role: string;
};

export type StructureLevel = {
  id: string;
  title: string;
  sections: StructureSection[];
};

export type StructureSection =
  | {
      kind: "prose";
      id: string;
      heading?: string;
      paragraphs: string[];
    }
  | {
      kind: "table";
      id: string;
      heading: string;
      intro?: string[];
      leadership?: StructureTableRow[];
      rows: StructureTableRow[];
      footnotes?: string[];
      closingParagraphs?: string[];
    }
  | {
      kind: "list";
      id: string;
      heading: string;
      intro?: string[];
      listTitle?: string;
      items: string[];
      outro?: string[];
    };

export const nbmStructurePageTitle = "Structure of NBM";

export const nbmStructureLevels: StructureLevel[] = [
  {
    id: "national-level",
    title: "National level",
    sections: [
      {
        kind: "table",
        id: "executive-committee",
        heading: "Executive Committee",
        intro: [
          "The EC will oversee activities of the Mission and approve the action plan of the States/UTs. The modifications in operational guidelines, if any, will be recommended for approval of Agriculture Minister. The implementation of the State's action plans will be reviewed by EC. The EC shall meet at least twice in a year. The EC will comprise of the following:",
        ],
        leadership: [
          { office: "Secretary (AC&FW)", role: "Chairperson" },
          {
            office:
              "Director General of Forests and Special Secretary MoEFCC Secretary (DoNER)",
            role: "Co-Chair",
          },
          { office: "Secretary (DoNER)", role: "Co-Chair" },
          { office: "Secretary (MSME)", role: "Co-Chair" },
        ],
        rows: [
          { office: "Additional Secretary (NRM), DAC & FW", role: "Member" },
          { office: "AS&FA, DAC&FW", role: "Member" },
          { office: "Joint Secretary, Ministry of Rural Development", role: "Member" },
          { office: "Adviser Agriculture. NITI Ayog", role: "Member" },
          {
            office:
              "2 Experts* (Production, Processing, Designing & Product development, Industrial Promotion and Marketing)",
            role: "Members",
          },
          { office: "Mission Director, NBM", role: "Member Secretary" },
        ],
        footnotes: [
          "*The tenure of the non official members will be for 2 years from the date of nomination",
          "Joint Secretary equivalent officers of concerned Ministry/Department will be special invitee as and when required",
        ],
      },
      {
        kind: "prose",
        id: "sub-committee-1",
        heading: "Sub Committee 1",
        paragraphs: [
          "To deliberate on issues related to propagation and cultivation (identification of appropriate species, planting techniques, tissue culture, development of new varieties, improving the productivity of bamboo plantations in the country.  The Deputy Director General (Research), ICFRE would be the Convenor of this sub-committee and members would be drawn from inter alia ICAR, CAFRI, DST, State Agriculture Universities, Central Food Technological Research Institute (CFTRI), etc",
        ],
      },
      {
        kind: "prose",
        id: "sub-committee-2",
        heading: "Sub Committee 2",
        paragraphs: [
          "To advise on ways and means to rejuvenate the bamboo industry, both small enterprises and cottage industry, as well as the larger commercial units to enable a definite role in both domestic markets and for exports. Innovations in product development and processes, including indigenous tools and equipment will be the main mandate of this sub-committee. Market research and advice on related policies would be essential to make the bamboo based industry competitive with other commercial products. Director Indian Plywood Industries Research and Training Institute (IPIRTI) would be the Convenor of this group, with members drawn from inter alia Ministries of DAC&FW, Ministries of MSME, DONER, Skill Development & Entrepreneurship, Textiles and Commerce, various organisations and industry representatives.",
        ],
      },
      {
        kind: "prose",
        id: "nbmc",
        heading: "National Bamboo Mission Cell",
        paragraphs: [
          "A National Bamboo Mission Cell (NBMC) headed by the Mission Director, NBM will be established at the DAC&FW, Govt. of India. An appropriately qualified and nationally/internationally reputed expert will be engaged as Senior Advisor to guide and advice for effective implementation, with commensurate remuneration to be approved by EC as per the provisions of experts under NMSA. Two Advisors with specialization/experience in bamboo plantation and product development respectively will also be engaged. In addition other consultant/technical assistant and staff will be engaged on contract for the period of the Mission. NBMC shall be the repository of information on various aspects of the bamboo value chain, with adequate support from the various other Ministries and Departments of GOI. Indicative composition of the TSG at National Level is given in the Annexure III.",
        ],
      },
      {
        kind: "list",
        id: "btsg",
        heading: "Bamboo Technical Support Group (BTSG)",
        intro: [
          "National Level Agency called Bamboo Technical Support Group (BTSG) will be set up to provide necessary technical support to the Mission. The existing three BTSGs which are providing services to the Mission/ States namely, (i) Cane and Bamboo Technology Centre (CBTC), Guwahati (ii) Indian Council of Forest Research & Education (ICFRE), Dehradun and (iii) Kerala Forest Research Institute (KFRI), Peechi, Kerala shall continue under Restructured National Bamboo Mission for development of bamboo sector.",
        ],
        listTitle: "BTSG will have the following role and functions:",
        items: [
          "i) To visit the partner States frequently to provide guidance in policy, organizational and technical matters.",
          "ii) Recommend/advice appropriate species of bamboo well suited to the region or the end user.",
          "iii) Synergise inter sectoral interaction for innovations.",
          "iv) To compile materials for conduct of regional workshops in respect of bamboo plantations, handicraft, product development, bamboo marketing and exports.",
          "v) To conduct studies on different aspects of development of the bamboo sector.",
          "vi) To assist the States in organizing capacity building programmes.",
          "vii) Undertake publicity campaigns to promote the Mission objectives.",
          "viii) To document and disseminate case studies.",
          "ix) To conduct specialized Training Programmes at the Regional Level.",
          "x) To network with various stakeholders and Institutes/ Organizations/ Agencies, both in India and abroad.",
        ],
        outro: [
          "The BTSG will be funded by the NBM and report to the National Bamboo Mission Cell.",
        ],
      },
    ],
  },
  {
    id: "state-level",
    title: "State level",
    sections: [
      {
        kind: "table",
        id: "slec",
        heading: "State Level Executive Committee (SLEC)",
        intro: [
          "The State Governments shall identify the Department for anchoring the State Bamboo Mission (SBM) and nominate the Mission Director State Bamboo Development Agency. State Level Executive Committee (SLEC) headed by Chief Secretary of the State and having representatives from Departments of State Government including inter alia Agriculture, Industries, Forests,  State Agricultural Universities (SAU), Institutes under Indian Council of Agricultural Research (ICAR), Growers' Associations/FPOs, etc  to guide policy and implementation of the Mission in the State. The SLEC will be responsible for approving the annual action plans of the States before communicating to the Executive Council of the NBM at the National level for approvals and release of funds and ensuring effective implementation & monitoring the scheme. The suggested composition of SLEC is as follows:",
          "In State Bamboo Mission (SBM) focus will be on primary processing units specializing in specific steps of pre-product processing to be established near areas of bamboo production. These units would converge into big units doing secondary processing, which would, in turn, converge into industries, both MSME and high end, making finished products. This would reduce wastages, promote efficiency and develop expertise in specific steps thereby resulting in a significant drop in cost of production. District or block level clusters should be formed and common facilitation/ technology centers with appropriate machinery be developed. The Development Institutes of the Development Commissioner, MSME located in different States would play a major role in skill development/ training and guiding the entrepreneurs/ rural youths for promotion of product development and starting of production units and marketing of bamboo products",
        ],
        rows: [
          { office: "Chief Secretary", role: "Chairman" },
          {
            office:
              "Secretaries: Agriculture, Environment & Forests,  Industries, Finance, Science and Technology, Rural Development, Tribal Affairs",
            role: "Members",
          },
          {
            office: "Nominee of DAC&FW, Ministry of Agriculture, Govt. of India",
            role: "Member",
          },
          {
            office:
              "Two experts* (Production, Processing, Designing & Product development, Industrial Promotion and Marketing)",
            role: "Members",
          },
          { office: "State Mission Director", role: "Member Secretary" },
        ],
        footnotes: [
          "*The tenure of the non official will be for 2 years from the date of nomination.",
        ],
        closingParagraphs: [
          "Dedicated Project Management Teams at District, State and National Level would be set up to address effective coordination and synergy of different segments of the value chain.  Besides, robust monitoring mechanism would be in place for periodic and effective reporting using web applications and space technologies. The administrative & contingency expenditure, concurrent & impact evaluation, organization of meetings of EC etc. would be met from the project management cost as per the norms placed at Annexure IV",
          "The programme shall be operational through the existing employees of respective State Agriculture Departments, SAUs and ICAR Institutes only. Contractual staff (Advisors/consultants, Technical assistants, Data entry/MIS/IT staff etc.) MTS of adequate nature at District, State and National levels may be engaged under the Project Management Team (PMT) provisions.",
        ],
      },
      {
        kind: "list",
        id: "bda",
        heading: "Bamboo Development Agency (BDA)",
        intro: [
          "BDA shall be set up in each State headed by the Mission Director, as nominated by the State Govt. BDA will have representatives from concerned departments such as Forests, Agriculture, Industries, Rural Development, etc. The Panchayati Raj Institutions existing in the State would be fully involved in the implementation of NBM activities. The BDA will be responsible for implementation and overall coordination of NBM within the State. The State Level Agency will have the following functions:",
        ],
        items: [
          "i) Organize base-line survey and feasibility studies in different parts (District, sub-District, or a group of Districts) to determine the status of bamboo production, its potential and demand, and tailor assistance accordingly. A cluster based market (industry) led approach needs to be adopted for linking of farmers/FPOs/FPCs/ SHGs to markets.",
          "ii) Work towards setting up of Bamboo Economic Zones as per location of hinterland and industry requirements .",
          "iii) Prepare perspective and annual State Level Action Plan in consonance with Mission  goals and objectives in close coordination with Bamboo Technical Support Group (BTSG) and oversee its implementation;",
          "iv) Receive funds from the State Government and other sources for carrying out the Mission activities, maintain proper accounts thereof and submit utilization certificates to the concerned agencies.",
          "v) Furnish periodic progress reports to SLEC for onward transmission to the NBM (DAC&FW), Ministry of Agriculture.",
          "vi) Release funds to the implementing organizations and oversee, monitor and review the implementation of the programmes.",
          "vii) Assist and oversee the implementation of the Mission's programmes in the State through Farmers Societies, NGOs, growers, entrepreneurs, associations, self-help groups, State institutions and other similar entities;",
          "viii) Organize Workshops, Seminars and skill development/ training programmes, participation of artisans in exhibitions / trade fares etc. for all interest groups/ associations at the State level.",
        ],
      },
    ],
  },
  {
    id: "district-level",
    title: "District level",
    sections: [
      {
        kind: "prose",
        id: "district-agency",
        paragraphs: [
          "The Bamboo Development Agency of every State will constitute a District Level Agency. The Agency will comprise of officials from Industries, Agriculture/ Horticulture, Forest, Rural Development and other line departments, SHGs, NGOs etc. All proposals received by the Agency would be compiled and sent to the BDA for appraisal and scrutiny. This Agency will also oversee, coordinate and control all activities at the district level for non-forest areas. The District Industries Centre (DIC) Planning Committee and Panchayati Raj Institutions (PRI) will be integrated/ involved in implementing the programme depending on their expertise and available infrastructure. The District level  officer of the nodal department will be the Member Secretary. To avoid duplication, coordination will be ensured by the Committees at different levels while approving the district plans.",
          "The details of the interventions / activities with the unit cost/ subsidy component permissible under NBM are given in Annexure IV",
        ],
      },
    ],
  },
];
