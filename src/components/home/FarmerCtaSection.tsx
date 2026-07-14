import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import farmerImg from "@/assets/bamboo-farmer.jpg";

export function FarmerCtaSection() {
  return (
    <section className="farmer-cta-section relative isolate" data-hero aria-labelledby="farmer-cta-heading">
      <div className="farmer-cta-glow" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-14">
        <div className="farmer-cta-card">
          <div className="farmer-cta-content">
            <span className="farmer-cta-eyebrow hero-eyebrow">
              For Farmers, Entrepreneurs & Artisans
            </span>
            <h2 id="farmer-cta-heading" className="farmer-cta-title image-banner-heading font-display">
              Are you a farmer, entrepreneur or artisan?
            </h2>
            <p className="farmer-cta-desc">
              Discover technical assistance and market opportunities offered under the National
              Bamboo Mission.
            </p>
            <div className="farmer-cta-actions">
              <Link to="/guidelines" className="btn-gold">
                <FileText className="h-4 w-4" aria-hidden />
                View Schemes
              </Link>
              <Link to="/contact/head-quarter" className="farmer-cta-btn-outline">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="farmer-cta-visual">
            <img
              src={farmerImg}
              alt=""
              width={1024}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="farmer-cta-visual-overlay" aria-hidden />
          </div>
        </div>
      </div>

      <div className="farmer-cta-divider mx-auto max-w-7xl px-4 sm:px-6" aria-hidden />
    </section>
  );
}
