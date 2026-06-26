export type HeadquarterContact = {
  name: string;
  designation: string;
  division: string;
  extn: string;
  roomNo: string;
  phone: string;
  email: string;
  address: string;
};

export type StateContact = {
  stateName: string;
  missionDirector: string;
  concernedOfficer: string;
};

/** Decode government obfuscated email e.g. name[dot]x[at]gov[dot]in */
export function decodeGovEmail(email: string): string {
  if (!email || email === '--') return '';
  return email.replace(/\[dot\]/g, '.').replace(/\[at\]/g, '@');
}

export const headquarterContacts: HeadquarterContact[] = [
  {
    name: 'Dr Abhilaksh Likhi',
    designation: 'Additional Secretary',
    division: 'NBM - MIDH',
    extn: '4999',
    roomNo: '134',
    phone: '011-23389348 , 23381305',
    email: 'a[dot]likhi[at]nic[dot]in',
    address: 'Krishi Bhawan, New Delhi-110001',
  },
  {
    name: 'Shri Priya Ranjan',
    designation: 'Joint Secretary',
    division: 'NBM - MIDH',
    extn: '4224',
    roomNo: '224',
    phone: '011-23384309,23389208',
    email: 'jsmidh-agri[at]gov[dot]in',
    address: 'Krishi Bhawan, New Delhi-110001',
  },
  {
    name: 'Shri Ajay Wadhwa',
    designation: 'JS-PPS',
    division: 'NBM - MIDH',
    extn: '4624',
    roomNo: '224A',
    phone: '011-23389208',
    email: '',
    address: 'Krishi Bhawan, New Delhi-110001',
  },
  {
    name: 'Sh Manoj Kumar',
    designation: 'Director',
    division: 'NBM - MIDH',
    extn: '',
    roomNo: '344',
    phone: '',
    email: 'manojias2008[at]nic[dot]in',
    address: 'Krishi Bhawan, New Delhi-110001',
  },
  {
    name: 'Shri Sreekanth K.S',
    designation: 'Deputy Commissioner',
    division: 'NBM - MIDH',
    extn: '5019',
    roomNo: '117-B',
    phone: '011-23388861',
    email: 'Sreekanth[dot]ks[at]gov[dot]in',
    address: 'Shastri Bhawan, New Delhi-110001',
  },
  {
    name: 'Ms. Pooja Singh',
    designation: 'Section Officer',
    division: 'NBM - MIDH',
    extn: '2783',
    roomNo: '118-B',
    phone: '',
    email: 'Pooja[dot]89[at]gov[dot]in',
    address: 'Shastri Bhawan, New Delhi-110001',
  },
  {
    name: 'Shri Anil Kumar Meena',
    designation: 'US',
    division: 'NBM - MIDH',
    extn: '4512',
    roomNo: '534A',
    phone: '',
    email: 'anilkr[dot]meena[at]nic[dot]in',
    address: 'Krishi Bhawan, New Delhi-110001',
  },
  {
    name: 'Sh Rahul Kumar',
    designation: 'Section Officer',
    division: 'NBM - MIDH',
    extn: '',
    roomNo: '114-B',
    phone: '011-23070955',
    email: 'rahul[dot]kumar84[at]nic[dot]in',
    address: 'Krishi Bhawan, New Delhi-110001',
  },
];

