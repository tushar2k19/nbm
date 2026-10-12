-- Logged reminders for the central month-compliance board.
-- Email delivery is deferred; rows record who would be notified.
CREATE TABLE IF NOT EXISTS portal_reminders (
  id CHAR(36) NOT NULL PRIMARY KEY,
  state_code CHAR(2) NOT NULL,
  year SMALLINT NOT NULL,
  month TINYINT NOT NULL,
  audience ENUM('editors', 'reviewers') NOT NULL,
  stage VARCHAR(32) NOT NULL,
  sent_by CHAR(36) NOT NULL,
  recipient_user_ids JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_portal_reminders_period (year, month, state_code),
  CONSTRAINT fk_portal_reminders_sent_by FOREIGN KEY (sent_by) REFERENCES portal_users (id)
) ENGINE=InnoDB;
