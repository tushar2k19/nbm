import { Flame } from "lucide-react";
import type { AgarbattiStickUnit, AgarbattiUnitStatus, AgarbattiOwnerType } from "@/data/agarbattiStickUnits";

type Props = {
  units: AgarbattiStickUnit[];
  startIndex: number;
};

function StatusBadge({ status }: { status: AgarbattiUnitStatus }) {
  const cls =
    status === "Running"
      ? "as-badge--running"
      : status === "Closed"
        ? "as-badge--closed"
        : "as-badge--setup";
  return <span className={`as-badge ${cls}`}>{status}</span>;
}

function OwnerBadge({ ownerType }: { ownerType: AgarbattiOwnerType }) {
  const cls =
    ownerType === "SHG"
      ? "as-badge--shg"
      : ownerType === "Farmer"
        ? "as-badge--farmer"
        : ownerType === "Private"
          ? "as-badge--private"
          : ownerType === "Cooperative"
            ? "as-badge--cooperative"
            : "as-badge--department";
  return <span className={`as-badge ${cls}`}>{ownerType}</span>;
}

function ProductionBar({ capacity, actual }: { capacity: number; actual: number }) {
  const pct = capacity > 0 ? Math.min(100, Math.round((actual / capacity) * 100)) : 0;
  return (
    <div className="as-prod-bar">
      <span className="as-prod-bar__label">
        {actual.toLocaleString("en-IN")} / {capacity.toLocaleString("en-IN")} MT
      </span>
      <div className="as-prod-bar__track" aria-hidden>
        <div className="as-prod-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function AgarbattiTable({ units, startIndex }: Props) {
  if (units.length === 0) {
    return (
      <div className="as-empty" role="status" aria-live="polite">
        <Flame className="h-12 w-12 opacity-30" aria-hidden />
        <p className="font-semibold">No units found</p>
        <p className="text-sm text-muted-foreground">Try adjusting the filters or clearing your search.</p>
      </div>
    );
  }

  return (
    <div className="as-table-wrap">
      <table className="as-table">
        <caption>Agarbatti Stick Unit Directory — NBM MIS</caption>
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">State</th>
            <th scope="col">District</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Owner Type</th>
            <th scope="col">Bamboo Species</th>
            <th scope="col">Capacity / Production</th>
            <th scope="col">Status</th>
            <th scope="col">NBM</th>
            <th scope="col">Contact</th>
            <th scope="col">Email</th>
            <th scope="col">Lat / Long</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u, idx) => (
            <tr key={u.id}>
              <td className="as-td-muted font-medium">{startIndex + idx + 1}</td>
              <td className="font-medium text-primary">{u.state}</td>
              <td className="as-td-muted">{u.district}</td>
              <td className="as-td-name">{u.name}</td>
              <td className="as-td-muted max-w-[14rem] leading-snug">{u.address}</td>
              <td>
                <OwnerBadge ownerType={u.ownerType} />
              </td>
              <td className="as-td-muted">{u.bambooSpecies}</td>
              <td>
                <ProductionBar capacity={u.annualCapacityMt} actual={u.actualProductionMt} />
              </td>
              <td>
                <StatusBadge status={u.status} />
              </td>
              <td>
                {u.nbmSupported ? (
                  <span className="as-badge as-badge--nbm">NBM</span>
                ) : (
                  <span className="as-td-muted">—</span>
                )}
              </td>
              <td className="as-td-muted whitespace-nowrap">{u.contact}</td>
              <td className="as-td-muted break-all">{u.email}</td>
              <td className="as-td-coord">
                {u.latitude.toFixed(4)}, {u.longitude.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
