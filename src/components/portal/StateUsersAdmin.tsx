import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { indianStates } from "@/data/indianStates";
import { getStateName } from "@/data/indianStates";
import { getRoleLabel } from "@/lib/roles";
import {
  createStateOfficer,
  fetchStateUsersDirectory,
  updateStateOfficer,
  type OfficerPayload,
} from "@/lib/portal-client";
import { PortalTablePagination } from "@/components/portal/PortalTablePagination";
import { useClientPagination } from "@/hooks/useClientPagination";

type DirectoryUser = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  state_code: string | null;
  role: string;
  is_active: boolean;
  latest_message_id: string | null;
};

const emptyForm: OfficerPayload = {
  full_name: "",
  email: "",
  mobile: "",
  state_code: "BR",
  role: "state_editor",
};

const inputCls =
  "w-full border border-border rounded px-3 py-2 bg-background text-sm outline-none focus:ring-2 focus:ring-ring";

type StateUsersAdminProps = {
  /** When set, only officers for this state are listed (HQ accounts hidden). */
  stateCode?: string | null;
};

export function StateUsersAdmin({ stateCode = null }: StateUsersAdminProps) {
  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<OfficerPayload>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = (await fetchStateUsersDirectory()) as DirectoryUser[];
      setUsers(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      state_code: stateCode ?? emptyForm.state_code,
    });
    setOpen(true);
  }

  function openEdit(user: DirectoryUser) {
    if (user.role === "nbm_central" || !user.state_code) return;
    setEditingId(user.id);
    setForm({
      full_name: user.full_name,
      email: user.email,
      mobile: user.mobile ?? "",
      state_code: user.state_code,
      role: user.role === "state_reviewer" ? "state_reviewer" : "state_editor",
    });
    setOpen(true);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, mobile: form.mobile?.trim() || null };
      if (editingId) {
        const result = await updateStateOfficer({ id: editingId, ...payload });
        toast.success(result.previewPath ? "User updated. A new password email is ready." : "User updated.");
        if (result.previewPath) window.open(result.previewPath, "_blank", "noopener");
      } else {
        const result = await createStateOfficer(payload);
        toast.success("User created. The password email is ready.");
        if (result.previewPath) window.open(result.previewPath, "_blank", "noopener");
      }
      setOpen(false);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save user");
    } finally {
      setSaving(false);
    }
  }

  const visibleUsers = useMemo(() => {
    if (!stateCode) return users;
    return users.filter((user) => user.state_code === stateCode);
  }, [users, stateCode]);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
    total: userTotal,
  } = useClientPagination(visibleUsers, [stateCode]);

  async function toggleActive(user: DirectoryUser) {
    try {
      await updateStateOfficer({ id: user.id, is_active: !user.is_active });
      toast.success(user.is_active ? "Account disabled." : "Account enabled.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update status");
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div>
          <h2 className="font-semibold">State Users Directory</h2>
          <p className="text-xs text-muted-foreground">
            {stateCode
              ? `${getStateName(stateCode)} officers only. They set their own password from the email.`
              : "All states — create editors and reviewers. They set their own password from the email."}
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>+ Add user</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading users...</td></tr>
            ) : visibleUsers.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No users found.</td></tr>
            ) : (
              paginatedItems.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{user.state_code ? getStateName(user.state_code) : "National (HQ)"}</td>
                  <td className="px-4 py-3">{user.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${user.is_active ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                      {user.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {user.role !== "nbm_central" ? (
                      <>
                        <button type="button" className="text-primary text-xs font-semibold hover:underline" onClick={() => openEdit(user)}>Edit</button>
                        <button type="button" className="text-primary text-xs font-semibold hover:underline" onClick={() => void toggleActive(user)}>
                          {user.is_active ? "Disable" : "Enable"}
                        </button>
                      </>
                    ) : null}
                    {user.latest_message_id ? (
                      <Link to="/mailbox/$id" params={{ id: user.latest_message_id }} target="_blank" className="text-primary text-xs font-semibold hover:underline">
                        View email
                      </Link>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PortalTablePagination
        page={page}
        totalPages={totalPages}
        total={userTotal}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        disabled={loading}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit state user" : "Add state user"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSave} className="space-y-3">
            <label className="block text-xs font-semibold">
              Full name
              <input className={`${inputCls} mt-1`} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            </label>
            <label className="block text-xs font-semibold">
              Official email
              <input type="email" className={`${inputCls} mt-1`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </label>
            <label className="block text-xs font-semibold">
              Mobile
              <input className={`${inputCls} mt-1`} value={form.mobile ?? ""} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            </label>
            <label className="block text-xs font-semibold">
              State
              <select
                className={`${inputCls} mt-1`}
                value={form.state_code}
                onChange={(e) => setForm({ ...form, state_code: e.target.value })}
                disabled={!!stateCode}
              >
                {indianStates.map((state) => (
                  <option key={state.code} value={state.code}>{state.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-semibold">
              Role
              <select className={`${inputCls} mt-1`} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as OfficerPayload["role"] })}>
                <option value="state_editor">State Editor</option>
                <option value="state_reviewer">State Reviewer</option>
              </select>
            </label>
            <p className="text-xs text-muted-foreground">
              {editingId
                ? "Changing the email sends a new set-password message and the previous password stops working."
                : "A set-password email is created. The officer cannot sign in until they use that link."}
            </p>
            <Button type="submit" disabled={saving} className="w-full">{saving ? "Saving…" : "Save"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
