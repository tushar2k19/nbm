import { FileBadge, Leaf } from "lucide-react";
import type { AccreditedNursery } from "@/data/accreditedNurseries";
import { SpeciesStockPanel } from "./SpeciesStockPanel";
import { downloadSamplePdf } from "@/lib/samplePdf";

type Props = {
  nurseries: AccreditedNursery[];
  startIndex: number;
};

function SourceBadge({ source }: { source: AccreditedNursery["source"] }) {
  const cls =
    source === "Seed"
      ? "an-badge--seed"
      : source === "Vegetative"
        ? "an-badge--vegetative"
        : "an-badge--both";
  return <span className={`an-badge ${cls}`}>{source}</span>;
}

function TypeBadge({ type }: { type: AccreditedNursery["type"] }) {
  const cls =
    type === "Farmer"
      ? "an-badge--farmer"
      : type === "Department"
        ? "an-badge--department"
        : "an-badge--private";
  return <span className={`an-badge ${cls}`}>{type}</span>;
}

export function NurseryTable({ nurseries, startIndex }: Props) {
  if (nurseries.length === 0) {
    return (
      <div className="an-empty" role="status" aria-live="polite">
        <Leaf className="an-empty__icon" aria-hidden />
        <p className="an-empty__title">No nurseries found</p>
        <p className="an-empty__desc">
          Try adjusting the filters or clearing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="an-table-wrap">
      <table className="an-table">
        <caption>Accredited Nursery Directory — NBM</caption>
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">State</th>
            <th scope="col">District</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Source</th>
            <th scope="col">Type</th>
            <th scope="col">Contact No.</th>
            <th scope="col">Email</th>
            <th scope="col">Lat / Long</th>
            <th scope="col">Species &amp; Stock</th>
          </tr>
        </thead>
        <tbody>
          {nurseries.map((n, idx) => (
            <tr key={n.id}>
              <td className="an-td-muted font-medium">{startIndex + idx + 1}</td>
              <td className="an-td-location">{n.state}</td>
              <td className="an-td-muted">{n.district}</td>
              <td>
                <div className="an-td-name">{n.name}</div>
                {n.hasCertificate && (
                  <button
                    type="button"
                    className="an-cert-btn"
                    onClick={() => downloadSamplePdf(`Certificate-${n.name}`)}
                    aria-label={`View certificate for ${n.name}`}
                  >
                    <FileBadge className="h-3 w-3" aria-hidden />
                    View Certificate
                  </button>
                )}
              </td>
              <td className="an-td-muted max-w-[14rem] leading-snug">{n.address}</td>
              <td>
                <SourceBadge source={n.source} />
              </td>
              <td>
                <TypeBadge type={n.type} />
              </td>
              <td className="an-td-muted whitespace-nowrap">{n.contact}</td>
              <td className="an-td-muted break-all">{n.email}</td>
              <td className="an-td-coord">
                {n.latitude.toFixed(4)}, {n.longitude.toFixed(4)}
              </td>
              <td>
                <SpeciesStockPanel species={n.species} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
