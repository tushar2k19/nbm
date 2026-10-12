#!/usr/bin/env node
/**
 * Bootstrap local MySQL for NBM portal dev (schema + test users).
 *
 * Usage:
 *   node scripts/setup-mysql-local.mjs
 *
 * Env (optional): MYSQL_HOST, MYSQL_PORT, MYSQL_ROOT_USER, MYSQL_ROOT_PASSWORD,
 *   MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
 */

import { randomUUID, randomBytes, scryptSync } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stdin, stdout } from "node:process";
import mysql from "mysql2/promise";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

function readDotEnv(filePath) {
  try {
    const text = readFileSync(filePath, "utf8");
    const values = {};
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const index = trimmed.indexOf("=");
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      values[key] = value;
    }
    return values;
  } catch {
    return {};
  }
}

const dotEnv = readDotEnv(join(rootDir, ".env"));
const env = (key, fallback) => process.env[key] || dotEnv[key] || fallback;

const cfg = {
  host: env("MYSQL_HOST", "127.0.0.1"),
  port: Number(env("MYSQL_PORT", "3306")),
  rootUser: env("MYSQL_ROOT_USER", "root"),
  rootPassword: process.env.MYSQL_ROOT_PASSWORD ?? "",
  appUser: env("MYSQL_USER", "nbm"),
  appPassword: env("MYSQL_PASSWORD", "Nbm_Portal_Local_2026!"),
  database: env("MYSQL_DATABASE", "nbm_portal"),
};

const TEST_USERS = [
  {
    email: "editor.test@nbm.gov.in",
    password: "Editor@123",
    full_name: "Dr. Rajesh Kumar",
    mobile: "+91-9876543210",
    state_code: "BR",
    role: "state_editor",
  },
  {
    email: "reviewer.test@nbm.gov.in",
    password: "Reviewer@123",
    full_name: "Prof. Meera Sharma",
    mobile: "+91-9876543211",
    state_code: "JK",
    role: "state_reviewer",
  },
  {
    email: "reviewer.bihar@nbm.gov.in",
    password: "Reviewer@123",
    full_name: "Ms. Anjali Singh",
    mobile: "+91-9876543213",
    state_code: "BR",
    role: "state_reviewer",
  },
  {
    email: "editor.jk@nbm.gov.in",
    password: "Editor@123",
    full_name: "Mr. Imran Dar",
    mobile: "+91-9876543214",
    state_code: "JK",
    role: "state_editor",
  },
  {
    email: "editor.bihar2@nbm.gov.in",
    password: "Editor@123",
    full_name: "Mr. Amit Prasad",
    mobile: "+91-9876543215",
    state_code: "BR",
    role: "state_editor",
  },
  {
    email: "central.admin@nbm.gov.in",
    password: "Central@123",
    full_name: "Mr. Sanjay Verma",
    mobile: "+91-9876543212",
    state_code: null,
    role: "nbm_central",
  },
];

function promptHidden(question) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) {
      reject(new Error("No terminal available to type the MySQL root password."));
      return;
    }
    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (chunk) => {
      const text = String(chunk);
      if (text === "\u0003") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        stdout.write("\n");
        process.exit(1);
      }
      if (text === "\r" || text === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        stdout.write("\n");
        resolve(value);
        return;
      }
      if (text === "\u007f" || text === "\b") {
        value = value.slice(0, -1);
        return;
      }
      value += text;
    };
    stdin.on("data", onData);
  });
}

async function openAdmin(password, useSocket) {
  const socketPath = process.env.MYSQL_SOCKET ?? "/var/run/mysqld/mysqld.sock";
  return mysql.createConnection({
    user: cfg.rootUser,
    password,
    multipleStatements: true,
    ...(useSocket
      ? { socketPath }
      : { host: cfg.host, port: cfg.port }),
  });
}

async function tryOpen(password) {
  let lastError;
  for (const useSocket of [true, false]) {
    try {
      return await openAdmin(password, useSocket);
    } catch (err) {
      lastError = err;
      const denied = err && (err.code === "ER_ACCESS_DENIED_ERROR" || err.errno === 1045);
      if (!denied) throw err;
    }
  }
  throw lastError;
}

