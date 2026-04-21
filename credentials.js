// ═══════════════════════════════════════════════════════════
//  Maximum Continuity Assessment — User Credentials
// ═══════════════════════════════════════════════════════════
//  Edit the USERS object below to manage access.
//
//  Format:    "username": "password"
//  Usernames  are NOT case-sensitive
//  Passwords  ARE case-sensitive and support any characters
//
//  This file is listed in .gitignore — it will NOT be
//  committed to your repository.  Each user of the repo
//  must create their own copy from credentials.example.js.
// ═══════════════════════════════════════════════════════════

const USERS = {
  "admin":           "changeme",
  "Patrick Richards": "changeme2"
};

// ── Do not modify below this line ──────────────────────────
function checkCredentials(username, password) {
  const key = Object.keys(USERS).find(
    k => k.toLowerCase() === username.toLowerCase().trim()
  );
  return key !== undefined && USERS[key] === password;
}