export const stateContacts: StateContact[] = [
  {
    stateName: 'Andhra Pradesh',
    missionDirector: 'Dr. S. S. Sreedhar I.F.S., Mission Director (SBM) and Commissioner of Horticulture, TTPC Building, 1st Floor, Chuttugunta, Near Rythu Bazaar, Guntur-522004, Andhra Pradesh, Horticulture Department Tel: 0863-2377508 Email: adhfruitsap[at]gmail[dot]com,',
    concernedOfficer: 'Shri P V Ramana',
  },
  {
    stateName: 'Arunachal Pradesh',
    missionDirector: 'Shri. R.K. Singh, IFS, Mission Director, PCCF cum State Bamboo Development Agency (SBDA) Department of Environment and Forests, Government of Arunachal Pradesh, Itanagar Telephone No. 0360 2212409 Email: rksingh6863[at]gmail[dot]com ,arunachalbamboo2020[at]gmail[dot]com',
    concernedOfficer: 'Dr. G. Murtem Dy. SMD (NBM) Van Bihar Chimpu, P.B. No. 159, Itanagar – 791111, Arunachal Pradesh Email:dr_ganguva[at]rediffmail[dot]com, ganguvam[at]gmail[dot]com, sbmarunach333[at]gmail[dot]com',
  },
  {
    stateName: 'Assam',
    missionDirector: 'Shri Oinam Sarankumar Singh M.D, State Bamboo Development Agency Udyog Bhawan, Bamuni Maidan Guwahati - 781021 Ph: 0361-2237277 Email: sbda[dot]assam[at]gmail[dot]com, commissioner[at]diccassam[dot]com',
    concernedOfficer: 'Dhritiman Bharadwaj',
  },
  {
    stateName: 'Bihar',
    missionDirector: 'Shri. Sanjay Kumar Sinha, IFS State Mission Director (NBM) cum CCF cum Director, Hariyali Mission 3rd Floor,Aryan Bhawan, Riding Road, Sheikhpura, Patna - 800014, Bihar Email: ccfhm-bih[at]gov[dot]in',
    concernedOfficer: 'Shri. Rajiv Kumar Technical Officer (Forestry) 3rd Floor,Aryan Bhawan, Riding Road, Sheikhpura, Patna - 800014, Bihar Email: hariyalimission[at]gmail[dot]com',
  },
  {
    stateName: 'Chhattisgarh',
    missionDirector: 'Dr. M. Geeta Secretary & Agriculture Production Commissioner Department of Agriculture & Bio-Technology, Room No. S1-25, Mantralaya Mahanadi Bhawan, New Raipur, Chhattisgarh - 492001 Tel: 0771-2511632 Email: secypgr123[at]gmail[dot]com, diagricg[dot]cg[at]nic[dot]in',
    concernedOfficer: 'Karan Sonkar (SSDO) Tel: 0771-2433001/2511066',
  },
  {
    stateName: 'Gujarat',
    missionDirector: 'Shri Ram Kumar, IFS APCCF SF & SMD (NBM) Block B, 2nd Floor, Aranya Bhavan,Opp, St.Xaviers School, Near Ch-3 Circle,Sector 10/A, Gandhinagar. Ph:- 079-23254143, Email: apccf[dot]fst[dot]sf[at]gmail[dot]com',
    concernedOfficer: 'Mr. J D Chaudhari Mr. Shailesh Radadia',
  },
  {
    stateName: 'Himachal Pradesh',
    missionDirector: 'Shri Deshraj Thakur SMD (NBM) Krishi Bhawan, Boileauganj Shimla-171005 Himachal Pradesh Phone-0177- 2830620, 2830162, 2830618, Email: krishibhawan-hp[at]gov[dot]in',
    concernedOfficer: 'Ishan Mehata',
  },
  {
    stateName: 'Jharkhand',
    missionDirector: 'Shri.Vishwanath Sah State Mission Director (NBM) CCF-cum-Chief Co-ordinator,World Food Programme,Ranchi Van Bhawan, Ranchi-834002,Jharkhand Email: ccfcumccowfp[at]gmail[dot]com, ccf-wfpranchi[at]gov[dot]in',
    concernedOfficer: 'Shri Vinay Mishra DFO',
  },
  {
    stateName: 'Karnataka',
    missionDirector: 'Shri. Rajkumar Srivastava, IFS APCCF and State Mission Director (NBM) NFAP-BM, 6th Floor, Aranya Bhavan, 18th Cross, Malleshwaram, Bangalore-560003 Tel: 080-23563931 Email: apccfnfap[at]gmail[dot]com',
    concernedOfficer: '',
  },
  {
    stateName: 'Kerala',
    missionDirector: 'Shri. Bhandari Swagat Ranveerchand IAS State Mission Director(SMD)NBM & Director (Industries and Commerce) Vikas Bhawan P.O., Thiruvananthapuram–695033, Kerala. Tel: 0471-2302774, Email: info[at]keralabamboomission[dot]org,industriesdirectorate[at]gmail[dot]com',
    concernedOfficer: 'Mr. Van Roy S Email:mgrkbip[dot]ind[at]kerala.gov[dot]in, kbip[at]keralaindustry[dot]org industriesdirectorate[at]gmail[dot]com, surajsnair[at]gmail[dot]com anilasekharkbip[at]gmail[dot]com, ranjini[dot]kbip[at]gmail[dot]com',
  },
  {
    stateName: 'Madhya Pradesh',
    missionDirector: 'Dr. U.K. Subuddhi State Mission Director (NBM) & PCCF Khel Parisar, 74 Bungalows, Bhopal-462003, Madhya Pradesh Tel: 91-755-2555524,2674341, Fax:91-755-2555523, Email: mpbamboomission[at]mp[dot]gov[dot]in',
    concernedOfficer: 'Mr. Khan - 0755-2674341',
  },
  {
    stateName: 'Maharashtra',
    missionDirector: 'Shri. M. SRINIVASA RAO SMD (NBM) & IFS & Managing Director Maharashtra Bamboo Development Board, Adjacent Katol Naka Toll Katol Road, Nagpur-440013, Maharashtra Tel: 0712-2970562 Email: mahabamboo[at]mahaforest[dot]gov[dot]in,mahabamboo@nic.in',
    concernedOfficer: 'Ms. Abharna Email: brtcchichpalli@gmail.com Schin Thakare',
  },
  {
    stateName: 'Manipur',
    missionDirector: 'Shri. SS Chhabara IFS, APCCF,OSD/Forest & SMD (NBM) Forest HQ: Sanjengthong PO & PS Imphal-795001, Manipur Telfax: 0385-2449662, Email: chhabra[dot]ifs[at]gmail[dot]com',
    concernedOfficer: 'Shri N. Somorendro Singh ASMD(NBM) Email: nsomorendro[at]yahoo[dot]com',
  },
  {
    stateName: 'Meghalaya',
    missionDirector: 'Shri. L.N. Marak Director Soil & Water Conservation Department Mission Director Bamboo Development Agency 4th Administrative Building, Lower Lachumiere, Shillong-793001, Meghalaya Phone No: 0364-2224551, Email: megsoil49[at]gmail[dot]com',
    concernedOfficer: 'Shri E. Kharkarang',
  },
  {
    stateName: 'Mizoram',
    missionDirector: 'Dr. Elizabeth Saipari SMD (NBM) & Director, Horticulture Department, Tuikual, Near Tennis Court, Aizawl – 796001 Ph : 0389 – 2314370 Fax : 0389 - 2329725 Email: dirhorti_mizoram[at]yahoo[dot]in, saipari_eli[at]yahoo[dot]co[dot]in',
    concernedOfficer: 'Dr. Carmelita Lalchhanhimi Pachuau Horticulture Extension Officer Directorate of Horticulture Mizoram, Aizawl-796001 Mob: 8794715059/8014014940 Email: lilevitapachuau@gmail.com',
  },
  {
    stateName: 'Nagaland',
    missionDirector: 'Shri Tarep Imchen, NCS State Mission Director (NBM) & Team Leader Nagaland Bamboo Development Agency, Nagaland Bamboo Resource Centre Complex, 6th Mile, Sovima Dimapur-797112, Nagaland. Ph: 03862-240217/241696, Fax: 03862-241305 Email: nagaland_bda[at]yahoo[dot]com',
    concernedOfficer: 'Shri Tolto Metha Team Member, NBDA',
  },
  {
    stateName: 'Odisha',
    missionDirector: 'Shri Sudeep Nayak , IFS State Mission Director (NBM) Orissa Bamboo Development Agency, Ground Floor of Aranya Bhawan, Plot No.G.D-2/ 12, Chandrasekharpur, Bhubaneswar -751023, Odisha Ph:0674-2302344,2302079 Fax:0674-2565345 Email:obda[at]rediffmail[dot]com',
    concernedOfficer: '',
  },
  {
    stateName: 'Sikkim',
    missionDirector: 'Shri Manoj Kumar Subba State Mission Director (NBM) cum Director Horticulture & Cash Crop Development Department Krishi Bhawan, Tadong, Gangtok-737102, Sikkim ,Ph: 03592-23456, Fax:03592-231040 Email: nbmsikkim[at]gmail[dot]com',
    concernedOfficer: 'Shri Tika Sharma',
  },
  {
    stateName: 'Tamilnadu',
    missionDirector: 'Dr. N. Subbaiyan, I.A.S State Mission Director (NBM) and Managing Director, Tamil Nadu Horticulture Development Agency, Directorate of Horticulture and Plantation Crops, Agricultural complex, III Floor, Chepauk, Chennai – 600005, Tamil Nadu. Ph – 044 – 28524643; Fax – 044-28512300 nbmtanhoda[at]gmail[dot]com',
    concernedOfficer: 'Shri. Tamilvendin Addl. Director (Horti) Shri. Imman Joint Director (Horticulture) Shri Mohammed Hakkeem',
  },
  {
    stateName: 'Telangana',
    missionDirector: 'Shri. L. Venkatram Reddy Director of Horticulture Department of Horticulture, Public Gardens, Hyderabad - 500004,Telangana Ph: 040-23232253, Email: tsbmission[at]gmail[dot]com',
    concernedOfficer: 'Shri B. Babu Deputy Director Shri B. Sridhar Rao Assistant Director',
  },
  {
    stateName: 'Tripura',
    missionDirector: 'Shri. Raval H. Kumar, IAS State Mission Director (NBM) Director, Industries and Commerce Govt. of Tripura Khejurbagan, Agartala, Tripura-799006 Ph: 0381-2411021,2951179 Email: tripurabamboo[at]gmail[dot]com,industrytripura[at]gmail[dot]com',
    concernedOfficer: 'Shri S.C. Das Additional Director, Tripura Bamboo Mission Email: subhashagartala[at]rediffmail[dot]com',
  },
  {
    stateName: 'Uttarakhand',
    missionDirector: 'Dr. Vijay Kumar-IFS, Chief Forest Conservator /Chief Executive Officer Uttarakhand Bamboo and Fiber Development Board, Indira Nagar,Forest Colony, Dehradun- 248006, Uttarakhand Ph: 0135-2760897, Fax: 0135-2761155 Email: vijay459[at]gmail[dot]com , uabamboo[at]gmail[dot]com',
    concernedOfficer: 'Addl. Mission Director State Bamboo Mission Uttarakhand, Director Agriculture Shri Dinesh Joshi Programme Manager Email: joshiddun[at]gmail[dot]com',
  },
  {
    stateName: 'Uttar Pradesh',
    missionDirector: 'Shri. K. Ilango State Mission Director (NBM) cum CCF Forest Head Office,17, Rana Pratap Marg, Lucknow - 226016,Uttar Pradesh Telefax: 0522-2204253 Email: dir[dot]bamboomissionup[at]gmail[dot]com ccfprojectcell[at]gmail[dot]com',
    concernedOfficer: '',
  },
  {
    stateName: 'NECBDC, Guwahati',
    missionDirector: 'Smt R. Lalrodingi, Managing Director, North East Cane and Bamboo Development Council (NECBDC) Cane and Bamboo Technology Park 13th Mile, G.S. Road, Burnihat, Assam - 781023 Ph: 0364-2520816, Fax: 0364-2522643, 2522779 Email: sc103d[at]gmail[dot]com',
    concernedOfficer: 'Mr. Pulak Kumar Mandal Assistant Manager Email: cbtcassam[at]gmail[dot]com Mr. P Mali Email: pmali6000[at]gmail[dot]com',
  },
  {
    stateName: 'ICFRE Dehradun',
    missionDirector: 'Shri R.K. Dogra DDG (Administration) Indian Council of Forestry Research & Education (ICFRE), P.O. New Forest, Dehradun- 248 006 Ph – 0135 - 2757 775, Email: ddg_res[at]icfre[dot]org',
    concernedOfficer: 'Dr. Vimal Kothiyal ADG (RP) Ph- 0135-2753290 Email: adg_rp[at]icfre[dot]org Sh. S.S. Jain, Scientist Tel - 0135-2224858',
  },
  {
    stateName: 'KFRI, Peechi',
    missionDirector: 'Dr. Syam Viswanath, IFS Director Kerala Forest Research Institute Peechi- 680 653, Thrissur, Kerala Ph: 0487- 2690110 Fax: 0487- 2690111 Email: director[at]kfri[dot]org',
    concernedOfficer: 'Dr. Sreekumar V.B. Co-ordinator, BTSG-KFRI Kerala Forest Research Institute Peechi 680653, Thrissur, Kerala Email: vbskumar[at]gmail[dot]com',
  },
  {
    stateName: 'TFRI',
    missionDirector: 'Dr. G. Rajeshwar Rao, Director Tr Tropical Forest Research Institute (TFRI) P.P.O. RFRC, Mandla Road, JaJabalpur – 482021 Madhya Pradesh Ph:- 91-761- 2840483 / 91-761-2840010, 4044002 Email: dir_tfri[at]icfre[dot]org',
    concernedOfficer: 'Dr. Naseer Mohamad Email: naseer35518[at]gmail[dot]com',
  },
  {
    stateName: 'NITRA',
    missionDirector: 'Dr. Arindham Basu Mitra, DG Northern India Textile Research Association SeSector 23, Raj Nagar, Ghaziabad, Uttar Pradesh 201002 Tel: 0120-2807390-95, 0120-2783586 Email: drabasu[at]nitratextile[dot]org, mail[at]nitratextile[dot]org',
    concernedOfficer: '',
  },
];
