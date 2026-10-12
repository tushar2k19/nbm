-- Track when all comments on an entry are marked resolved (row highlight clears; count remains).

USE nbm_portal;

ALTER TABLE monthly_entries
  ADD COLUMN comments_resolved_at TIMESTAMP NULL DEFAULT NULL,
  ADD COLUMN comments_resolved_by CHAR(36) NULL DEFAULT NULL;