async function connectAdmin() {
  if (cfg.rootPassword) {
    return tryOpen(cfg.rootPassword);
  }

  if (typeof process.getuid === "function" && process.getuid() === 0) {
    try {
      return await tryOpen("");
    } catch (err) {
      const denied = err && (err.code === "ER_ACCESS_DENIED_ERROR" || err.errno === 1045);
      if (!denied) throw err;
    }
  }

  console.log("MySQL root needs a password. It is used only for this setup and is not saved.");
  const password = await promptHidden("MySQL root password: ");
  if (!password) {
    throw new Error("MySQL root password was empty.");
  }
  return tryOpen(password);
}

async function main() {
  console.log("NBM — local MySQL setup\n");

  const rootConn = await connectAdmin();

  console.log("1. Applying schema…");
  const schema = readFileSync(join(rootDir, "mysql/schema.sql"), "utf8");
  await rootConn.query(schema);

  console.log("2. Ensuring application user…");
  const safeUser = cfg.appUser.replace(/[^a-zA-Z0-9_]/g, "");
  const safeDb = cfg.database.replace(/[^a-zA-Z0-9_]/g, "");
  await rootConn.query(
    `CREATE USER IF NOT EXISTS '${safeUser}'@'localhost' IDENTIFIED BY '${cfg.appPassword.replace(/'/g, "''")}'`,
  );
  await rootConn.query(
    `CREATE USER IF NOT EXISTS '${safeUser}'@'%' IDENTIFIED BY '${cfg.appPassword.replace(/'/g, "''")}'`,
  );
  await rootConn.query(`GRANT ALL PRIVILEGES ON \`${safeDb}\`.* TO '${safeUser}'@'localhost'`);
  await rootConn.query(`GRANT ALL PRIVILEGES ON \`${safeDb}\`.* TO '${safeUser}'@'%'`);
  await rootConn.query("FLUSH PRIVILEGES");
  await rootConn.end();

  const db = await mysql.createConnection({
    host: cfg.host,
    port: cfg.port,
    user: cfg.appUser,
    password: cfg.appPassword,
    database: cfg.database,
  });

  console.log("3. Seeding portal test users…");
  for (const user of TEST_USERS) {
    const userId = randomUUID();
    const profileId = randomUUID();
    const email = user.email.toLowerCase();

    await db.query("DELETE FROM state_users WHERE email = ?", [email]);
    await db.query("DELETE FROM portal_users WHERE email = ?", [email]);

    await db.query("INSERT INTO portal_users (id, email, password_hash) VALUES (?, ?, ?)", [
      userId,
      email,
      hashPassword(user.password),
    ]);

    await db.query(
      `INSERT INTO state_users (id, user_id, full_name, email, mobile, state_code, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [profileId, userId, user.full_name, email, user.mobile, user.state_code, user.role],
    );

    console.log(`   ✓ ${user.role}: ${email}`);
  }

  await db.end();

  console.log("\nDone. Add to your .env:\n");
  console.log("VITE_DATA_BACKEND=mysql");
  console.log(`MYSQL_HOST=${cfg.host}`);
  console.log(`MYSQL_PORT=${cfg.port}`);
  console.log(`MYSQL_USER=${cfg.appUser}`);
  console.log(`MYSQL_PASSWORD=${cfg.appPassword}`);
  console.log(`MYSQL_DATABASE=${cfg.database}`);
  console.log("JWT_SECRET=change-me-to-a-long-random-string-for-local-dev");
  console.log("\nTest login at /login with the credentials from scripts/setup-test-users.js");
}

main().catch((err) => {
  console.error("\nSetup failed:", err.message);
  console.error("\nTips:");
  console.error("- Run again in this terminal: sudo npm run db:setup-mysql");
  console.error("- When asked, type the MySQL root password (it will not appear as you type).");
  console.error("- Do not paste that password into chat.");
  process.exit(1);
});
