import type { NurserySpecies } from "@/data/accreditedNurseries";

type Props = {
  species: NurserySpecies[];
};

export function SpeciesStockPanel({ species }: Props) {
  if (species.length === 0) {
    return <span className="an-td-muted text-xs">—</span>;
  }

  const total = species.reduce((sum, s) => sum + s.stock, 0);

  return (
    <table className="an-species-table" aria-label="Species stock breakdown">
      <caption className="sr-only">Species stock details</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Stock</th>
          <th scope="col">As On</th>
        </tr>
      </thead>
      <tbody>
        {species.map((sp) => (
          <tr key={sp.name}>
            <td>{sp.name}</td>
            <td className="an-species-stock">{sp.stock.toLocaleString("en-IN")}</td>
            <td className="an-td-muted whitespace-nowrap">{sp.asOn}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="an-species-total-row">
          <td>Total</td>
          <td className="an-species-stock">{total.toLocaleString("en-IN")}</td>
          <td />
        </tr>
      </tfoot>
    </table>
  );
}
