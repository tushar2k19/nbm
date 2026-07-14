import type { PlantationSpecies } from "@/data/bambooPlantations";

type Props = {
  species: PlantationSpecies[];
};

export function PlantationSpeciesPanel({ species }: Props) {
  if (species.length === 0) {
    return <span className="bp-td-muted text-xs">—</span>;
  }

  const total = species.reduce((sum, s) => sum + s.culms, 0);

  return (
    <table className="bp-species-table" aria-label="Species culms breakdown">
      <caption className="sr-only">Species and culm count details</caption>
      <thead>
        <tr>
          <th scope="col">Species</th>
          <th scope="col">No. of Culms</th>
        </tr>
      </thead>
      <tbody>
        {species.map((sp) => (
          <tr key={sp.name}>
            <td>{sp.name}</td>
            <td className="bp-species-culms">{sp.culms.toLocaleString("en-IN")}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="bp-species-total-row">
          <td>Total Culms</td>
          <td className="bp-species-culms">{total.toLocaleString("en-IN")}</td>
        </tr>
      </tfoot>
    </table>
  );
}
