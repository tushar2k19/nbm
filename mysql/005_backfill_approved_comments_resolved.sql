-- Approved / declined entries no longer need "unresolved" comment emphasis in the UI.
-- Backfill resolved timestamp for finalized entries that already have comments.
UPDATE monthly_entries me
SET
  comments_resolved_at = COALESCE(me.comments_resolved_at, me.updated_at, CURRENT_TIMESTAMP),
  comments_resolved_by = COALESCE(me.comments_resolved_by, me.updated_by)
WHERE me.status IN ('approved', 'declined')
  AND me.comments_resolved_at IS NULL
  AND EXISTS (SELECT 1 FROM entry_comments ec WHERE ec.entry_id = me.id);
