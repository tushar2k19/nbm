-- Retire the revision-requested workflow.
-- Existing rows return to draft so editors can correct them and submit again.
-- Reviewers now only approve, decline, or comment.

USE nbm_portal;

UPDATE monthly_entries
SET status = 'draft'
WHERE status = 'revision_requested';
