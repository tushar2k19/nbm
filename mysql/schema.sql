-- NBM Portal — local MySQL schema (NIC-aligned dev / on-prem target)
-- Replaces Supabase Postgres + Auth for state login and MIS portal workflows.

CREATE DATABASE IF NOT EXISTS nbm_portal
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nbm_portal;

-- Credentials (replaces Supabase auth.users for portal login)
CREATE TABLE IF NOT EXISTS portal_users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_portal_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS state_users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(32) NULL,
  state_code CHAR(2) NULL,
  role ENUM('state_editor', 'state_reviewer', 'nbm_central') NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_by CHAR(36) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_state_users_user_id (user_id),
  KEY idx_state_users_state_code (state_code),
  CONSTRAINT fk_state_users_portal_user FOREIGN KEY (user_id) REFERENCES portal_users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS monthly_entries (
  id CHAR(36) NOT NULL PRIMARY KEY,
  state_code CHAR(2) NOT NULL,
  month_year DATE NOT NULL,
  activity VARCHAR(512) NOT NULL,
  beneficiary_name VARCHAR(255) NOT NULL,
  beneficiary_type VARCHAR(64) NOT NULL,
  father_husband_name VARCHAR(255) NULL,
  gender VARCHAR(32) NULL,
  age INT NULL,
  category VARCHAR(64) NULL,
  mobile VARCHAR(32) NULL,
  village VARCHAR(255) NULL,
  block VARCHAR(255) NULL,
  district VARCHAR(255) NULL,
  state VARCHAR(255) NULL,
  pin_code VARCHAR(16) NULL,
  total_project_investment_lakhs DECIMAL(12, 2) NULL,
  center_share_lakhs DECIMAL(12, 2) NULL,
  state_share_lakhs DECIMAL(12, 2) NULL,
  total_capacity VARCHAR(255) NULL,
  employment_generated INT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMP NULL,
  submitted_by CHAR(36) NULL,
  comments_resolved_at TIMESTAMP NULL,
  comments_resolved_by CHAR(36) NULL,
  created_by CHAR(36) NOT NULL,
  updated_by CHAR(36) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_monthly_entries_state (state_code),
  KEY idx_monthly_entries_status (status),
  CONSTRAINT fk_monthly_entries_created_by FOREIGN KEY (created_by) REFERENCES portal_users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS entry_comments (
  id CHAR(36) NOT NULL PRIMARY KEY,
  entry_id CHAR(36) NOT NULL,
  author_id CHAR(36) NOT NULL,
  author_role VARCHAR(64) NOT NULL,
  message TEXT NOT NULL,
  parent_id CHAR(36) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_entry_comments_entry (entry_id),
  CONSTRAINT fk_entry_comments_entry FOREIGN KEY (entry_id) REFERENCES monthly_entries (id) ON DELETE CASCADE,
  CONSTRAINT fk_entry_comments_author FOREIGN KEY (author_id) REFERENCES portal_users (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS submission_cycles (
  id CHAR(36) NOT NULL PRIMARY KEY,
  state_code CHAR(2) NOT NULL,
  month_year DATE NOT NULL,
  editor_deadline DATE NOT NULL,
  reviewer_deadline DATE NOT NULL,
  editor_submitted_at TIMESTAMP NULL,
  reviewer_finalised_at TIMESTAMP NULL,
  overall_status VARCHAR(32) NOT NULL DEFAULT 'pending_editor',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_submission_cycles_state_month (state_code, month_year)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token_hash CHAR(64) NOT NULL,
  purpose ENUM('invite', 'reset') NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_reset_user (user_id),
  KEY idx_reset_hash (token_hash),
  CONSTRAINT fk_reset_user FOREIGN KEY (user_id) REFERENCES portal_users (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS email_outbox (
  id CHAR(36) NOT NULL PRIMARY KEY,
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  html_body MEDIUMTEXT NOT NULL,
  text_body MEDIUMTEXT NOT NULL,
  related_user_id CHAR(36) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_outbox_user (related_user_id),
  CONSTRAINT fk_outbox_user FOREIGN KEY (related_user_id) REFERENCES portal_users (id) ON DELETE SET NULL
) ENGINE=InnoDB;

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

CREATE TABLE IF NOT EXISTS reminders (
  id CHAR(36) NOT NULL PRIMARY KEY,
  sent_by CHAR(36) NOT NULL,
  target_state_code CHAR(2) NULL,
  target_user_id CHAR(36) NULL,
  month_year DATE NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reminders_sent_by FOREIGN KEY (sent_by) REFERENCES portal_users (id)
) ENGINE=InnoDB;
