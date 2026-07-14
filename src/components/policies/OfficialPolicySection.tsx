import type { WebsitePolicySection } from "@/data/websitePolicies";

type Props = {
  section: WebsitePolicySection;
  variant?: "legacy" | "card";
};

function PolicyParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((text, i) => (
        <p key={i} className="official-policy__text">
          {text}
        </p>
      ))}
    </>
  );
}

export function OfficialPolicySection({ section, variant = "legacy" }: Props) {
  if (variant === "card") {
    return (
      <section
        id={section.id}
        aria-labelledby={`${section.id}-heading`}
        className="official-policy official-policy--card"
      >
        <h2 id={`${section.id}-heading`} className="official-policy__title">
          {section.title}
        </h2>
        <div className="official-policy__body">
          <PolicyParagraphs paragraphs={section.paragraphs} />
          {section.subsections?.map((sub) => (
            <div key={sub.title} className="official-policy__subsection">
              <h3 className="official-policy__subtitle">{sub.title}</h3>
              <PolicyParagraphs paragraphs={sub.paragraphs} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="official-policy"
    >
      <div className="official-policy__banner">
        <h2 id={`${section.id}-heading`} className="official-policy__banner-title">
          {section.title}
        </h2>
      </div>
      <div className="official-policy__body">
        <PolicyParagraphs paragraphs={section.paragraphs} />
        {section.subsections?.map((sub) => (
          <div key={sub.title} className="official-policy__subsection">
            <h3 className="official-policy__subtitle">{sub.title}</h3>
            <PolicyParagraphs paragraphs={sub.paragraphs} />
          </div>
        ))}
      </div>
    </section>
  );
}
