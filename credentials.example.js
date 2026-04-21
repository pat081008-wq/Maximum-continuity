// ═══════════════════════════════════════════════════════════
//  Maximum Continuity Assessment — Credentials Template
// ═══════════════════════════════════════════════════════════
//  1. Copy this file and rename the copy to:  credentials.js
//  2. Edit the USERS object with your own usernames/passwords
//  3. Never commit credentials.js to version control
//
//  Format:    "username": "password"
//  Usernames  are NOT case-sensitive
//  Passwords  ARE case-sensitive and support any characters
// ═══════════════════════════════════════════════════════════

const USERS = {
  "admin":   "changeme",
  "User Two": "changeme2"
};

// ── Do not modify below this line ──────────────────────────
function checkCredentials(username, password) {
  const key = Object.keys(USERS).find(
    k => k.toLowerCase() === username.toLowerCase().trim()
  );
  return key !== undefined && USERS[key] === password;
}
