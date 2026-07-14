import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * NBM does not maintain separate official social accounts.
 * Links below are the parent Ministry of Agriculture and Farmers Welfare
 * (@AgriGoI) handles listed on agriwelfare.gov.in — the channel used for
 * scheme updates including National Bamboo Mission.
 *
 * @see https://www.agriwelfare.gov.in/
 * @see https://secure.mygov.in/group/ministry-agriculture-and-farmers-welfare
 */
const socialLinks = [
  {
    icon: Twitter,
    platform: "x",
    href: "https://x.com/agrigoi",
    label: "Ministry of Agriculture and Farmers Welfare on X (@AgriGoI)",
  },
  {
    icon: Facebook,
    platform: "facebook",
    href: "https://www.facebook.com/agriGoI",
    label: "Ministry of Agriculture and Farmers Welfare on Facebook (@agriGoI)",
  },
  {
    icon: Youtube,
    platform: "youtube",
    href: "https://www.youtube.com/@AgriGoI",
    label: "Ministry of Agriculture and Farmers Welfare on YouTube (@AgriGoI)",
  },
  {
    icon: Instagram,
    platform: "instagram",
    href: "https://www.instagram.com/agrigoi",
    label: "Ministry of Agriculture and Farmers Welfare on Instagram (@agrigoi)",
  },
] as const;

export function FooterSocial() {
  const { t } = useTranslation();

  return (
    <div className="footer-social">
      <p className="footer-social__label">{t("footer.connect")}</p>
      <div className="footer-social__row">
        {socialLinks.map((s) => (
          <a
            key={s.platform}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`footer-social-btn footer-social-btn--${s.platform}`}
          >
            <s.icon className="footer-social-btn__icon" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
