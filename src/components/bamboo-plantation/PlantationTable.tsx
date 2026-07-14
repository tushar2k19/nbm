import { TreePine } from "lucide-react";
import type { BambooPlantation, PlantationCategory } from "@/data/bambooPlantations";
import { PlantationSpeciesPanel } from "./PlantationSpeciesPanel";

type Props = {
  plantations: BambooPlantation[];
  startIndex: number;
};

function IrrigatedBadge({ irrigated }: { irrigated: boolean }) {
  return (
    <span className={`bp-badge ${irrigated ? "bp-badge--yes" : "bp-badge--no"}`}>
      {irrigated ? "Yes" : "No"}
    </span>
  );
}

function CategoryBadge({ category }: { category: PlantationCategory }) {
  const cls =
    category === "Private"
      ? "bp-badge--private"
      : category === "Government"
        ? "bp-badge--government"
        : category === "SHG"
          ? "bp-badge--shg"
          : "bp-badge--fpo";
  return <span className={`bp-badge ${cls}`}>{category}</span>;
}

export function PlantationTable({ plantations, startIndex }: Props) {
  if (plantations.length === 0) {
    return (
      <div className="bp-empty" role="status" aria-live="polite">
        <TreePine className="h-12 w-12 opacity-30" aria-hidden />
        <p className="font-semibold">No plantations found</p>
        <p className="text-sm text-muted-foreground">Try adjusting the filters or clearing your search.</p>
      </div>
    );
  }

  return (
    <div className="bp-table-wrap">
      <table className="bp-table">
        <caption>Bamboo Plantation Directory — NBM MIS</caption>
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">State</th>
            <th scope="col">District</th>
            <th scope="col">Block</th>
            <th scope="col">Code</th>
            <th scope="col">Person In-charge</th>
            <th scope="col">Year</th>
            <th scope="col">Area (Ha)</th>
            <th scope="col">Irrigated</th>
            <th scope="col">Category</th>
            <th scope="col">Species &amp; Culms</th>
          </tr>
        </thead>
        <tbody>
          {plantations.map((p, idx) => (
            <tr key={p.id}>
              <td className="bp-td-muted font-medium">{startIndex + idx + 1}</td>
              <td className="font-medium text-primary">{p.state}</td>
              <td className="bp-td-muted">{p.district}</td>
              <td className="bp-td-muted">{p.block}</td>
              <td className="bp-td-code">{p.code}</td>
              <td>
                <div className="bp-person-block">
                  <div className="bp-td-name">{p.personInCharge}</div>
                  <div className="bp-person-block__contact">
                    {p.contact}
                    <br />
                    {p.email}
                    <br />
                    {p.address}
                  </div>
                </div>
              </td>
              <td className="bp-td-muted whitespace-nowrap">{p.yearOfCreation}</td>
              <td className="bp-td-area">{p.areaHa.toLocaleString("en-IN", { maximumFractionDigits: 1 })}</td>
              <td>
                <IrrigatedBadge irrigated={p.irrigated} />
              </td>
              <td>
                <CategoryBadge category={p.category} />
              </td>
              <td>
                <PlantationSpeciesPanel species={p.species} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
