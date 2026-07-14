/**
 * Official website policy text carried forward from the legacy NBM portal
 * (nbm.da.gov.in). Wording is preserved; department references are updated
 * for the National Bamboo Mission / DA&FW context.
 */

export const NBM_DEPARTMENT =
  "Department of Agriculture and Farmers Welfare, Government of India";

export const NBM_DEPARTMENT_SHORT = "Department of Agriculture Cooperation & Farmers Welfare";

export const officialCopyrightPolicy = `Material featured on this Website may be reproduced free of charge after taking proper permission by sending a mail to us. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material shall not extend to any material which is identified as being copyright of a third party. Authorisation to reproduce such material must be obtained from the departments/copyright holders concerned. These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India.`;

export const officialHyperlinkingExternal = `At many places in this Website, you shall find links to other websites/portals. These links have been placed for your convenience. The National Bamboo Mission (${NBM_DEPARTMENT}) is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them. Mere presence of the link or its listing on this website should not be assumed as endorsement of any kind. We cannot guarantee that these links will work all the time and we have no control over availability of linked pages.`;

export const officialHyperlinkingInbound = `We do not object to you linking directly to the information that is hosted on this website and no prior permission is required for the same. However, we would like you to inform us about any links provided to this website so that you can be informed of any changes or updations therein. Also, we do not permit our pages to be loaded into frames on your site. The pages belonging to this website must load into a newly opened browser window of the User.`;

export const officialPrivacyPolicy = `This website does not automatically capture any specific personal information from you (like name, phone number or e-mail address) that allows us to identify you individually. Wherever the Website requests you to provide personal information, you will be informed for the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information. We do not sell or share any personally identifiable information volunteered on the website to any third party (public/private). Any information provided to this Website will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction. We gather certain information about the User, such as Internet protocol (IP) addresses, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected.`;

export const officialTermsOfUse = `This website is designed, developed and maintained by National Informatics Centre and content provided by ${NBM_DEPARTMENT_SHORT}, Government of India. Though all efforts have been made to ensure the accuracy and currency of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department(s) and/or other source(s), and to obtain appropriate professional advice. Under no circumstances will this Department be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this website. These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the jurisdiction of the courts of India.

The information posted on this website could include hypertext links or pointers to information created and maintained by non-Government/private organisations. ${NBM_DEPARTMENT_SHORT} is providing these links and pointers solely for your information and convenience. When you select a link to an outside website, you are leaving the ${NBM_DEPARTMENT_SHORT} website and are subject to the privacy and security policies of the owners/sponsors of the outside website. ${NBM_DEPARTMENT_SHORT} does not guarantee the availability of such linked pages at all times. ${NBM_DEPARTMENT_SHORT} cannot authorise the use of copyrighted materials contained in linked websites. Users are advised to request such authorisation from the owner of the linked website. ${NBM_DEPARTMENT_SHORT} does not guarantee that linked websites comply with Indian Government Web Guidelines.`;

export type WebsitePolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  subsections?: { title: string; paragraphs: string[] }[];
};

export const websitePolicySections: WebsitePolicySection[] = [
  {
    id: "copyright",
    title: "Copyright Policy",
    paragraphs: [officialCopyrightPolicy],
  },
  {
    id: "hyperlinking",
    title: "Hyperlinking Policy",
    paragraphs: [],
    subsections: [
      {
        title: "Links to external websites/portals",
        paragraphs: [officialHyperlinkingExternal],
      },
      {
        title: "Links to our website by other websites",
        paragraphs: [officialHyperlinkingInbound],
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    paragraphs: [officialPrivacyPolicy],
  },
  {
    id: "terms",
    title: "Terms of Use",
    paragraphs: officialTermsOfUse.split("\n\n"),
  },
];
