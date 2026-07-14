import { useEffect } from "react";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { formatGovEmail, type WhosWhoOfficial } from "@/data/whosWho";

function EmailDisplay({ email }: { email?: string }) {
  if (!email) return null;
  const primary = email.split(";")[0]?.trim() ?? email;
  const decoded = formatGovEmail(primary);
  return (
    <a
      href={`mailto:${decoded}`}
      className="inline-flex items-start gap-2 text-sm text-primary hover:underline"
    >
      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
      <span className="break-all text-left">{email}</span>
    </a>
  );
}

function PhoneDisplay({ phone }: { phone?: string }) {
  if (!phone) return null;
  const tel = phone.replace(/[^\d,+]/g, "").replace(/^011/, "+9111");
  return (
    <a
      href={`tel:${tel}`}
      className="inline-flex items-start gap-2 text-sm text-foreground/85 hover:text-primary"
    >
      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
      <span>{phone}</span>
    </a>
  );
}

export function WhosWhoProfileModal({
  official,
  onClose,
}: {
  official: WhosWhoOfficial;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const initials = official.name
    .replace(/^(Shri|Smt|Dr\.?|Sh)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="whos-who-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={official.name}
      onClick={onClose}
    >
      <div className="whos-who-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="whos-who-modal__close"
          aria-label="Close profile"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="whos-who-modal__hero">
          {official.photo ? (
            <img
              src={official.photo}
              alt=""
              className="whos-who-modal__photo"
              style={{
                ...(official.photoFit ? { objectFit: official.photoFit } : {}),
                ...(official.photoPosition ? { objectPosition: official.photoPosition } : {}),
              }}
              width={120}
              height={120}
            />
          ) : (
            <div className="whos-who-modal__avatar" aria-hidden>
              {initials}
            </div>
          )}
          {official.roleLabel && (
            <p className="whos-who-modal__role">{official.roleLabel.toUpperCase()}</p>
          )}
          <h3 className="whos-who-modal__name font-display">{official.name}</h3>
          <p className="whos-who-modal__designation">{official.designation}</p>
        </div>

        <div className="whos-who-modal__body space-y-3">
          <PhoneDisplay phone={official.office} />
          <EmailDisplay email={official.email} />
          {official.epabx && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/70">EPABX:</span> {official.epabx}
            </p>
          )}
          {official.roomNo && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/70">Room No.:</span>{" "}
              {official.roomNo}
            </p>
          )}
          {official.address && (
            <p className="inline-flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
              {official.address}
            </p>
          )}
          {official.notes && (
            <p className="rounded-lg bg-secondary/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              {official.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}