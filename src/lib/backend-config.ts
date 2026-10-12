/** Which data/auth backend the app uses. NIC deployments should use `mysql`. */
export type DataBackend = "supabase" | "mysql";

export function getDataBackend(): DataBackend {
  const raw =
    import.meta.env.VITE_DATA_BACKEND ??
    (typeof process !== "undefined" ? process.env.VITE_DATA_BACKEND : undefined);
  // NIC / on-premises is the default. Supabase is only used when explicitly selected.
  return raw === "supabase" ? "supabase" : "mysql";
}

export function isMysqlBackend(): boolean {
  return getDataBackend() === "mysql";
}
