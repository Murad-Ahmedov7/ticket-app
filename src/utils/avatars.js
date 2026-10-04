export const normalizeAvatarName = value => String(value ?? "").trim().toLocaleLowerCase("az")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i")
  .replace(/ə/g, "e").replace(/\s+/g, " ");

export const maleAvatars = [12, 13].map(id => `https://i.pravatar.cc/80?img=${id}`);
export const femaleAvatars = [32, 47].map(id => `https://i.pravatar.cc/80?img=${id}`);
export const neutralAvatars = ["#e2e8f0", "#d1fae5", "#e0e7ff"].map(background =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="${background}"/><circle cx="40" cy="29" r="14" fill="#64748b"/><path d="M12 80v-8a28 28 0 0 1 56 0v8" fill="#64748b"/></svg>`)}`
);

const maleNames = new Set(["emil", "izzet", "izzat", "vasif", "ali", "sayid"]);
const femaleNames = new Set(["aygul", "semaya", "semaye", "xalida"]);

export function detectGender(user = {}) {
  user = asUser(user);
  const declared = [user.gender, user.sex].find(value => value != null && String(value).trim() !== "");
  if (declared !== undefined) {
    const gender = normalizeAvatarName(declared);
    if (["female", "f", "woman", "qadin"].includes(gender)) return "female";
    if (["male", "m", "man", "kisi"].includes(gender)) return "male";
    // Explicit unknown/nonbinary values must not be overridden by a name guess.
    return "neutral";
  }

  const name = normalizeAvatarName(user.firstName || user.first_name || user.fullName || user.name || user.username);
  const tokens = name.split(" ");
  const male = tokens.some(token => maleNames.has(token));
  const female = tokens.some(token => femaleNames.has(token));
  if (male !== female) return male ? "male" : "female";
  return "neutral";
}

export function getAvatarByGender(user = {}) {
  user = asUser(user);
  if (profilePhoto(user)) return profilePhoto(user);
  const gender = detectGender(user);
  const pool = gender === "female" ? femaleAvatars : gender === "male" ? maleAvatars : neutralAvatars;
  const key = String(user.avatarKey ?? user.id ?? (user.username || user.fullName || user.name || user.firstName || user.first_name || ""));
  const hash = Array.from(normalizeAvatarName(key)).reduce((value, char) => (Math.imul(value, 31) + char.codePointAt(0)) >>> 0, 7);
  return pool[hash % pool.length];
}

const asUser = user => typeof user === "string" ? { name: user } : (user || {});
const displayName = user => user.fullName || user.name || [user.firstName || user.first_name, user.lastName || user.last_name].filter(Boolean).join(" ") || user.username;
const emailKey = user => String(user.email || "").trim().toLowerCase();
export const profilePhoto = user => [user.avatar, user.profilePhoto, user.profile_photo, user.avatarUrl, user.avatar_url].find(value => typeof value === "string" && value.trim());

// Row IDs differ between tabs. Match email, then an unambiguous full name.
export function resolveAvatarUser(value, records = []) {
  const user = asUser(value);
  const name = normalizeAvatarName(displayName(user));
  const email = emailKey(user);
  const named = name ? records.filter(record => normalizeAvatarName(displayName(record)) === name) : [];
  const emails = new Set(named.map(emailKey).filter(Boolean));
  const identityEmail = email || (emails.size === 1 ? [...emails][0] : "");
  const matches = records.filter(record => identityEmail
    ? emailKey(record) === identityEmail || (emails.size <= 1 && !emailKey(record) && named.includes(record))
    : emails.size === 0 && named.includes(record));
  const canonical = matches[0] || user;
  const sources = [...matches, user];
  const declared = sources.find(record => [record.gender, record.sex].some(value => value != null && String(value).trim()));
  return {
    ...user, ...canonical,
    ...(declared ? { gender: declared.gender, sex: declared.sex } : {}),
    avatar: sources.map(profilePhoto).find(Boolean),
    avatarKey: identityEmail || normalizeAvatarName(displayName(canonical)) || user.username || "unknown",
  };
}
