-- Track who submitted each entry (portal user id) for reviewer queue display.
ALTER TABLE monthly_entries
  ADD COLUMN submitted_by CHAR(36) NULL DEFAULT NULL AFTER submitted_at,
  ADD KEY idx_monthly_entries_submitted_by (submitted_by);

-- Backfill submission time and submitter for entries already out of draft.
UPDATE monthly_entries
SET
  submitted_at = COALESCE(submitted_at, created_at, updated_at),
  submitted_by = COALESCE(submitted_by, created_by)
WHERE status <> 'draft'
  AND (submitted_at IS NULL OR submitted_by IS NULL);

-- Correct rows where reviewer approval overwrote submitter via updated_by heuristic.
UPDATE monthly_entries me
INNER JOIN state_users reviewer ON reviewer.user_id = me.submitted_by AND reviewer.role = 'state_reviewer'
INNER JOIN state_users editor ON editor.user_id = me.created_by AND editor.role = 'state_editor'
SET me.submitted_by = me.created_by
WHERE me.status <> 'draft';
