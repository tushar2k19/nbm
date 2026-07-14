import digitalIndiaLogo from "@/assets/footer-logos/digital-india.png";
import indiaGovLogo from "@/assets/footer-logos/india-gov.png";
import makeInIndiaLogo from "@/assets/footer-logos/make-in-india.png";
import myGovLogo from "@/assets/footer-logos/mygov.png";

const govBadges = [
  {
    href: "https://www.india.gov.in/",
    src: indiaGovLogo,
    alt: "India.gov.in — National Portal of India",
    width: 120,
    height: 40,
  },
  {
    href: "https://www.mygov.in/",
    src: myGovLogo,
    alt: "MyGov — Government of India citizen engagement platform",
    width: 88,
    height: 40,
  },
  {
    href: "https://www.digitalindia.gov.in/",
    src: digitalIndiaLogo,
    alt: "Digital India — Power To Empower",
    width: 140,
    height: 48,
  },
  {
    href: "https://www.makeinindia.com/",
    src: makeInIndiaLogo,
    alt: "Make in India — Government of India initiative",
    width: 120,
    height: 40,
  },
] as const;

export function FooterGovBadges() {
  return (
    <div className="footer-gov-badges" aria-label="Government of India portal links">
      {govBadges.map((badge) => (
        <a
          key={badge.href}
          href={badge.href}
          target="_blank"
          rel="noreferrer"
          className="footer-gov-badge"
          title={badge.alt}
        >
          <img
            src={badge.src}
            alt={badge.alt}
            className="footer-gov-badge__img"
            width={badge.width}
            height={badge.height}
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  );
}
